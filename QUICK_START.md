# ⚡ Quick Start: Ollama + FastAPI + Cloudflare Tunnel

## 🎯 What We Built

A complete CORS-enabled solution for your Ollama-powered portfolio chatbot:

```
Browser → Cloudflare Tunnel → FastAPI Proxy → Ollama → AI Response
```

## 🚀 Start Everything (Quick Commands)

```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start FastAPI Proxy
cd ollama-proxy
./start.fish

# Terminal 3: Start Frontend (if not running)
cd frontend
npm run dev

# Terminal 4: Start Cloudflare Tunnel
cloudflared tunnel --config cloudflare-tunnel-config.yml run
```

## 🧪 Test Everything

```bash
# Run the comprehensive test
./test_setup.sh
```

## 🌐 Your Cloudflare Tunnel Config

```yaml
ingress:
  # AI Chat API (FastAPI Proxy)
  - hostname: portfolio.adityavikram.dev
    path: /api/*
    service: http://localhost:5950

  # Portfolio Website
  - hostname: portfolio.adityavikram.dev
    service: http://localhost:8594
    
  # ... other routes
```

## 📁 File Structure

```
AdityaVikramPortfolio/
├── ollama-proxy/                # 🆕 FastAPI CORS proxy
│   ├── main.py                  # Main FastAPI server
│   ├── start.fish              # Fish shell startup
│   └── requirements.txt        # Dependencies
├── frontend/                   # Your existing Next.js app
├── cloudflare-tunnel-config.yml # Tunnel configuration
├── test_setup.sh              # Test script
└── OLLAMA_SETUP.md            # Detailed documentation
```

## ✅ What This Solves

1. **CORS Issues**: Ollama doesn't support CORS → FastAPI proxy adds CORS headers
2. **Web Accessibility**: Local Ollama → Exposed via Cloudflare Tunnel
3. **Same Experience**: Your existing frontend code works unchanged
4. **Performance**: Async FastAPI with connection pooling

## 🎉 Result

Visit https://portfolio.adityavikram.dev, click "Try AI Assistant", and your Ollama-powered chatbot works perfectly from the web!

---

**Need help?** Check `OLLAMA_SETUP.md` for detailed documentation.
