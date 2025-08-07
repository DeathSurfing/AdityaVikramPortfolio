# 🤖 AI Assistant Documentation

> Complete guide for setting up and managing your AI-powered chat assistant

## 🎯 Overview

Your portfolio features an intelligent chat assistant powered by Ollama that can answer questions about your professional background, projects, and experience.

```
AI Stack
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  FastAPI Proxy  │    │     Ollama      │
│   Chat UI       │◄──►│  CORS + Routing │◄──►│   gpt-oss:20b   │
│   (React)       │    │   (Python)      │    │  (Local Model)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📚 Available Guides

### 🚀 Setup Guides
- [**OLLAMA_SETUP.md**](OLLAMA_SETUP.md) - Complete setup with Cloudflare Tunnel
- [**PROXY_SETUP.md**](PROXY_SETUP.md) - FastAPI proxy configuration
- [**AI_QUICK_START.md**](AI_QUICK_START.md) - Get AI assistant running in 5 minutes

### 🔧 Configuration Guides
- [**CUSTOMIZATION.md**](CUSTOMIZATION.md) - Customize AI personality and responses
- [**MODELS.md**](MODELS.md) - Working with different Ollama models
- [**SYSTEM_PROMPTS.md**](SYSTEM_PROMPTS.md) - Crafting effective system prompts

### 🧪 Testing & Debugging
- [**TESTING.md**](TESTING.md) - AI assistant testing strategies
- [**DEBUGGING.md**](DEBUGGING.md) - Common AI issues and solutions

## ⚡ Quick Start

### 1. Install Ollama
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama
ollama serve

# Pull the model
ollama pull gpt-oss:20b
```

### 2. Deploy AI Proxy
```bash
# Navigate to proxy directory
cd ollama-proxy

# Quick deployment
./deploy.sh

# Verify
curl http://localhost:5950/health
```

### 3. Test AI Chat
```bash
# Test chat functionality
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Aditya"}'
```

## 🎨 Key Features

### AI Assistant Capabilities
- ✅ **Knowledge Base**: Trained on your professional background
- ✅ **Real-time Chat**: Instant responses via streaming API
- ✅ **CORS Support**: Works seamlessly with web browsers
- ✅ **Professional Tone**: Maintains appropriate communication style
- ✅ **Project Aware**: Knows about your specific projects and skills

### Technical Features
- ✅ **FastAPI Proxy**: High-performance async API
- ✅ **Docker Support**: Containerized deployment
- ✅ **Health Monitoring**: Built-in health checks
- ✅ **Error Handling**: Graceful fallback strategies
- ✅ **Streaming Support**: Real-time response streaming

## 📁 File Structure

```
ai/
├── README.md                 # This overview
├── OLLAMA_SETUP.md          # Complete Ollama setup guide
├── PROXY_SETUP.md           # FastAPI proxy documentation
├── CUSTOMIZATION.md         # AI personality customization
├── MODELS.md                # Model management
├── SYSTEM_PROMPTS.md        # Prompt engineering
├── TESTING.md               # Testing strategies
└── DEBUGGING.md             # Troubleshooting guide

ollama-proxy/
├── main.py                  # FastAPI server with system prompt
├── requirements.txt         # Python dependencies
├── Dockerfile              # Container definition
├── docker-compose.yml      # Docker Compose setup
├── deploy.sh               # Quick deployment script
└── README.md               # Proxy-specific documentation
```

## 🔧 Common Tasks

### Update AI Knowledge
```python
# Edit ollama-proxy/main.py
SYSTEM_PROMPT = """
You are Aditya Vikram Mahendru's AI assistant...
[Add new experiences, projects, skills here]
"""
```

### Change AI Model
```bash
# Pull new model
ollama pull llama3.2

# Update docker-compose.yml
environment:
  - OLLAMA_MODEL=llama3.2
```

### Test AI Responses
```bash
# Health check
curl http://localhost:5950/health

# Chat test
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your main skills?"}'

# Streaming test
curl -X POST http://localhost:5950/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about your projects"}'
```

## 🎯 AI Assistant Personality

Your AI assistant is configured with:

### Professional Focus
- **Role**: Technical professional and project showcase
- **Tone**: Friendly but professional
- **Knowledge**: Your specific experience, skills, and projects
- **Style**: Conversational yet informative

### Current Knowledge Base
- 🎓 **Education**: Woxsen University AI-RC internship
- 💻 **Skills**: Full-stack development, AI/ML, cloud platforms
- 🚀 **Projects**: Student Council system, MUN platform, Laundry Management
- 🛠️ **Technologies**: Next.js, Python, Rust, Docker, AWS

## 📊 Performance & Monitoring

### Response Times
- **Health Check**: < 200ms
- **Simple Queries**: < 2 seconds
- **Complex Responses**: < 5 seconds

### Resource Usage
- **CPU**: Moderate during inference
- **Memory**: ~2GB for gpt-oss:20b model
- **Storage**: ~11GB for model files

### Health Monitoring
```bash
# Monitor AI assistant health
./scripts/manage-portfolio.sh health

# Check Ollama status
ollama ps

# View proxy logs
docker-compose logs ollama-proxy
```

## 🔄 Updates & Maintenance

### Regular Tasks
- **Weekly**: Review AI responses for accuracy
- **Monthly**: Update system prompt with new experiences
- **Quarterly**: Consider model upgrades
- **As needed**: Fine-tune responses based on user feedback

### Model Updates
```bash
# Check for model updates
ollama list

# Update model
ollama pull gpt-oss:20b

# Restart proxy
./scripts/manage-portfolio.sh restart
```

## 🚨 Troubleshooting

### Common Issues
1. **AI not responding**: Check Ollama service status
2. **CORS errors**: Verify proxy CORS configuration  
3. **Slow responses**: Monitor system resources
4. **Inconsistent answers**: Update system prompt

### Quick Fixes
```bash
# Restart all AI services
sudo systemctl restart ollama
./scripts/manage-portfolio.sh restart

# Check logs for errors
journalctl -u ollama -f
docker-compose logs ollama-proxy
```

---

**🤖 Your AI assistant is ready to showcase your professional expertise!** Use these guides to maintain and improve your AI-powered portfolio experience.
