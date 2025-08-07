# 🚀 Complete Ollama + Cloudflare Tunnel Setup Guide

This guide will help you set up Ollama with CORS support through a FastAPI proxy, accessible via Cloudflare Tunnel.

## 📋 Overview

Since Ollama doesn't natively support CORS, we've created a FastAPI proxy server that:
- ✅ Provides CORS headers for web browser compatibility
- 🔒 Handles secure communication between your frontend and Ollama
- 🌐 Exposes Ollama through your Cloudflare tunnel on `/api/*` routes
- 🎭 Uses the same system prompt as your Next.js API route
- 🏃‍♂️ Supports both regular and streaming chat responses

## 🗂 Project Structure

```
AdityaVikramPortfolio/
├── frontend/                          # Your Next.js frontend
│   ├── app/api/chat/route.ts          # Existing Next.js API route (backup)
│   └── components/ui/chatbot-home.tsx  # Frontend chatbot component
├── ollama-proxy/                      # New FastAPI proxy
│   ├── main.py                        # FastAPI proxy server
│   ├── requirements.txt               # Python dependencies
│   ├── Dockerfile                     # Docker setup
│   ├── docker-compose.yml            # Docker Compose
│   ├── start.sh                       # Bash startup script
│   ├── start.fish                     # Fish shell startup script
│   └── README.md                      # Detailed proxy documentation
└── cloudflare-tunnel-config.yml      # Cloudflare tunnel configuration
```

## 🛠 Setup Steps

### 1. Start Ollama

Make sure Ollama is running on your machine:
```bash
# Start Ollama (if not running as service)
ollama serve

# Pull your model if not already done
ollama pull llama3.2
```

### 2. Set Up FastAPI Proxy

#### Option A: Using Fish Shell (Recommended for you)
```bash
cd ollama-proxy
./start.fish
```

#### Option B: Using Bash
```bash
cd ollama-proxy
./start.sh
```

#### Option C: Manual Setup
```bash
cd ollama-proxy

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate.fish  # For Fish shell
# or: source venv/bin/activate  # For Bash

# Install dependencies
pip install -r requirements.txt

# Start the proxy
uvicorn main:app --host 0.0.0.0 --port 5950 --reload
```

#### Option D: Using Docker
```bash
cd ollama-proxy
docker-compose up --build
```

### 3. Configure Cloudflare Tunnel

Your Cloudflare tunnel configuration should look like this:

```yaml
# cloudflare-tunnel-config.yml
tunnel: your-tunnel-id  # Replace with your actual tunnel ID
credentials-file: /path/to/your/tunnel/credentials.json

ingress:
  # 🎯 Proxy Ollama (via FastAPI proxy) on portfolio.adityavikram.dev/api/*
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950

  # 🌐 Main portfolio site
  - hostname: portfolio.adityavikram.dev
    service: http://localhost:8594

  # 🏠 Root domain
  - hostname: adityavikram.dev
    service: http://localhost:8594

  # 🧩 Tambola routes
  - hostname: tambola.adityavikram.dev
    path: /api/*
    service: http://localhost:8120

  - hostname: tambola.adityavikram.dev
    service: http://localhost:8119

  # ❌ Catch-all
  - service: http_status:404
```

### 4. Start Cloudflare Tunnel

```bash
# Using your tunnel configuration
cloudflared tunnel --config cloudflare-tunnel-config.yml run

# Or if you have a named tunnel
cloudflared tunnel run your-tunnel-name
```

### 5. Test the Setup

#### Test Proxy Health
```bash
curl http://localhost:5950/health
```

#### Test Chat Endpoint Locally
```bash
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about Aditya"}'
```

#### Test Through Cloudflare Tunnel
```bash
curl -X POST https://portfolio.adityavikram.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about Aditya"}'
```

## 🔄 Request Flow

The complete request flow works as follows:

```
1. User interacts with frontend chatbot
2. Frontend sends POST to https://portfolio.adityavikram.dev/api/chat
3. Cloudflare Tunnel routes /api/* to localhost:5950
4. FastAPI proxy receives request
5. Proxy forwards to Ollama at localhost:11434
6. Ollama processes with system prompt
7. Response flows back: Ollama → Proxy → Tunnel → Frontend
```

## 🎯 Key Benefits

### CORS Support
- Your frontend can now call the AI assistant from the browser
- Proper CORS headers are included in all responses
- Multiple domains supported (portfolio, dev environments)

### High Performance
- Async FastAPI server with connection pooling
- Streaming support for real-time responses
- Minimal latency overhead

### Security
- Only exposes chat endpoints, not full Ollama API
- Request validation with Pydantic models
- Domain-restricted CORS policy

## 🔧 Environment Variables

You can customize the proxy behavior with these environment variables:

```bash
# Ollama server location
export OLLAMA_ENDPOINT="http://localhost:11434"

# Model to use for chat
export OLLAMA_MODEL="llama3.2"
```

## 🧪 Frontend Integration

Your existing frontend (`components/ui/chatbot-home.tsx`) is already configured to work! It makes requests to `/api/chat` which will now be:

1. **Local development**: Routed to your Next.js API route
2. **Production**: Routed through Cloudflare Tunnel to your FastAPI proxy

No changes needed to your frontend code!

## 🚨 Troubleshooting

### "Connection refused" errors
1. Ensure Ollama is running: `ollama serve`
2. Check if the model is available: `ollama list`
3. Verify proxy is running: `curl http://localhost:5950/health`

### CORS errors in browser
1. Check if your domain is in the `allow_origins` list in `main.py`
2. Verify Cloudflare tunnel is running and configured correctly
3. Test direct proxy access to isolate the issue

### Cloudflare Tunnel issues
1. Verify tunnel configuration: `cloudflared tunnel validate cloudflare-tunnel-config.yml`
2. Check tunnel status: `cloudflared tunnel info your-tunnel-name`
3. Review tunnel logs for routing issues

### FastAPI proxy not starting
1. Check Python version: `python3 --version` (needs 3.11+)
2. Verify virtual environment activation
3. Check port 5950 isn't already in use: `lsof -i :5950`

## 📊 Monitoring

### Check Service Status
```bash
# Proxy health
curl http://localhost:5950/health

# Ollama status
curl http://localhost:11434/api/tags

# Frontend status
curl http://localhost:8594
```

### Logs
- **FastAPI Proxy**: Console logs with request/response info
- **Ollama**: Built-in logging, check Ollama documentation
- **Cloudflare Tunnel**: Use `cloudflared tunnel logs`

## 🎉 Success!

Once everything is set up:

1. **Visit**: https://portfolio.adityavikram.dev
2. **Click**: "Try AI Assistant" button on your homepage
3. **Chat**: Ask questions about your experience and projects
4. **Enjoy**: Your AI-powered portfolio assistant!

The chatbot will now be able to answer questions about your professional background, skills, and projects using the power of Ollama, accessible from anywhere on the web through your Cloudflare tunnel.

## 🔄 Optional: Fallback Strategy

Your Next.js API route (`frontend/app/api/chat/route.ts`) can serve as a fallback. You could modify your frontend to try the proxied endpoint first, then fallback to the Next.js route if needed.

---

**Happy coding! 🎯** Your portfolio now has a powerful, locally-hosted AI assistant accessible from the web!
