# 🚀 FastAPI Ollama Proxy

A CORS-enabled FastAPI proxy for Ollama that allows your portfolio website to communicate with your local Ollama instance through Cloudflare Tunnel.

## 🎯 Purpose

Since Ollama doesn't natively support CORS, this FastAPI proxy server:
- ✅ Provides CORS headers for web browser compatibility
- 🔒 Handles secure communication between your frontend and Ollama
- 🌐 Exposes Ollama through your Cloudflare tunnel on `/api/*` routes
- 🎭 Uses the same system prompt as your Next.js API route
- 🏃‍♂️ Supports both regular and streaming chat responses

## 📋 Prerequisites

- Python 3.11+ installed
- Ollama installed and running (`ollama serve`)
- Your desired model pulled in Ollama (`ollama pull llama3.2`)
- Cloudflare tunnel configured

## 🚀 Quick Start

### Option 1: Using the Startup Script (Recommended)

```bash
cd ollama-proxy
./start.sh
```

The script will:
- Check if Ollama is accessible
- Create a virtual environment
- Install dependencies
- Start the proxy server on port 5950

### Option 2: Manual Setup

```bash
cd ollama-proxy

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --host 0.0.0.0 --port 5950 --reload
```

### Option 3: Using Docker

```bash
cd ollama-proxy

# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t ollama-proxy .
docker run -p 5950:5950 -e OLLAMA_ENDPOINT=http://host.docker.internal:11434 ollama-proxy
```

## 🛠 Configuration

### Environment Variables

- `OLLAMA_ENDPOINT`: Ollama server URL (default: `http://localhost:11434`)
- `OLLAMA_MODEL`: Model to use (default: `llama3.2`)

### CORS Configuration

The proxy is configured to allow requests from:
- `https://portfolio.adityavikram.dev`
- `https://adityavikram.dev`
- `http://localhost:3000` (for development)
- `http://localhost:8594` (your frontend)

## 🌐 Cloudflare Tunnel Setup

Your `cloudflare-tunnel-config.yml` should include:

```yaml
ingress:
  # 🎯 Proxy Ollama (via FastAPI proxy) on portfolio.adityavikram.dev/api/*
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950

  # 🌐 Main portfolio site
  - hostname: portfolio.adityavikram.dev
    service: http://localhost:8594

  # ... other routes
```

This routes all `/api/*` requests to your FastAPI proxy, which then communicates with Ollama.

## 🔌 API Endpoints

### `GET /`
Basic API information

### `GET /health`
Health check endpoint - tests Ollama connectivity

### `POST /api/chat`
Main chat endpoint compatible with your Next.js API

**Request:**
```json
{
  "message": "Tell me about Aditya's experience",
  "temperature": 0.7,
  "top_p": 0.9,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "message": "AI response content",
  "model": "llama3.2",
  "timestamp": "1642518000"
}
```

### `POST /api/chat/stream`
Streaming chat endpoint for real-time responses

Returns Server-Sent Events (SSE) stream.

### `/{method} /api/{path}`
Generic proxy for other Ollama API endpoints

## 🧪 Testing

```bash
# Test health check
curl http://localhost:5950/health

# Test basic chat
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about Aditya"}'

# Test from your frontend domain (with CORS)
fetch('http://localhost:5950/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
```

## 🔄 Integration with Your Portfolio

Your frontend can now call:
```javascript
// This will be proxied through Cloudflare tunnel to your FastAPI server
fetch('https://portfolio.adityavikram.dev/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage })
})
```

The request flow:
1. Frontend → Cloudflare Tunnel → FastAPI Proxy → Ollama → Response back

## 📝 Logging

The proxy provides comprehensive logging:
- Request/response information
- Ollama connectivity status
- Error handling and debugging info

## 🚨 Troubleshooting

### "HTTP client not initialized"
- Restart the FastAPI server
- Check if the lifespan manager is working properly

### "Failed to get response from AI model"
- Ensure Ollama is running: `ollama serve`
- Check if your model is available: `ollama list`
- Verify the `OLLAMA_ENDPOINT` environment variable

### CORS Issues
- Verify your domain is in the `allow_origins` list
- Check browser developer console for CORS errors

### Cloudflare Tunnel Issues
- Verify tunnel configuration
- Check if port 5950 is accessible locally
- Ensure tunnel is running: `cloudflared tunnel run your-tunnel-name`

## 🔧 Development

For development, you can modify:
- `SYSTEM_PROMPT` - Update the AI assistant personality
- `allow_origins` - Add development domains
- Request/response models - Extend Pydantic models

## 📊 Performance

The proxy is designed for:
- ⚡ Low latency communication with Ollama
- 🔄 Proper connection pooling with httpx
- 🚀 Async request handling
- 💾 Minimal memory footprint

## 🛡 Security Considerations

- The proxy only exposes chat endpoints, not all Ollama functionality
- CORS is restricted to specific domains
- Request validation with Pydantic models
- No authentication currently - add if needed for production

---

**Happy coding! 🎉** Your Ollama-powered portfolio assistant is now accessible from the web with full CORS support.
