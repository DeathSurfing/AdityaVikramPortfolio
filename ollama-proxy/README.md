# 🚀 Ollama FastAPI Proxy - Docker Compose Deployment

A simple Docker Compose deployment for Ollama integration with your portfolio website.

## 🎯 What This Does

- 🐳 **Containerized**: Runs FastAPI proxy in Docker
- 🤖 **gpt-oss:20b**: Uses your specified model
- 🌐 **Cloudflare Ready**: Works with your tunnel on `/api/*`
- ✅ **CORS Enabled**: Allows browser requests
- 🗺️ **Python Ollama Library**: Direct connection (no HTTP proxy)

## 🚀 Quick Deployment

```bash
# 1. Ensure Ollama is running
ollama serve
ollama pull gpt-oss:20b

# 2. Deploy
./deploy.sh
```

## 🔧 Manual Deployment

```bash
# Start with Docker Compose
docker compose up --build -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop
docker compose down
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:5950/health

# Chat test
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Tell me about Aditya"}'
```

## 🌐 Cloudflare Tunnel

Your tunnel config routes `/api/*` to this container:

```yaml
ingress:
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950  # This container
```

## 📁 Files

- `docker-compose.yml` - Main deployment config
- `Dockerfile` - Container definition  
- `main.py` - FastAPI server with Ollama Python library
- `requirements.txt` - Dependencies
- `deploy.sh` - Simple deployment script

## 🔄 CI/CD

GitHub Actions workflow automatically:
1. **Frontend Linting**: ESLint + TypeScript checks
2. **Docker Validation**: Validates all Docker configurations
3. **Ollama Check**: Ensures Ollama is running and model is available
4. **Deploy**: Uses `docker compose up --build -d`
5. **Test**: Comprehensive endpoint testing

## 🎨 Local Development

```bash
# Run linting (frontend + docker validation)
./lint.sh

# Deploy locally
./deploy.sh
```

## 🚨 Troubleshooting

```bash
# Check container status
docker compose ps

# View logs
docker compose logs ollama-proxy

# Restart
docker compose restart

# Rebuild
docker compose up --build -d
```

---

**Simple deployment**: Just run `./deploy.sh` and you're done!

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
