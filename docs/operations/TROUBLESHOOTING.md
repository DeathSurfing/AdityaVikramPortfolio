# 🔧 Troubleshooting Guide

> Common issues and their solutions for the Aditya Vikram Portfolio

## 🚨 Quick Diagnostics

### Health Check Script
```bash
#!/bin/bash
echo "🔍 Portfolio Health Check"
echo "========================="

# Check services
curl -f http://localhost:3000 && echo "✅ Frontend OK" || echo "❌ Frontend FAIL"
curl -f http://localhost:5950/health && echo "✅ API OK" || echo "❌ API FAIL"
curl -f http://localhost:11434/api/tags && echo "✅ Ollama OK" || echo "❌ Ollama FAIL"

# Resource usage
echo "💻 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## 🐳 Docker Issues

### Container Not Starting
```bash
# Check container status
docker-compose ps

# View detailed logs
./scripts/manage-portfolio.sh logs

# Restart specific service
docker-compose restart frontend
docker-compose restart ollama-proxy

# Nuclear option: full rebuild
./scripts/manage-portfolio.sh clean
./scripts/manage-portfolio.sh rebuild
```

### Port Conflicts
```bash
# Find what's using the port
lsof -i :3000
lsof -i :5950

# Kill conflicting processes
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:5950)

# Or change ports in docker-compose.yml
```

### Build Failures
```bash
# Clean Docker environment
docker system prune -a

# Rebuild with no cache
./scripts/build-local.sh --no-cache

# Check Dockerfile syntax
docker build --no-cache frontend/
docker build --no-cache ollama-proxy/
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
chmod +x scripts/*.sh

# Docker permissions
sudo usermod -aG docker $USER
newgrp docker
```

## 🤖 Ollama Issues

### Ollama Not Running
```bash
# Check if Ollama is running
ps aux | grep ollama

# Start Ollama service
ollama serve

# Check if model is available
ollama list

# Pull model if missing
ollama pull gpt-oss:20b
```

### Model Loading Issues
```bash
# Check available models
curl http://localhost:11434/api/tags

# Test model directly
curl http://localhost:11434/api/generate \
  -d '{"model": "gpt-oss:20b", "prompt": "Hello"}'

# Check Ollama logs
journalctl -u ollama -f
```

### Connection Refused
```bash
# Check if Ollama is listening
netstat -tlnp | grep 11434

# Test connection from container
docker exec -it portfolio-ollama-proxy \
  curl http://host.docker.internal:11434/api/tags

# Restart Ollama
sudo systemctl restart ollama
```

## 🌐 Network Issues

### Frontend Not Loading
```bash
# Check Next.js build
cd frontend
npm run build

# Check if port is available
telnet localhost 3000

# Inspect container
docker exec -it portfolio-frontend ls -la .next/

# Check environment variables
docker exec -it portfolio-frontend env | grep NODE_ENV
```

### API Requests Failing
```bash
# Test proxy health
curl -v http://localhost:5950/health

# Test CORS
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5950/api/chat

# Check proxy logs
docker logs portfolio-ollama-proxy
```

### Cloudflare Tunnel Issues
```bash
# Validate tunnel config
cloudflared tunnel validate cloudflare-tunnel-config.yml

# Check tunnel status
cloudflared tunnel info your-tunnel-name

# Test tunnel connectivity
cloudflared tunnel run --loglevel debug your-tunnel-name
```

## 🔄 GitHub Actions Issues

### Workflow Failures
```bash
# Check runner status
./run.sh

# Verify Docker on runner
docker info

# Check self-hosted runner logs
journalctl -u actions.runner.* -f
```

### Build Failures in CI
```bash
# Test locally first
./scripts/manage-portfolio.sh test

# Check workflow logs in GitHub
# Go to Actions tab -> Select failed workflow -> View logs

# Manually trigger workflow
# Actions -> Manual Deploy -> Run workflow
```

### Permission Issues in CI
```bash
# Ensure runner user has Docker permissions
sudo usermod -aG docker $USER

# Check file permissions
ls -la docker-compose.yml
ls -la scripts/
```

## 📱 Frontend Issues

### Build Errors
```bash
# Clean install
cd frontend
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

### Runtime Errors
```bash
# Check browser console for errors
# Open dev tools -> Console

# Check Next.js logs
npm run dev

# Test production build
npm run build
npm run start
```

### Missing Dependencies
```bash
# Install missing packages
cd frontend
npm install

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
```

## 🐍 Python/FastAPI Issues

### Proxy Server Errors
```bash
# Check Python version
python3 --version

# Install dependencies
cd ollama-proxy
pip install -r requirements.txt

# Run manually for debugging
python3 main.py

# Check for syntax errors
python3 -m py_compile main.py
```

### Dependency Conflicts
```bash
# Create fresh virtual environment
cd ollama-proxy
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 📊 Performance Issues

### High Memory Usage
```bash
# Check resource usage
docker stats

# Limit container resources
# Edit docker-compose.yml:
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Slow Response Times
```bash
# Check Ollama performance
time curl -X POST http://localhost:11434/api/generate \
  -d '{"model": "gpt-oss:20b", "prompt": "Hello"}'

# Monitor container performance
docker exec -it portfolio-frontend top
docker exec -it portfolio-ollama-proxy top
```

## 🔐 SSL/Security Issues

### Certificate Errors
```bash
# Check certificate validity
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Renew certificates
# (depends on your certificate provider)

# Test SSL configuration
curl -I https://portfolio.adityavikram.dev
```

### CORS Errors
```bash
# Check CORS headers
curl -I -H "Origin: https://portfolio.adityavikram.dev" \
     http://localhost:5950/api/chat

# Update CORS settings in ollama-proxy/main.py
# Add your domain to allow_origins
```

## 🧹 Cleanup & Maintenance

### Clean Up Docker Resources
```bash
# Remove unused containers, networks, images
docker system prune -a

# Clean up specific to portfolio
./scripts/manage-portfolio.sh clean

# Remove all containers and start fresh
docker-compose down -v
docker system prune -a
./scripts/manage-portfolio.sh rebuild
```

### Log Rotation
```bash
# Check log sizes
du -h /var/lib/docker/containers/*/*-json.log

# Configure log rotation in docker-compose.yml
services:
  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 📞 Getting Help

### Gather Diagnostic Information
```bash
# System information
uname -a
docker --version
docker-compose --version

# Service status
./scripts/manage-portfolio.sh status
./scripts/manage-portfolio.sh health

# Recent logs
./scripts/manage-portfolio.sh logs --tail=50

# Resource usage
df -h
free -h
docker stats --no-stream
```

### Common Error Patterns

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Service not running | Start the service |
| `Port already in use` | Port conflict | Change port or kill process |
| `Permission denied` | Wrong permissions | Fix file/docker permissions |
| `Image not found` | Missing Docker image | Build image with scripts |
| `CORS error` | Domain not allowed | Update CORS configuration |
| `Model not found` | Ollama model missing | `ollama pull gpt-oss:20b` |

### Support Channels
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/DeathSurfing/AdityaVikramPortfolio/issues)
- **Documentation**: Check all docs in the `/docs` folder
- **Logs**: Always check logs first for error details

---

**💡 Pro Tip**: Most issues can be resolved by checking logs and restarting services. When in doubt, try `./scripts/manage-portfolio.sh restart`!
