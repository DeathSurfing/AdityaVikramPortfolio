#!/bin/bash

# FastAPI Ollama Proxy Startup Script

echo "🚀 Starting FastAPI Ollama Proxy..."

# Check if Ollama is running
OLLAMA_ENDPOINT=${OLLAMA_ENDPOINT:-"http://localhost:11434"}
echo "📡 Checking Ollama connection at $OLLAMA_ENDPOINT..."

if curl -s "$OLLAMA_ENDPOINT/api/tags" > /dev/null 2>&1; then
    echo "✅ Ollama is running and accessible"
else
    echo "❌ Warning: Ollama is not accessible at $OLLAMA_ENDPOINT"
    echo "   Make sure Ollama is running with: ollama serve"
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "🔧 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
# Detect shell and activate accordingly
if [ -n "$FISH_VERSION" ]; then
    source venv/bin/activate.fish
else
    source venv/bin/activate
fi

# Install requirements
echo "📦 Installing requirements..."
pip install -r requirements.txt

# Set environment variables
export OLLAMA_ENDPOINT=${OLLAMA_ENDPOINT:-"http://localhost:11434"}
export OLLAMA_MODEL=${OLLAMA_MODEL:-"llama3.2"}

echo "🌍 Environment:"
echo "  - Ollama Endpoint: $OLLAMA_ENDPOINT"
echo "  - Ollama Model: $OLLAMA_MODEL"
echo "  - Proxy Port: 5950"

# Start the FastAPI server
echo "🚀 Starting FastAPI proxy server on port 5950..."
uvicorn main:app --host 0.0.0.0 --port 5950 --reload
