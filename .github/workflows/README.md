# 🚀 GitHub Actions Workflows for Ollama Proxy

This directory contains GitHub Actions workflows for deploying and managing the Ollama FastAPI proxy on your self-hosted runner.

## 📁 Workflow Files

### `deploy-ollama-proxy.yml` - **Full CI/CD Pipeline**

**Features:**
- ✅ **Two-stage pipeline**: Lint & Test → Deploy
- 🐍 **Python 3.13+ support**: Auto-detects available Python versions  
- 🔍 **Comprehensive linting**: Black, Flake8, MyPy, Bandit, Safety
- 🐳 **Docker validation**: Validates compose config and Dockerfile
- 🧪 **Full testing suite**: Health, chat, models, CORS validation
- 🏥 **Health monitoring**: Container health checks and resource monitoring

**Triggers:**
- Push to `main`/`master` with changes to `ollama-proxy/**`
- Pull requests for code review
- Manual dispatch

### `deploy-simple.yml` - **Simple Deploy (Fallback)**

**Features:**
- 🚀 **Direct deployment**: No linting dependencies required
- ⚡ **Fast execution**: Minimal setup, maximum compatibility  
- 🌐 **CORS testing**: Tests both portfolio domains
- 🏥 **Basic health checks**: Ensures deployment success

**Use this if:**
- Python linting tools aren't available on your runner
- You want faster deployments without code quality checks
- You're troubleshooting the main workflow

## 🖥️ Self-Hosted Runner Requirements

Your Arch Linux runner should have:

### Required
- **Docker** & **Docker Compose**: For containerized deployment
- **curl**: For API testing and health checks
- **jq**: For JSON parsing (recommended)
- **Ollama**: Running with your models

### Python Environment (for full workflow)
- **Python 3.11+**: The workflow auto-detects versions
- **pip**: For installing linting tools

### Optional Tools
- **hadolint**: Dockerfile linting
- **Black**: Code formatting
- **Flake8**: Python linting  
- **MyPy**: Type checking
- **Bandit**: Security scanning
- **Safety**: Vulnerability checking

## 🔧 Workflow Configuration

### Environment Variables

```yaml
env:
  OLLAMA_MODEL: gpt-oss:20b  # Your target model
  PYTHON_VERSION: '3.13'    # Target Python version
```

### CORS Domains

The workflows test CORS for your domains:
- `https://portfolio.adityavikram.dev`
- `https://adityavikram.dev`

## 🚀 Deployment Process

### 1. **Lint & Test Stage** (Full workflow only)
```bash
🔍 Python environment detection
📦 Install linting dependencies  
🎨 Black code formatting check
🔍 Flake8 linting
📝 MyPy type checking
🛡️ Bandit security scan
🚨 Safety vulnerability check
🐳 Docker configuration validation
```

### 2. **Deploy Stage**
```bash
🔍 System requirements check
🔍 Ollama connectivity verification  
⬇️ Model availability/pull
🛑 Stop existing deployment
🚀 Docker Compose build & deploy
⏳ Service readiness wait
🧪 Comprehensive endpoint testing
🌐 CORS validation for your domains
🏥 Container health monitoring
🧹 Cleanup old Docker images
📊 Deployment summary
```

## 📊 Testing Your Environment

Run locally to test your self-hosted runner setup:

```bash
# Test Python environment and tools
./test-python-env.sh

# Test basic deployment
./deploy.sh

# Test linting locally  
./lint.sh
```

## 🔄 Workflow Selection

The workflows are designed to run independently:

**Use `deploy-ollama-proxy.yml` when:**
- ✅ You want full CI/CD with code quality checks
- ✅ Your runner has Python 3.11+ with pip
- ✅ You want comprehensive testing and monitoring

**Use `deploy-simple.yml` when:**  
- ⚡ You want fast deployment without linting
- 🚀 Your runner lacks Python development tools
- 🔧 You're troubleshooting or in a hurry

## 🎯 Success Criteria

Both workflows ensure:

1. **✅ Ollama Connectivity**: Server running with required model
2. **✅ Docker Deployment**: Container built and running healthy  
3. **✅ API Functionality**: Health, chat, and models endpoints working
4. **✅ CORS Configuration**: Both domains can make API calls
5. **✅ Resource Management**: Old images cleaned up

## 🚨 Troubleshooting

### Python Version Issues
```bash
# The workflow auto-detects these in order:
python3.13 → python3.12 → python3.11 → python → python3
```

### Missing Tools
```bash
# Install on Arch Linux
sudo pacman -S python-pip docker docker-compose jq curl

# Install Python tools
pip install --user black flake8 mypy bandit safety
```

### Ollama Not Running
```bash
# Start Ollama service
ollama serve

# Pull your model
ollama pull gpt-oss:20b
```

### Container Issues
```bash  
# Check logs
docker compose -f ollama-proxy/docker-compose.yml logs

# Manual rebuild
docker compose -f ollama-proxy/docker-compose.yml up --build -d
```

## 📈 Monitoring

The workflows provide detailed monitoring:

- **🏥 Container Health**: Docker health checks every 30s
- **📊 Resource Usage**: CPU and memory monitoring  
- **🌐 API Status**: All endpoints tested on each deployment
- **🔗 CORS Verification**: Domain access validated
- **📋 Deployment Summary**: Complete status report

---

**🎉 Happy Deploying!** Your Ollama proxy will be reliably deployed to your self-hosted runner with full testing and monitoring.
