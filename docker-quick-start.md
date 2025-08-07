# 🐳 Docker Quick Start

## Prerequisites
- Docker & Docker Compose installed
- Ollama running (`ollama serve`)
- Model `gpt-oss:20b` available

## Quick Commands

```bash
# Build and start development
./scripts/docker-dev.sh build
./scripts/docker-dev.sh start

# Or start with logs
./scripts/docker-dev.sh start --logs

# Production mode with Nginx
./scripts/docker-dev.sh start-prod

# Stop everything
./scripts/docker-dev.sh stop

# View status
./scripts/docker-dev.sh status

# Test setup
./scripts/docker-dev.sh test
```

## Access Points
- **Frontend**: http://localhost:3000
- **API Proxy**: http://localhost:5950  
- **Health Check**: http://localhost:5950/health
- **With Nginx**: http://localhost

For complete documentation, see [DOCKER_README.md](DOCKER_README.md)
