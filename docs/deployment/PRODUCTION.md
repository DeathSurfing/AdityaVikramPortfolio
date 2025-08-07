# 🚀 GitHub Actions Deployment Guide

This document explains how to deploy your portfolio using GitHub Actions with Docker containers and the `gpt-oss:20b` model.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [GitHub Repository Setup](#github-repository-setup)
- [Deployment Workflows](#deployment-workflows)
- [Manual Deployment](#manual-deployment)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)
- [Environment Management](#environment-management)

## 🛠️ Prerequisites

### Server Requirements
- Linux server (Ubuntu 20.04+ recommended)
- Docker and Docker Compose installed
- Ollama installed with `gpt-oss:20b` model
- SSH access configured
- At least 4GB RAM and 20GB storage

### GitHub Repository
- Repository with admin access
- GitHub Actions enabled
- Secrets configured (see below)

## 🖥️ Server Setup

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama service
sudo systemctl enable ollama
sudo systemctl start ollama

# Pull the model
ollama pull gpt-oss:20b
```

### 2. Prepare Deployment Directories

```bash
# Create deployment directories
sudo mkdir -p /opt/portfolio
sudo mkdir -p /opt/portfolio-backups
sudo chown -R $USER:$USER /opt/portfolio
sudo chown -R $USER:$USER /opt/portfolio-backups
```

### 3. Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 🔐 GitHub Repository Setup

### 1. Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SERVER_HOST` | Your server IP address | `203.0.113.1` |
| `SERVER_USER` | SSH username | `ubuntu` |
| `SERVER_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `SERVER_PORT` | SSH port (optional) | `22` |

### 2. Generate SSH Key

On your local machine:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/portfolio_deploy_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/portfolio_deploy_key.pub user@your-server-ip

# Copy private key content for GitHub secret
cat ~/.ssh/portfolio_deploy_key
```

### 3. Environment Configuration

Create a `production` environment in your GitHub repository:

1. Go to Settings → Environments
2. Click "New environment"
3. Name it `production`
4. Add protection rules if needed
5. Set environment URL: `https://portfolio.adityavikram.dev`

## 🚀 Deployment Workflows

### Automatic Deployment (Main Workflow)

**File**: `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch
- Manual dispatch

**Phases:**
1. 🧪 **Test & Lint** - Code quality checks
2. 🐳 **Build Docker Images** - Multi-arch container builds
3. 🔒 **Security Scanning** - Vulnerability assessment
4. 🚀 **Deploy to Server** - Production deployment
5. 📢 **Notifications** - Status updates
6. 🧹 **Cleanup** - Resource cleanup

### Manual Deployment Workflow

**File**: `.github/workflows/manual-deploy.yml`

**Features:**
- Choose specific environment (production/staging/development)
- Select services to deploy (frontend/proxy/nginx/all)
- Specify Docker image tags
- Skip tests option
- Force restart capability

**Usage:**
1. Go to Actions tab in GitHub
2. Select "🔧 Manual Deploy"
3. Click "Run workflow"
4. Fill in parameters
5. Click "Run workflow"

## 📋 Manual Deployment

### Quick Deploy Commands

```bash
# Navigate to repository
cd /path/to/your/repository

# Deploy to production
git push origin main  # Triggers automatic deployment

# Or trigger manual deployment via GitHub UI
# Actions → Manual Deploy → Run workflow
```

### Local Testing Before Deployment

```bash
# Test Docker build locally
./scripts/docker-dev.sh build

# Test with production configuration
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Run tests
./scripts/docker-dev.sh test
```

### Server Commands

```bash
# SSH into server
ssh -i ~/.ssh/portfolio_deploy_key user@your-server-ip

# Check deployment status
cd /opt/portfolio
sudo docker-compose ps

# View logs
sudo docker-compose logs -f [service_name]

# Manual service management
sudo docker-compose restart [service_name]
sudo docker-compose stop [service_name]
sudo docker-compose start [service_name]

# Health checks
curl http://localhost:3000          # Frontend
curl http://localhost:5950/health   # API Proxy
curl http://localhost              # Nginx
```

## 🔍 Monitoring & Troubleshooting

### Container Status

```bash
# Check running containers
sudo docker-compose ps

# Resource usage
sudo docker stats

# Service logs
sudo docker-compose logs frontend
sudo docker-compose logs ollama-proxy
sudo docker-compose logs nginx
```

### Common Issues

#### 1. Ollama Connection Failed
```bash
# Check Ollama status
sudo systemctl status ollama
curl http://localhost:11434/api/tags

# Restart Ollama
sudo systemctl restart ollama

# Check model availability
ollama list
```

#### 2. Port Conflicts
```bash
# Check port usage
sudo netstat -tlnp | grep -E "(3000|5950|80|443)"

# Kill conflicting processes
sudo lsof -ti:3000 | xargs kill -9
```

#### 3. Docker Issues
```bash
# Restart Docker daemon
sudo systemctl restart docker

# Clean up Docker resources
sudo docker system prune -f

# Rebuild containers
sudo docker-compose build --no-cache
```

#### 4. Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER /opt/portfolio
sudo chmod +x /opt/portfolio/docker-dev.sh
```

### Log Analysis

```bash
# Application logs
sudo docker-compose logs --tail=100 -f

# System logs
sudo journalctl -u docker -f
sudo journalctl -u ollama -f

# Nginx access logs
sudo docker-compose exec nginx tail -f /var/log/nginx/access.log

# Error logs
sudo docker-compose exec nginx tail -f /var/log/nginx/error.log
```

## 🌍 Environment Management

### Production Environment

- **URL**: `https://portfolio.adityavikram.dev`
- **Directory**: `/opt/portfolio`
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Configuration**: `docker-compose.prod.yml`

### Staging Environment

- **URL**: `https://staging.portfolio.adityavikram.dev`
- **Directory**: `/opt/portfolio-staging`
- **Ports**: 8080 (HTTP), 8443 (HTTPS)
- **Configuration**: Custom override files

### Development Environment

- **URL**: `https://dev.portfolio.adityavikram.dev`
- **Directory**: `/opt/portfolio-development`
- **Ports**: 9080 (HTTP), 9443 (HTTPS)
- **Configuration**: Development overrides

### Environment-Specific Configuration

```yaml
# Example: docker-compose.staging.yml
services:
  frontend:
    ports:
      - "8080:3000"
    environment:
      - NODE_ENV=staging
  
  ollama-proxy:
    ports:
      - "8950:5950"
  
  nginx:
    ports:
      - "8080:80"
      - "8443:443"
```

## 🔄 CI/CD Pipeline Flow

```mermaid
graph TD
    A[Code Push] --> B[GitHub Actions Triggered]
    B --> C[Run Tests & Lint]
    C --> D{Tests Pass?}
    D -->|No| E[❌ Fail Build]
    D -->|Yes| F[Build Docker Images]
    F --> G[Security Scan]
    G --> H[Push to Registry]
    H --> I[Deploy to Server]
    I --> J[Health Checks]
    J --> K{All Healthy?}
    K -->|No| L[❌ Rollback]
    K -->|Yes| M[✅ Success]
    M --> N[Cleanup]
```

## 🛡️ Security Considerations

### Secrets Management
- Use GitHub Secrets for sensitive data
- Rotate SSH keys regularly
- Use least-privilege access

### Container Security
- Regular security scans (Trivy)
- Non-root container users
- Resource limits configured

### Network Security
- Firewall rules configured
- SSL/TLS certificates
- Internal network isolation

## 📈 Performance Optimization

### Resource Limits
```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```

### Caching Strategy
- Docker layer caching
- GitHub Actions cache
- Nginx static file caching

### Monitoring
- Container health checks
- Resource usage monitoring
- Log aggregation

## 🆘 Emergency Procedures

### Rollback to Previous Version
```bash
# Via GitHub Actions
# Actions → Manual Deploy → Select previous tag

# Manual rollback
cd /opt/portfolio-backups
ls -la  # Find backup
sudo cp -r [backup-directory] /opt/portfolio
cd /opt/portfolio
sudo docker-compose up -d
```

### Emergency Maintenance Mode
```bash
# Stop services
sudo docker-compose down

# Start only nginx with maintenance page
# (Configure maintenance.html in nginx)
sudo docker-compose up -d nginx
```

## 📞 Support & Troubleshooting

### Quick Health Check Script
```bash
#!/bin/bash
echo "🔍 Portfolio Health Check"
echo "========================="

# Check services
curl -f http://localhost:3000 && echo "✅ Frontend OK" || echo "❌ Frontend FAIL"
curl -f http://localhost:5950/health && echo "✅ API OK" || echo "❌ API FAIL"
curl -f http://localhost && echo "✅ Nginx OK" || echo "❌ Nginx FAIL"

# Check Ollama
curl -f http://localhost:11434/api/tags && echo "✅ Ollama OK" || echo "❌ Ollama FAIL"

# Resource usage
echo "💻 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

### Contact Information
- **Repository Issues**: GitHub Issues tab
- **Emergency**: Check GitHub Actions logs
- **Documentation**: This file and Docker README

---

## ✅ Deployment Checklist

Before deploying:

- [ ] Server meets requirements
- [ ] GitHub secrets configured
- [ ] Ollama with `gpt-oss:20b` installed
- [ ] SSH access working
- [ ] Domain DNS configured
- [ ] SSL certificates ready (if using HTTPS)
- [ ] Backup procedures tested

After deploying:

- [ ] All services responding
- [ ] Health checks passing
- [ ] SSL working (if configured)
- [ ] Monitoring setup
- [ ] Backup verification
- [ ] Performance baseline established

Happy deploying! 🚀
