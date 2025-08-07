#!/usr/bin/env fish

# FastAPI Ollama Proxy Startup Script (Fish Shell)

echo "🚀 Starting FastAPI Ollama Proxy..."

# Check if Ollama is running
set OLLAMA_HOST (test -n "$OLLAMA_HOST"; and echo $OLLAMA_HOST; or echo "http://localhost:11434")
echo "📡 Checking Ollama connection at $OLLAMA_HOST..."

if curl -s "$OLLAMA_HOST/api/tags" > /dev/null 2>&1
    echo "✅ Ollama is running and accessible"
else
    echo "❌ Warning: Ollama is not accessible at $OLLAMA_HOST"
    echo "   Make sure Ollama is running with: ollama serve"
end

# Create virtual environment if it doesn't exist
if not test -d "venv"
    echo "🔧 Creating virtual environment..."
    python3 -m venv venv
end

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate.fish

# Install requirements
echo "📦 Installing requirements..."
pip install -r requirements.txt

# Set environment variables
set -gx OLLAMA_HOST (test -n "$OLLAMA_HOST"; and echo $OLLAMA_HOST; or echo "http://localhost:11434")
set -gx OLLAMA_MODEL (test -n "$OLLAMA_MODEL"; and echo $OLLAMA_MODEL; or echo "gpt-oss:20b")

echo "🌍 Environment:"
echo "  - Ollama Host: $OLLAMA_HOST"
echo "  - Ollama Model: $OLLAMA_MODEL"
echo "  - Proxy Port: 5950"

# Start the FastAPI server
echo "🚀 Starting FastAPI proxy server on port 5950..."
uvicorn main:app --host 0.0.0.0 --port 5950 --reload
