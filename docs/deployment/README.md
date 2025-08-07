# 🚀 Deployment Documentation

> Comprehensive deployment guides for all environments and platforms

## 🎯 Overview

Your portfolio supports multiple deployment strategies, from local development to production-ready cloud deployments with CI/CD automation.

```
Deployment Options
├── 🖥️  Local Development    # Docker Compose local setup
├── 🐳 Docker Production     # Production-ready containers  
├── 🔄 GitHub Actions        # Automated CI/CD pipeline
├── 🌐 Cloudflare Tunnel     # Public access solution
└── ☁️  Cloud Platforms      # VPS, AWS, GCP deployment
```

## 📚 Available Guides

### 🚀 Quick Start
- [**DOCKER_QUICK_START.md**](DOCKER_QUICK_START.md) - 5-minute Docker setup
- [**DOCKER_LOCAL.md**](DOCKER_LOCAL.md) - Local development with Docker
- [**DOCKER.md**](DOCKER.md) - Complete Docker guide

### 🏗️ Production Deployment  
- [**PRODUCTION.md**](PRODUCTION.md) - Production server setup
- [**GITHUB_ACTIONS.md**](GITHUB_ACTIONS.md) - CI/CD automation
- [**WORKFLOWS.md**](WORKFLOWS.md) - GitHub Actions workflows

### 🌐 Platform-Specific
- [**CLOUDFLARE.md**](CLOUDFLARE.md) - Cloudflare Tunnel setup
- [**VPS.md**](VPS.md) - VPS deployment guide  
- [**CLOUD.md**](CLOUD.md) - AWS/GCP deployment

## ⚡ Quick Deployment

### Local Development
```bash
# Clone and setup
git clone https://github.com/DeathSurfing/AdityaVikramPortfolio.git
cd AdityaVikramPortfolio

# Start Ollama
ollama serve
ollama pull gpt-oss:20b

# Deploy with one command
./scripts/manage-portfolio.sh rebuild

# Access at http://localhost:3000
```

### Production Deployment
```bash
# Server setup (Ubuntu/Debian)
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Deploy
git clone YOUR_REPO
cd AdityaVikramPortfolio
./scripts/manage-portfolio.sh rebuild
```

## 🏗️ Architecture Overview

### Development Stack
```
Developer Machine
┌─────────────────────────────────┐
│  Frontend (Next.js)   :3000     │
│  AI Proxy (FastAPI)   :5950     │  
│  Ollama (Local AI)    :11434    │
│  Docker Containers              │
└─────────────────────────────────┘
```

### Production Stack
```
Production Server
┌─────────────────────────────────┐
│  Nginx (Reverse Proxy) :80/443  │
│  Frontend (Containerized)       │
│  AI Proxy (Containerized)       │
│  Ollama (System Service)        │
│  Health Monitoring              │
│  Automated Backups              │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│     Cloudflare Tunnel           │
│     Public Internet Access      │
└─────────────────────────────────┘
```

## 🛠️ Technology Stack

### Core Technologies
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **AI**: Ollama with gpt-oss:20b model
- **Containers**: Docker, Docker Compose
- **Reverse Proxy**: Nginx (optional)

### DevOps & Automation
- **CI/CD**: GitHub Actions workflows
- **Monitoring**: Docker health checks, custom scripts
- **Deployment**: Automated with self-hosted runners
- **Public Access**: Cloudflare Tunnel integration

## 📁 Deployment Files

### Docker Configuration
```
├── docker-compose.yml           # Main orchestration
├── docker-compose.prod.yml      # Production overrides
├── frontend/Dockerfile          # Next.js container
├── ollama-proxy/Dockerfile      # FastAPI container
└── nginx/nginx.conf             # Reverse proxy config
```

### Scripts & Automation
```
├── scripts/
│   ├── manage-portfolio.sh      # Main management script
│   ├── build-local.sh          # Local image building
│   ├── docker-dev.sh           # Development helper
│   └── health-check.sh         # Health monitoring
└── .github/workflows/
    ├── deploy-portfolio.yml     # Main deployment workflow
    ├── test.yml                 # Testing workflow
    └── deploy-simple.yml        # Simple deployment option
```

## 🔄 Deployment Strategies

### 1. Local Development
- **Use Case**: Development and testing
- **Deployment**: Docker Compose
- **Access**: localhost ports
- **Benefits**: Fast iteration, full control

### 2. Production Server
- **Use Case**: Self-hosted production
- **Deployment**: Docker + Nginx + SystemD
- **Access**: Domain name via Cloudflare
- **Benefits**: Full control, cost-effective

### 3. GitHub Actions CI/CD
- **Use Case**: Automated deployments
- **Deployment**: Self-hosted runners
- **Access**: Triggered by git push
- **Benefits**: Zero-touch deployment

### 4. Cloud Platforms
- **Use Case**: Scalable production
- **Deployment**: Container services
- **Access**: Load balancers
- **Benefits**: Auto-scaling, managed services

## 🔧 Common Deployment Tasks

### Initial Setup
```bash
# 1. Clone repository
git clone https://github.com/DeathSurfing/AdityaVikramPortfolio.git
cd AdityaVikramPortfolio

# 2. Configure environment
cp .env.docker .env
# Edit .env with your settings

# 3. Start Ollama
ollama serve
ollama pull gpt-oss:20b

# 4. Deploy
./scripts/manage-portfolio.sh rebuild
```

### Updates & Maintenance
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
./scripts/manage-portfolio.sh rebuild

# Check health
./scripts/manage-portfolio.sh health

# View logs
./scripts/manage-portfolio.sh logs
```

### Troubleshooting
```bash
# Check service status
./scripts/manage-portfolio.sh status

# Restart services
./scripts/manage-portfolio.sh restart

# Clean rebuild
./scripts/manage-portfolio.sh clean
./scripts/manage-portfolio.sh rebuild

# System health check
curl http://localhost:5950/health
curl http://localhost:3000
```

## 📊 Monitoring & Health Checks

### Automated Health Monitoring
- **Frontend**: HTTP availability checks
- **API**: Health endpoint monitoring  
- **AI**: Ollama service status
- **Docker**: Container health checks
- **System**: Resource usage monitoring

### Manual Monitoring
```bash
# Quick health check
./scripts/manage-portfolio.sh health

# Detailed status
./scripts/manage-portfolio.sh status

# Resource usage
docker stats

# Service logs
./scripts/manage-portfolio.sh logs
```

## 🚨 Emergency Procedures

### Quick Recovery
```bash
# Service restart
./scripts/manage-portfolio.sh restart

# Full rebuild
./scripts/manage-portfolio.sh clean
./scripts/manage-portfolio.sh rebuild

# Ollama restart
sudo systemctl restart ollama
```

### Rollback Deployment
```bash
# Via GitHub Actions
# Go to Actions → Deploy → Select previous successful run → Re-run

# Manual rollback
git checkout PREVIOUS_COMMIT
./scripts/manage-portfolio.sh rebuild
```

## 📈 Performance Optimization

### Production Optimizations
- **Docker**: Multi-stage builds for smaller images
- **Nginx**: Gzip compression and caching
- **Next.js**: Static generation and optimization
- **Ollama**: Model warming and connection pooling

### Resource Management
```yaml
# Resource limits in docker-compose.yml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```

## 🔐 Security Considerations

### Production Security
- **Firewall**: Only necessary ports open
- **SSL/TLS**: HTTPS with valid certificates
- **Updates**: Regular security updates
- **Monitoring**: Log analysis and alerting

### Container Security
- **Non-root users**: Containers run as non-root
- **Image scanning**: Vulnerability scanning
- **Secrets**: Environment variable management
- **Network isolation**: Internal networks

---

**🚀 Choose your deployment strategy and get your portfolio live!** Each approach has its benefits - pick the one that matches your needs and technical comfort level.
