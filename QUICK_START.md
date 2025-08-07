# ⚡ Quick Start: Ollama + Docker Compose + Cloudflare Tunnel

## 🎯 What We Built

A simple Docker Compose deployment for your Ollama-powered portfolio chatbot:

```
Browser → Cloudflare Tunnel → Docker Container (FastAPI Proxy) → Ollama → AI Response
```

## 🚀 Quick Deployment

```bash
# 1. Start Ollama
ollama serve

# 2. Deploy with Docker Compose
cd ollama-proxy
./deploy.sh

# 3. Start Cloudflare Tunnel
cloudflared tunnel --config cloudflare-tunnel-config.yml run
```

## 🔧 Manual Deployment

```bash
# Ensure Ollama is running with gpt-oss:20b model
ollama serve
ollama pull gpt-oss:20b

# Deploy with Docker Compose
cd ollama-proxy
docker compose up --build -d

# Verify deployment
curl http://localhost:5950/health
```

## 🌐 Cloudflare Tunnel Config

```yaml
ingress:
  # 🤖 AI Chat API (Docker container)
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950

  # 🌐 Portfolio Website
  - hostname: portfolio.adityavikram.dev
    service: http://localhost:8594
```

## 📁 Deployment Files

```
ollama-proxy/
├── docker-compose.yml          # 🐳 Main deployment config
├── Dockerfile                  # Container definition
├── main.py                     # FastAPI server with Ollama library
├── requirements.txt            # Python dependencies
└── deploy.sh                   # Simple deployment script
```

## ✅ Features

1. **🐳 Containerized**: Runs in Docker for consistent deployment
2. **🔄 CI/CD Ready**: GitHub Actions workflow included
3. **🌐 Cloudflare Ready**: Works with your existing tunnel config
4. **🤖 gpt-oss:20b**: Uses your specified model
5. **⚡ Simple**: One command deployment

## 🧪 Testing

```bash
# Health check
curl http://localhost:5950/health

# Chat test
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Tell me about Aditya"}'
```

## 🎉 Result

Your AI assistant is now deployed and accessible at:
- **Local**: http://localhost:5950/api/chat
- **Public**: https://portfolio.adityavikram.dev/api/chat (via Cloudflare tunnel)

---

**Need help?** The deployment is now much simpler - just `docker compose up --build -d`!
