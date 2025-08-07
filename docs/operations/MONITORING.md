# 📊 Monitoring & Health Checks

> Comprehensive monitoring guide for the Aditya Vikram Portfolio

## 🔍 Health Check Overview

Your portfolio includes multiple layers of health monitoring:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Ollama Proxy   │    │     Ollama      │
│   Status Check  │    │  Health Endpoint │    │  Model Check   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        ┌─────────────────┐
                        │   Docker Health │
                        │     Checks      │
                        └─────────────────┘
```

## ⚡ Quick Health Check

### One-Command Status
```bash
./scripts/manage-portfolio.sh health
```

### Manual Health Checks
```bash
# Frontend health
curl -f http://localhost:3000 && echo "✅ Frontend OK"

# API health
curl -f http://localhost:5950/health && echo "✅ API OK"

# Ollama health
curl -f http://localhost:11434/api/tags && echo "✅ Ollama OK"

# Container health
docker-compose ps
```

## 🐳 Docker Container Monitoring

### Container Status
```bash
# View all containers
docker-compose ps

# Detailed container info
docker inspect portfolio-frontend
docker inspect portfolio-ollama-proxy

# Resource usage
docker stats --no-stream

# Real-time monitoring
docker stats
```

### Health Check Configuration
```yaml
# docker-compose.yml
services:
  ollama-proxy:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5950/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

### Container Logs
```bash
# All services
./scripts/manage-portfolio.sh logs

# Specific service
docker-compose logs -f frontend
docker-compose logs -f ollama-proxy

# With timestamps
docker-compose logs -t ollama-proxy

# Last N lines
docker-compose logs --tail=100 frontend
```

## 🌐 Service Monitoring

### Frontend Monitoring
```bash
# Check if Next.js is responding
curl -I http://localhost:3000

# Check specific pages
curl -f http://localhost:3000/projects
curl -f http://localhost:3000/whoami

# Performance check
time curl -s http://localhost:3000 > /dev/null
```

### API Proxy Monitoring
```bash
# Health endpoint
curl http://localhost:5950/health | jq

# Models endpoint
curl http://localhost:5950/api/models | jq

# Chat functionality test
curl -X POST http://localhost:5950/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Health check test"}' | jq

# CORS test
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     http://localhost:5950/api/chat
```

### Ollama Monitoring
```bash
# Check Ollama service
curl http://localhost:11434/api/tags | jq

# Test model generation
curl -X POST http://localhost:11434/api/generate \
  -d '{"model": "gpt-oss:20b", "prompt": "Health check", "stream": false}' | jq

# Check model loading
curl http://localhost:11434/api/ps | jq
```

## 📈 Performance Monitoring

### Resource Usage
```bash
# System resources
htop
free -h
df -h

# Docker resources
docker stats

# Specific container resources
docker exec portfolio-frontend ps aux
docker exec portfolio-ollama-proxy ps aux
```

### Response Time Monitoring
```bash
# Frontend response time
time curl -s http://localhost:3000 > /dev/null

# API response time
time curl -s http://localhost:5950/health > /dev/null

# Ollama response time
time curl -X POST http://localhost:11434/api/generate \
  -d '{"model": "gpt-oss:20b", "prompt": "test", "stream": false}' > /dev/null
```

### Memory and CPU Monitoring
```bash
# Container memory usage
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

# Process monitoring inside containers
docker exec portfolio-frontend top -bn1
docker exec portfolio-ollama-proxy top -bn1
```

## 🚨 Alerting & Notifications

### Custom Health Check Script
```bash
#!/bin/bash
# health-monitor.sh

check_service() {
  local service=$1
  local url=$2
  local name=$3
  
  if curl -f -s "$url" > /dev/null; then
    echo "✅ $name OK"
    return 0
  else
    echo "❌ $name FAILED"
    return 1
  fi
}

echo "🔍 Portfolio Health Monitor - $(date)"
echo "===================================="

failed=0

# Check all services
check_service "frontend" "http://localhost:3000" "Frontend" || ((failed++))
check_service "api" "http://localhost:5950/health" "API Proxy" || ((failed++))
check_service "ollama" "http://localhost:11434/api/tags" "Ollama" || ((failed++))

# Resource usage
echo ""
echo "💻 Resource Usage:"
docker stats --no-stream --format "{{.Name}}: CPU {{.CPUPerc}}, Memory {{.MemUsage}}"

echo ""
if [ $failed -eq 0 ]; then
  echo "🎉 All services healthy!"
  exit 0
else
  echo "⚠️  $failed service(s) failed!"
  exit 1
fi
```

### Automated Monitoring Cron Job
```bash
# Add to crontab (crontab -e)
*/5 * * * * /path/to/portfolio/health-monitor.sh >> /var/log/portfolio-health.log 2>&1
```

## 📊 Log Analysis

### Log Aggregation
```bash
# Centralized logging
docker-compose logs --follow --timestamps > portfolio-logs.txt

# Error filtering
docker-compose logs | grep -i error

# Warning filtering
docker-compose logs | grep -i warn

# Tail specific patterns
docker-compose logs -f | grep -E "(error|warn|fail)"
```

### Log Rotation Configuration
```yaml
# docker-compose.yml
services:
  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
  
  ollama-proxy:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Important Log Locations
- **Frontend logs**: `docker-compose logs frontend`
- **Proxy logs**: `docker-compose logs ollama-proxy`  
- **Ollama logs**: `journalctl -u ollama -f`
- **System logs**: `/var/log/syslog`
- **Docker logs**: `journalctl -u docker -f`

## 🎯 Key Performance Indicators (KPIs)

### Service Health KPIs
- **Frontend availability**: 99%+ uptime
- **API response time**: < 2 seconds
- **Ollama response time**: < 5 seconds for chat
- **Memory usage**: < 80% of available RAM
- **CPU usage**: < 70% average

### Monitoring Dashboard Script
```bash
#!/bin/bash
# dashboard.sh - Simple monitoring dashboard

clear
echo "🚀 Portfolio Dashboard - $(date)"
echo "================================="

# Service status
echo "📊 Service Status:"
curl -f -s http://localhost:3000 > /dev/null && echo "  Frontend: ✅ UP" || echo "  Frontend: ❌ DOWN"
curl -f -s http://localhost:5950/health > /dev/null && echo "  API: ✅ UP" || echo "  API: ❌ DOWN"
curl -f -s http://localhost:11434/api/tags > /dev/null && echo "  Ollama: ✅ UP" || echo "  Ollama: ❌ DOWN"

echo ""
echo "💻 Resource Usage:"
docker stats --no-stream --format "  {{.Name}}: CPU {{.CPUPerc}}, Memory {{.MemUsage}}"

echo ""
echo "🐳 Container Status:"
docker-compose ps --format "table"

echo ""
echo "📈 System Resources:"
echo "  Memory: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "  Disk: $(df -h / | awk 'NR==2 {print $3 "/" $2}')"
echo "  Load: $(uptime | awk -F'load average:' '{print $2}')"
```

## 🔄 Automated Health Recovery

### Self-Healing Script
```bash
#!/bin/bash
# auto-heal.sh

restart_service() {
  local service=$1
  echo "🔄 Restarting $service..."
  docker-compose restart "$service"
  sleep 30
}

# Check and restart if needed
if ! curl -f -s http://localhost:3000 > /dev/null; then
  echo "❌ Frontend down, restarting..."
  restart_service frontend
fi

if ! curl -f -s http://localhost:5950/health > /dev/null; then
  echo "❌ API down, restarting..."
  restart_service ollama-proxy
fi

# Check if Ollama is running
if ! curl -f -s http://localhost:11434/api/tags > /dev/null; then
  echo "❌ Ollama down, attempting restart..."
  sudo systemctl restart ollama
  sleep 60
  restart_service ollama-proxy
fi
```

## 📱 External Monitoring

### Uptime Monitoring Services
For production deployments, consider:
- **Uptime Robot**: Free external monitoring
- **Pingdom**: Comprehensive uptime monitoring
- **StatusCake**: Multiple location checks
- **Cloudflare Analytics**: Built-in analytics

### Webhook Notifications
```bash
# Slack webhook example
send_slack_alert() {
  local message=$1
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"🚨 Portfolio Alert: $message\"}" \
    YOUR_SLACK_WEBHOOK_URL
}

# Discord webhook example  
send_discord_alert() {
  local message=$1
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"content\":\"🚨 Portfolio Alert: $message\"}" \
    YOUR_DISCORD_WEBHOOK_URL
}
```

## 📋 Monitoring Checklist

### Daily Checks
- [ ] All services responding
- [ ] No error logs in past 24 hours
- [ ] Resource usage within normal ranges
- [ ] SSL certificates valid (if using HTTPS)

### Weekly Checks
- [ ] Docker image updates available
- [ ] System security updates
- [ ] Log file sizes and rotation
- [ ] Backup verification

### Monthly Checks
- [ ] Performance trend analysis
- [ ] Capacity planning review
- [ ] Security audit
- [ ] Documentation updates

---

**📊 Monitoring is key to maintaining a healthy portfolio!** Set up automated checks and review them regularly to ensure optimal performance.
