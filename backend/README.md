# 간단한 채팅봇 API

Azure AI 기반 인메모리 채팅봇 서비스입니다.

## 주요 기능

- 🤖 Azure AI (grok-3) 모델 기반 채팅
- 💬 Multi-turn 대화 지원
- 🚀 실시간 스트리밍 응답
- 📝 인메모리 대화 기록 관리
- 🌐 REST API 제공

## 빠른 시작

### 1. 환경변수 설정
```bash
export OPENAI_API_KEY="your-openai-key"
export AZURE_API_KEY="your-azure-key"
export AZURE_INFERENCE_ENDPOINT="your-azure-endpoint"
```

### 2. 로컬 실행
```bash
pip install -r requirements.txt
python main.py
```

### 3. Azure 배포
```bash
chmod +x deploy.sh
./deploy.sh
```

## API 엔드포인트

- `GET /health` - 헬스체크
- `POST /threads/new` - 새 대화 스레드 생성
- `POST /chat` - 일반 채팅
- `POST /chat/stream` - 스트리밍 채팅
- `GET /conversations/{thread_id}` - 대화 기록 조회

## 테스트

```bash
# 헬스체크
curl http://localhost:8000/health

# 채팅
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "안녕하세요!", "thread_id": "test"}'
```

## 아키텍처

```
FastAPI → simple_chat_agent → Azure AI (grok-3)
    ↓
InMemoryStore (대화 기록)
```

## 파일 구조

```
backend/
├── main.py              # FastAPI 애플리케이션
├── simple_chat_agent.py # 채팅 에이전트
├── memory.py            # 인메모리 저장소
├── config.py            # 설정
├── deploy.sh            # Azure 배포 스크립트
├── Dockerfile           # Docker 설정
└── requirements.txt     # 의존성
``` 