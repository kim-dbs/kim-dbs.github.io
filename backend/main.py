from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import uuid

from simple_chat_agent import simple_chat_agent
from memory import memory_store

app = FastAPI(
    title="간단한 채팅봇 API",
    description="인메모리 기반 채팅봇",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청/응답 모델
class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    thread_id: str
    sources: Optional[str] = None

class ThreadResponse(BaseModel):
    thread_id: str

@app.get("/")
async def root():
    return {"message": "간단한 채팅봇 API"}

@app.get("/health")
async def health_check():
    """헬스 체크"""
    total_conversations = len(memory_store.conversations)
    return {
        "status": "healthy",
        "message": f"시스템 정상 동작 중. 활성 대화: {total_conversations}개"
    }

@app.post("/threads/new")
async def create_new_thread():
    """새 스레드 생성"""
    thread_id = str(uuid.uuid4())
    return ThreadResponse(thread_id=thread_id)

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """일반 채팅"""
    try:
        result = await simple_chat_agent.chat(
            message=request.message,
            thread_id=request.thread_id
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/stream")
async def chat_stream_endpoint(request: ChatRequest):
    """스트리밍 채팅"""
    async def generate():
        try:
            async for chunk in simple_chat_agent.chat_stream(
                message=request.message,
                thread_id=request.thread_id
            ):
                yield f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n"
        except Exception as e:
            error_chunk = {
                "error": str(e),
                "thread_id": request.thread_id or "unknown",
                "is_complete": True
            }
            yield f"data: {json.dumps(error_chunk, ensure_ascii=False)}\n\n"
    
    return StreamingResponse(
        generate(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream"
        }
    )

@app.get("/conversations/{thread_id}")
async def get_conversation_history(thread_id: str):
    """대화 기록 조회"""
    try:
        history = memory_store.get_conversation_history(thread_id)
        return {"thread_id": thread_id, "messages": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005) 