#!/bin/bash

# Simple Docker Compose Deployment Script
# For Ollama FastAPI Proxy with Cloudflare Tunnels

set -e

OLLAMA_MODEL=${OLLAMA_MODEL:-"gpt-oss:20b"}

echo "🚀 Deploying Ollama FastAPI Proxy..."
echo "Model: $OLLAMA_MODEL"
echo ""

# Check if Ollama is running
echo "🔍 Checking Ollama..."
if ! curl -f http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "❌ Ollama not running. Start with: ollama serve"
    exit 1
fi

# Check/Pull model
echo "🔍 Checking model $OLLAMA_MODEL..."
if ! curl -s http://localhost:11434/api/tags | jq -r '.models[].name' | grep -q "$OLLAMA_MODEL"; then
    echo "⬇️ Pulling model..."
    ollama pull $OLLAMA_MODEL
fi

# Deploy with Docker Compose
echo "🚀 Deploying with Docker Compose..."
docker compose down || true
docker compose up --build -d

# Wait for service
echo "⏳ Waiting for service..."
for i in {1..12}; do
    if curl -f http://localhost:5950/health > /dev/null 2>&1; then
        echo "✅ Service ready!"
        break
    fi
    echo "   Attempt $i/12..."
    sleep 10
done

# Test
echo "🧪 Testing..."
curl -f http://localhost:5950/health
echo "✅ Deployment complete!"
echo "🌐 Service running on http://localhost:5950"
echo "💬 Ready for Cloudflare tunnel on /api/*"
