from typing import List, Dict, Any, Optional
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
from langchain_core.chat_history import BaseChatMessageHistory
from langchain.memory import ConversationBufferWindowMemory
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.store.memory import InMemoryStore
from langchain_azure_ai.embeddings import AzureAIEmbeddingsModel
from langchain_openai import OpenAIEmbeddings
import json
import redis
from config import Config
import time
from collections import defaultdict

# 간단한 인메모리 메모리 시스템
class InMemoryStore:
    def __init__(self):
        # 스레드별 대화 기록 저장
        self.conversations: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        # 스레드별 마지막 활동 시간
        self.last_activity: Dict[str, float] = {}
        # 최대 보관 시간 (1시간)
        self.max_age = 3600
    
    def add_message(self, thread_id: str, role: str, content: str):
        """메시지 추가"""
        message = {
            "role": role,
            "content": content,
            "timestamp": time.time()
        }
        self.conversations[thread_id].append(message)
        self.last_activity[thread_id] = time.time()
        
        # 최대 20개 메시지만 유지
        if len(self.conversations[thread_id]) > 20:
            self.conversations[thread_id] = self.conversations[thread_id][-20:]
    
    def get_conversation_history(self, thread_id: str) -> List[Dict[str, Any]]:
        """대화 기록 조회"""
        self._cleanup_old_conversations()
        return self.conversations.get(thread_id, [])
    
    def _cleanup_old_conversations(self):
        """오래된 대화 정리"""
        current_time = time.time()
        expired_threads = [
            thread_id for thread_id, last_time in self.last_activity.items()
            if current_time - last_time > self.max_age
        ]
        
        for thread_id in expired_threads:
            if thread_id in self.conversations:
                del self.conversations[thread_id]
            if thread_id in self.last_activity:
                del self.last_activity[thread_id]

# 전역 메모리 인스턴스
memory_store = InMemoryStore()

class ShortTermMemory:
    """단기 메모리 관리 (대화 세션 내)"""
    
    def __init__(self, max_messages: int = Config.MAX_MEMORY_MESSAGES):
        self.max_messages = max_messages
        self.memory_store = memory_store
        self.checkpointer = InMemorySaver()
    
    def add_message(self, thread_id: str, role: str, content: str):
        """메시지 추가"""
        messages = self.memory_store.get_conversation_history(thread_id)
        
        new_message = {
            "role": role,
            "content": content,
            "timestamp": str(pd.Timestamp.now())
        }
        
        messages.append(new_message)
        
        # 최대 메시지 수 제한
        if len(messages) > self.max_messages:
            messages = messages[-self.max_messages:]
        
        self.memory_store.conversations[thread_id] = messages
    
    def get_messages(self, thread_id: str) -> List[BaseMessage]:
        """대화 기록을 LangChain 메시지 형태로 반환"""
        messages = self.memory_store.get_conversation_history(thread_id)
        
        langchain_messages = []
        for msg in messages:
            if msg["role"] == "user":
                langchain_messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                langchain_messages.append(AIMessage(content=msg["content"]))
            elif msg["role"] == "system":
                langchain_messages.append(SystemMessage(content=msg["content"]))
        
        return langchain_messages
    
    def clear_conversation(self, thread_id: str):
        """대화 기록 삭제"""
        self.memory_store.conversations[thread_id] = []

class LongTermMemory:
    """장기 메모리 관리 (사용자별 지속적 정보)"""
    
    def __init__(self):
        self.memory_store = memory_store
        
        # Azure AI 임베딩 모델 우선 사용으로 시맨틱 스토어 초기화
        try:
            if Config.AZURE_INFERENCE_ENDPOINT and Config.AZURE_INFERENCE_CREDENTIAL:
                embeddings = AzureAIEmbeddingsModel(
                    endpoint=Config.AZURE_INFERENCE_ENDPOINT,
                    credential=Config.AZURE_INFERENCE_CREDENTIAL,
                    model="text-embedding-3-small",
                )
            else:
                embeddings = OpenAIEmbeddings(
                    model="text-embedding-3-small",
                    openai_api_key=Config.OPENAI_API_KEY
                )
            
            self.semantic_store = InMemoryStore(
                index={
                    "embed": embeddings,
                    "dims": 1536,  # text-embedding-3-small의 차원
                }
            )
        except Exception as e:
            print(f"시맨틱 스토어 초기화 실패: {e}")
            self.semantic_store = InMemoryStore()
    
    def save_user_info(self, user_id: str, info_type: str, content: str, metadata: Dict[str, Any] = None):
        """사용자 정보 저장"""
        memory_data = {
            "content": content,
            "type": info_type,
            "metadata": metadata or {},
            "timestamp": str(pd.Timestamp.now())
        }
        
        self.memory_store.conversations[f"user_memory:{user_id}:{info_type}"] = [memory_data]
    
    def get_user_context(self, user_id: str, query: str = "") -> str:
        """사용자 컨텍스트 생성"""
        if query:
            memories = self.memory_store.conversations.get(f"user_memory:{user_id}:*", [])
        else:
            # 기본 정보들 가져오기
            memories = []
            for info_type in ["name", "preferences", "background"]:
                memories.extend(self.memory_store.conversations.get(f"user_memory:{user_id}:{info_type}", []))
        
        if not memories:
            return ""
        
        context_parts = []
        for memory in memories:
            context_parts.append(f"- {memory['type']}: {memory['content']}")
        
        return "사용자 정보:\n" + "\n".join(context_parts)

# pandas import 추가
import pandas as pd

# 간단한 인메모리 메모리 시스템
class InMemoryStore:
    def __init__(self):
        # 스레드별 대화 기록 저장
        self.conversations: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        # 스레드별 마지막 활동 시간
        self.last_activity: Dict[str, float] = {}
        # 최대 보관 시간 (1시간)
        self.max_age = 3600
    
    def add_message(self, thread_id: str, role: str, content: str):
        """메시지 추가"""
        message = {
            "role": role,
            "content": content,
            "timestamp": time.time()
        }
        self.conversations[thread_id].append(message)
        self.last_activity[thread_id] = time.time()
        
        # 최대 20개 메시지만 유지
        if len(self.conversations[thread_id]) > 20:
            self.conversations[thread_id] = self.conversations[thread_id][-20:]
    
    def get_conversation_history(self, thread_id: str) -> List[Dict[str, Any]]:
        """대화 기록 조회"""
        self._cleanup_old_conversations()
        return self.conversations.get(thread_id, [])
    
    def _cleanup_old_conversations(self):
        """오래된 대화 정리"""
        current_time = time.time()
        expired_threads = [
            thread_id for thread_id, last_time in self.last_activity.items()
            if current_time - last_time > self.max_age
        ]
        
        for thread_id in expired_threads:
            if thread_id in self.conversations:
                del self.conversations[thread_id]
            if thread_id in self.last_activity:
                del self.last_activity[thread_id]

# 전역 메모리 인스턴스
memory_store = InMemoryStore() 