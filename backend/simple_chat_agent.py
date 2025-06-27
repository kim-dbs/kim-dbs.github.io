# 간단한 인메모리 기반 채팅 에이전트
from typing import List, Dict, Any, AsyncGenerator
from langchain_azure_ai.chat_models import AzureAIChatCompletionsModel
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from config import Config
from memory import memory_store
import uuid

class SimpleChatAgent:
    def __init__(self):
        self.llm = self._initialize_llm()
    
    def _initialize_llm(self):
        """LLM 초기화 - Azure AI 우선 사용"""
        try:
            if Config.AZURE_INFERENCE_ENDPOINT and Config.AZURE_API_KEY:
                print("Azure AI 모델을 사용합니다.")
                return AzureAIChatCompletionsModel(
                    endpoint=Config.AZURE_INFERENCE_ENDPOINT,
                    credential=Config.AZURE_API_KEY,
                    model="grok-3",
                    streaming=True
                )
        except Exception as e:
            print(f"Azure AI 초기화 실패, OpenAI로 폴백: {e}")
        
        if Config.OPENAI_API_KEY:
            print("OpenAI 모델을 사용합니다.")
            return ChatOpenAI(
                model="gpt-4o-mini",
                openai_api_key=Config.OPENAI_API_KEY,
                streaming=True,
                temperature=0.7
            )
        
        raise ValueError("Azure AI 또는 OpenAI API 키가 설정되지 않았습니다.")
    
    def _get_messages(self, thread_id: str, new_message: str) -> List:
        """대화 기록을 가져와서 메시지 형태로 변환"""
        history = memory_store.get_conversation_history(thread_id)
        messages = []
        
        # 시스템 메시지
        messages.append(SystemMessage(content="당신은 도움이 되는 AI 어시스턴트입니다. 친근하고 정확한 답변을 제공해주세요."))
        
        # 기존 대화 기록 (최근 10개만)
        recent_history = history[-10:] if len(history) > 10 else history
        for msg in recent_history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))
        
        # 새 메시지
        messages.append(HumanMessage(content=new_message))
        
        return messages
    
    async def chat(self, message: str, thread_id: str = None) -> Dict[str, Any]:
        """일반 채팅"""
        if not thread_id:
            thread_id = str(uuid.uuid4())
        
        try:
            messages = self._get_messages(thread_id, message)
            response = await self.llm.ainvoke(messages)
            response_text = response.content
            
            # 메모리에 저장
            memory_store.add_message(thread_id, "user", message)
            memory_store.add_message(thread_id, "assistant", response_text)
            
            return {
                "message": response_text,
                "thread_id": thread_id,
                "sources": None
            }
            
        except Exception as e:
            raise Exception(f"채팅 처리 중 오류: {str(e)}")
    
    async def chat_stream(self, message: str, thread_id: str = None) -> AsyncGenerator[Dict[str, Any], None]:
        """스트리밍 채팅"""
        if not thread_id:
            thread_id = str(uuid.uuid4())
        
        try:
            messages = self._get_messages(thread_id, message)
            
            # 사용자 메시지 먼저 저장
            memory_store.add_message(thread_id, "user", message)
            
            response_text = ""
            async for chunk in self.llm.astream(messages):
                if chunk.content:
                    response_text += chunk.content
                    yield {
                        "message": chunk.content,
                        "thread_id": thread_id,
                        "sources": None,
                        "is_complete": False
                    }
            
            # 완료된 응답 저장
            memory_store.add_message(thread_id, "assistant", response_text)
            
            # 완료 신호
            yield {
                "message": "",
                "thread_id": thread_id,
                "sources": None,
                "is_complete": True
            }
            
        except Exception as e:
            yield {
                "error": f"스트리밍 채팅 처리 중 오류: {str(e)}",
                "thread_id": thread_id,
                "is_complete": True
            }

# 전역 채팅 에이전트 인스턴스
simple_chat_agent = SimpleChatAgent() 