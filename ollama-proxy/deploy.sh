#!/bin/bash

# Unified Docker Compose Deployment Script
# For Frontend + Ollama FastAPI Proxy with Cloudflare Tunnels

set -e

# Change to main project directory if we're in ollama-proxy
if [ "$(basename $(pwd))" = "ollama-proxy" ]; then
    cd ..
fi

OLLAMA_MODEL=${OLLAMA_MODEL:-"gpt-oss:20b"}

echo "🚀 Deploying Frontend + Ollama FastAPI Proxy..."
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

# Deploy with Docker Compose (frontend + ollama-proxy)
echo "🚀 Deploying with Docker Compose..."
docker compose down || true
export OLLAMA_MODEL=$OLLAMA_MODEL
docker compose up --build -d frontend ollama-proxy

# Wait for services
echo "⏳ Waiting for services..."
for i in {1..12}; do
    if curl -f http://localhost:5950/health > /dev/null 2>&1; then
        echo "✅ Ollama proxy ready!"
        break
    fi
    echo "   Attempt $i/12..."
    sleep 10
done

# Test frontend (give it more time)
echo "🔍 Checking frontend..."
sleep 15
if curl -f http://localhost:8594 > /dev/null 2>&1; then
    echo "✅ Frontend ready!"
else
    echo "⚠️ Frontend still starting (this is normal)"
fi

# Test Ollama proxy
echo "🧪 Testing Ollama proxy..."
curl -f http://localhost:5950/health
echo ""
echo "✅ Deployment complete!"
echo "🔥 Frontend: http://localhost:8594"
echo "🌐 Ollama proxy: http://localhost:5950"
echo "💬 Ready for Cloudflare tunnel routing"
echo "📋 Container status:"
docker compose ps
