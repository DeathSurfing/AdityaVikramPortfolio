# 🐳 Docker Deployment Guide

This guide explains how to run your portfolio application using Docker containers instead of nixpacks.

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│              Nginx (Optional)           │ ← Port 80/443 (Production)
│         Reverse Proxy & SSL             │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼────────┐    ┌────────▼────────┐
│   Frontend     │    │  Ollama Proxy   │
│   (Next.js)    │    │   (FastAPI)     │
│   Port 3000    │    │   Port 5950     │
└────────────────┘    └─────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │      Ollama       │
                    │   (External)      │
                    │   Port 11434      │
                    └───────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Ollama running on your system (`ollama serve`)
- The `gpt-oss:20b` model available in Ollama

### 1. Development Mode (Local Testing)

```bash
# Build the containers
./scripts/docker-dev.sh build

# Start the application
./scripts/docker-dev.sh start

# Or start with live logs
./scripts/docker-dev.sh start --logs
```

**Access Points:**
- Frontend: http://localhost:3000
- API Proxy: http://localhost:5950
- Health Check: http://localhost:5950/health

### 2. Production-like Mode (with Nginx)

```bash
# Start with Nginx reverse proxy
./scripts/docker-dev.sh start-prod
```

**Access Points:**
- Main Application: http://localhost (via Nginx)
- Direct Frontend: http://localhost:3000
- Direct API: http://localhost:5950

## 📋 Available Commands

### Docker Management Script

```bash
# Build containers
./scripts/docker-dev.sh build [--no-cache]

# Start services
./scripts/docker-dev.sh start [--logs]
./scripts/docker-dev.sh start-prod

# Manage running containers
./scripts/docker-dev.sh stop
./scripts/docker-dev.sh restart [--logs]
./scripts/docker-dev.sh status

# View logs
./scripts/docker-dev.sh logs [service_name]

# Test setup
./scripts/docker-dev.sh test

# Clean up (destructive)
./scripts/docker-dev.sh clean

# Help
./scripts/docker-dev.sh help
```

### Direct Docker Compose Commands

```bash
# Development mode (without Nginx)
docker-compose up -d frontend ollama-proxy

# Production mode (with Nginx)
docker-compose --profile production up -d

# View logs
docker-compose logs -f [service]

# Stop everything
docker-compose down
```

## 🔧 Configuration

### Environment Variables

Copy and customize the environment file:

```bash
cp .env.docker .env
# Edit .env with your specific settings
```

Key variables:
- `OLLAMA_ENDPOINT`: Where to find Ollama server
- `OLLAMA_MODEL`: Which model to use (set to `gpt-oss:20b`)
- `NODE_ENV`: Node.js environment
- Port mappings and domain settings

### For Production Server

1. **Update Ollama Endpoint:**
   ```bash
   # In .env or docker-compose.yml
   OLLAMA_ENDPOINT=http://your-server-ip:11434
   ```

2. **SSL Configuration (Optional):**
   - Place SSL certificates in `nginx/ssl/`
   - Uncomment HTTPS server block in `nginx/nginx.conf`
   - Enable production SSL settings

3. **Domain Configuration:**
   - Update `nginx/nginx.conf` with your actual domain names
   - Configure DNS to point to your server

## 🏗️ Container Details

### Frontend Container
- **Base**: Node.js 20 Alpine
- **Build**: Multi-stage (deps → builder → runner)
- **Port**: 3000
- **Features**: 
  - Standalone Next.js build
  - Optimized for production
  - Non-root user for security

### Ollama Proxy Container
- **Base**: Python 3.11 Slim
- **Port**: 5950
- **Features**:
  - FastAPI with async support
  - Health checks
  - CORS enabled
  - Automatic retry logic

### Nginx Container (Optional)
- **Base**: Nginx Alpine
- **Ports**: 80, 443
- **Features**:
  - Reverse proxy
  - Rate limiting
  - SSL termination
  - Gzip compression
  - Security headers

## 🔍 Monitoring & Debugging

### Health Checks

All containers have built-in health checks:

```bash
# Check container health
docker-compose ps

# Manual health check
curl http://localhost:5950/health
curl http://localhost:3000/api/health
```

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f ollama-proxy
docker-compose logs -f nginx

# Using the management script
./scripts/docker-dev.sh logs frontend
```

### Container Status

```bash
# Using the management script
./scripts/docker-dev.sh status

# Direct Docker commands
docker-compose ps
docker stats $(docker-compose ps -q)
```

## 🚨 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/tags
   
   # Start Ollama if needed
   ollama serve
   
   # Verify model is available
   ollama list
   ```

2. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :5950
   
   # Stop conflicting processes or change ports in docker-compose.yml
   ```

3. **Build Errors**
   ```bash
   # Clean build
   ./scripts/docker-dev.sh clean
   ./scripts/docker-dev.sh build --no-cache
   ```

4. **Frontend Not Loading**
   ```bash
   # Check frontend logs
   docker-compose logs frontend
   
   # Verify build completed
   docker exec -it portfolio-frontend ls -la .next/
   ```

5. **API Requests Failing**
   ```bash
   # Check proxy health
   curl http://localhost:5950/health
   
   # Test direct Ollama connection from container
   docker exec -it portfolio-ollama-proxy curl http://host.docker.internal:11434/api/tags
   ```

### Performance Optimization

1. **Resource Limits**: Add resource limits to docker-compose.yml if needed
2. **Multi-stage Builds**: Already implemented for minimal image sizes
3. **Caching**: Docker layer caching is optimized in Dockerfiles

## 🔒 Security Considerations

### Development
- Containers run as non-root users where possible
- No sensitive data in images
- Health checks prevent unhealthy containers

### Production
- Enable SSL/TLS (uncomment HTTPS in nginx.conf)
- Use secrets management for sensitive data
- Enable security headers (already configured)
- Consider using Docker Secrets for production passwords

## 📦 Deployment Options

### 1. Local Development
Use the provided scripts for easy local development and testing.

### 2. VPS/Cloud Server
1. Copy files to server
2. Update `.env` with server-specific settings
3. Set up SSL certificates
4. Run with production profile

### 3. Container Orchestration
The setup is ready for:
- Docker Swarm
- Kubernetes (would need additional manifests)
- Cloud container services (ECS, Cloud Run, etc.)

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Nginx Configuration](https://nginx.org/en/docs/)

## 🤝 Contributing

When modifying the Docker setup:

1. Test changes locally first
2. Update this README if adding new features
3. Ensure backwards compatibility
4. Add appropriate health checks
5. Update the management script if needed

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Frontend loads at http://localhost:3000
- [ ] API proxy responds at http://localhost:5950/health
- [ ] Ollama connection is healthy
- [ ] Chat functionality works end-to-end
- [ ] Containers restart properly
- [ ] Logs are accessible and meaningful
- [ ] Health checks are passing

Use `./scripts/docker-dev.sh test` to run automated checks!
