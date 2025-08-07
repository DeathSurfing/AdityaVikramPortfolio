# ⚡ Quick Start: Portfolio + AI Assistant

> Get your AI-powered portfolio running in 5 minutes!

## 🎯 What You'll Have

A complete portfolio with AI chat assistant:
```
Browser → Cloudflare Tunnel → Docker Container (FastAPI Proxy) → Ollama → AI Response
```

## 🚀 Quick Deployment

### 1. Prerequisites Check
```bash
# Verify requirements
docker --version       # Docker installed?
ollama --version       # Ollama available?
curl --version         # curl for testing?
```

### 2. Start Ollama
```bash
# Start Ollama service
ollama serve

# Pull the AI model
ollama pull gpt-oss:20b
```

### 3. Deploy Everything
```bash
# Clone repository
git clone https://github.com/DeathSurfing/AdityaVikramPortfolio.git
cd AdityaVikramPortfolio

# One-command deployment
./scripts/manage-portfolio.sh rebuild
```

### 4. Verify Deployment
```bash
# Check health
curl http://localhost:5950/health

# Test AI chat
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Tell me about Aditya"}'
```

## 🌐 Make It Public (Optional)

### Cloudflare Tunnel Setup
```yaml
# cloudflare-tunnel-config.yml
ingress:
  # 🤖 AI Chat API
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950

  # 🌐 Portfolio Website
  - hostname: portfolio.adityavikram.dev
    service: http://localhost:3000
```

```bash
# Start tunnel
cloudflared tunnel --config cloudflare-tunnel-config.yml run
```

## ✅ Success Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] AI API responds at http://localhost:5950/health
- [ ] Chat test works with Ollama
- [ ] All containers are healthy
- [ ] (Optional) Public access via Cloudflare

## 🧪 Test Everything

```bash
# Health check
curl http://localhost:5950/health
# Should return: {"status": "healthy", "models": ["gpt-oss:20b"]}

# Chat test
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are Aditya's main skills?"}'

# Frontend test
curl http://localhost:3000
# Should return HTML
```

## 🔧 Troubleshooting

### Ollama Issues
```bash
# Check Ollama status
ollama list
ps aux | grep ollama

# Restart if needed
ollama serve
```

### Container Issues
```bash
# Check container status
./scripts/manage-portfolio.sh status

# View logs
./scripts/manage-portfolio.sh logs

# Restart services
./scripts/manage-portfolio.sh restart
```

### Port Conflicts
```bash
# Check what's using ports
lsof -i :3000
lsof -i :5950

# Kill conflicting processes
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:5950)
```

## 🎉 You're Done!

Your AI-powered portfolio is now running:
- **Local Frontend**: http://localhost:3000
- **Local AI API**: http://localhost:5950/api/chat
- **Public (if tunnel)**: https://portfolio.adityavikram.dev

## 📚 Next Steps

- [📖 Full Documentation](../README.md)
- [🤖 AI Configuration](ai/OLLAMA_SETUP.md)
- [🐳 Docker Guide](deployment/DOCKER.md)
- [📝 Blog Setup](content/BLOG_GUIDE.md)
- [🔧 Troubleshooting](operations/TROUBLESHOOTING.md)

---

**⚡ Fast deployment achieved!** Your portfolio is ready to showcase your work with AI assistance.
