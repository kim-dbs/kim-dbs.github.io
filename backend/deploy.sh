#!/bin/bash

# 간단한 채팅봇 Azure Container Apps 배포 스크립트
set -e

echo "=== 간단한 채팅봇 Azure 배포 시작 ==="

# 변수 설정
RESOURCE_GROUP="ggulmat-eastasia-rg"
LOCATION="eastasia"
ACR_NAME="ggulmatregistry$(date +%s)"
APP_NAME="ggulmat-api"
ENVIRONMENT_NAME="chatbot-env"

# 환경변수 확인
if [ -z "$OPENAI_API_KEY" ] && [ -z "$AZURE_API_KEY" ]; then
    echo "오류: OPENAI_API_KEY 또는 AZURE_API_KEY 환경변수를 설정해주세요."
    echo "export OPENAI_API_KEY='your-key'"
    echo "export AZURE_API_KEY='your-key'"
    echo "export AZURE_INFERENCE_ENDPOINT='your-endpoint'"
    exit 1
fi

echo "1. 리소스 그룹 생성..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "2. Azure Container Registry 생성..."
az acr create --resource-group $RESOURCE_GROUP --name $ACR_NAME --sku Basic --admin-enabled true

echo "3. ACR 로그인..."
az acr login --name $ACR_NAME

echo "4. Docker 이미지 빌드 및 푸시..."
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "loginServer" --output tsv)
docker buildx build --platform linux/amd64 -t $ACR_LOGIN_SERVER/chatbot-api:latest . --push

echo "5. Container Apps 환경 확인/생성..."
EXISTING_ENV=$(az containerapp env list --query "[?name=='$ENVIRONMENT_NAME'].name" --output tsv 2>/dev/null || echo "")
if [ -z "$EXISTING_ENV" ]; then
    echo "새 Container Apps 환경 생성..."
    az containerapp env create \
      --name $ENVIRONMENT_NAME \
      --resource-group $RESOURCE_GROUP \
      --location $LOCATION
else
    echo "기존 환경 '$ENVIRONMENT_NAME' 사용..."
fi

echo "6. Container App 배포..."
az containerapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $ENVIRONMENT_NAME \
  --image $ACR_LOGIN_SERVER/chatbot-api:latest \
  --target-port 8000 \
  --ingress 'external' \
  --registry-server $ACR_LOGIN_SERVER \
  --registry-username $ACR_NAME \
  --registry-password $(az acr credential show --name $ACR_NAME --query "passwords[0].value" --output tsv) \
  --env-vars \
    OPENAI_API_KEY="$OPENAI_API_KEY" \
    AZURE_INFERENCE_ENDPOINT="$AZURE_INFERENCE_ENDPOINT" \
    AZURE_API_KEY="$AZURE_API_KEY" \
    AZURE_INFERENCE_CREDENTIAL="$AZURE_API_KEY" \
  --cpu 1.0 \
  --memory 2Gi \
  --min-replicas 1 \
  --max-replicas 3

echo "7. 배포 완료!"
APP_URL=$(az containerapp show --name $APP_NAME --resource-group $RESOURCE_GROUP --query "properties.configuration.ingress.fqdn" --output tsv)
echo ""
echo "🎉 배포 성공!"
echo "애플리케이션 URL: https://$APP_URL"
echo "API 문서: https://$APP_URL/docs"
echo "헬스 체크: https://$APP_URL/health"
echo ""
echo "테스트 명령어:"
echo "curl https://$APP_URL/health"
echo "curl -X POST https://$APP_URL/chat -H 'Content-Type: application/json' -d '{\"message\": \"안녕하세요!\", \"thread_id\": \"test\"}'" 