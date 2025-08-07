# 🐳 Local Docker Setup

This guide explains how to build and run the portfolio locally using Docker without any external registries.

## 🚀 Quick Start

### Option 1: Use the Management Script (Recommended)

```bash
# Build images and start services
./scripts/manage-portfolio.sh rebuild

# Check health
./scripts/manage-portfolio.sh health

# View logs
./scripts/manage-portfolio.sh logs
```

### Option 2: Manual Commands

```bash
# 1. Build images locally
./scripts/build-local.sh

# 2. Start services
docker-compose up -d

# 3. Check status
docker-compose ps
```

## 🛠️ Available Scripts

### `./scripts/build-local.sh`
- Builds both frontend and proxy Docker images locally
- Tags images with `latest` and git commit hash
- Includes build testing and cleanup options
- No registry pushing - purely local

### `./scripts/manage-portfolio.sh [command]`
- **`build`** - Build Docker images locally
- **`start`** - Start all services
- **`stop`** - Stop all services  
- **`restart`** - Restart all services
- **`status`** - Show service status
- **`logs`** - Show all logs (follow mode)
- **`logs-front`** - Show frontend logs only
- **`logs-proxy`** - Show proxy logs only
- **`clean`** - Clean up containers and images
- **`rebuild`** - Full rebuild and restart
- **`health`** - Check service health
- **`shell-front`** - Open shell in frontend container
- **`shell-proxy`** - Open shell in proxy container
- **`help`** - Show help message

## 🌐 Services

Once running, your services will be available at:

- **Frontend**: http://localhost:3000
- **Proxy API**: http://localhost:5950
- **Proxy Health**: http://localhost:5950/health

## 🏗️ Docker Images

The setup creates these local images:

- `portfolio-frontend:latest` - Next.js frontend application
- `portfolio-proxy:latest` - FastAPI Ollama proxy server

## 🔧 Development Workflow

### Making Changes

1. **Frontend changes**:
   ```bash
   # After making changes to frontend code
   ./scripts/manage-portfolio.sh rebuild
   ```

2. **Proxy changes**:
   ```bash
   # After making changes to ollama-proxy code
   ./scripts/manage-portfolio.sh rebuild
   ```

### Debugging

```bash
# View all logs
./scripts/manage-portfolio.sh logs

# View frontend logs only
./scripts/manage-portfolio.sh logs-front

# View proxy logs only
./scripts/manage-portfolio.sh logs-proxy

# Open shell in frontend container
./scripts/manage-portfolio.sh shell-front

# Open shell in proxy container  
./scripts/manage-portfolio.sh shell-proxy
```

### Health Monitoring

```bash
# Check if services are healthy
./scripts/manage-portfolio.sh health

# Check service status
./scripts/manage-portfolio.sh status
```

## 📦 Docker Compose Configuration

The `docker-compose.yml` is configured to:

- Use locally built images (`portfolio-frontend:latest`, `portfolio-proxy:latest`)
- Fall back to building from source if images don't exist
- Set up proper networking between services
- Include health checks for the proxy service
- Mount no volumes (fully containerized)

## 🧹 Cleanup

```bash
# Clean up containers and images
./scripts/manage-portfolio.sh clean

# Full Docker system cleanup (removes all unused containers, images, etc.)
docker system prune -a
```

## 🚨 Troubleshooting

### Images Not Found
If you get "image not found" errors:
```bash
./scripts/build-local.sh
docker-compose up -d
```

### Services Not Starting
Check logs:
```bash
./scripts/manage-portfolio.sh logs
```

### Port Conflicts
If ports 3000 or 5950 are in use:
```bash
# Stop other services using those ports, or
# Modify docker-compose.yml to use different ports
```

### Build Failures
```bash
# Clean everything and rebuild
./scripts/manage-portfolio.sh clean
./scripts/manage-portfolio.sh rebuild
```

## 🔄 Production Deployment

For production deployment on your server:

1. Copy the project files to your server
2. Run the same build process:
   ```bash
   ./scripts/build-local.sh
   docker-compose up -d
   ```
3. Set up reverse proxy (nginx) if needed
4. Configure environment variables for production

The beauty of this setup is that it works the same locally and in production!

## ✅ Benefits of Local Building

- ✅ No external registry dependencies
- ✅ Faster builds (no push/pull)
- ✅ Works offline
- ✅ Same process for local development and production
- ✅ No registry permissions needed
- ✅ Complete control over images
- ✅ Simplified CI/CD (if using self-hosted runners)
