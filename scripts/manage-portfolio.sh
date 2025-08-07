#!/bin/bash

# 🎮 Portfolio Management Script
# Easy commands to manage your local Docker portfolio

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

show_help() {
    echo "🎮 Portfolio Management Script"
    echo "=============================="
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       - Build Docker images locally"
    echo "  start       - Start all services"
    echo "  stop        - Stop all services"
    echo "  restart     - Restart all services"
    echo "  status      - Show service status"
    echo "  logs        - Show all logs (follow mode)"
    echo "  logs-front  - Show frontend logs only"
    echo "  logs-proxy  - Show proxy logs only"
    echo "  clean       - Clean up containers and images"
    echo "  rebuild     - Full rebuild and restart"
    echo "  health      - Check service health"
    echo "  shell-front - Open shell in frontend container"
    echo "  shell-proxy - Open shell in proxy container"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  $0 start"
    echo "  $0 logs"
    echo "  $0 health"
}

# Change to project root
cd "$(dirname "$0")/.."

case "${1:-help}" in
    "build")
        log_info "Building Docker images..."
        ./scripts/build-local.sh
        ;;
    
    "start")
        log_info "Starting portfolio services..."
        docker-compose up -d
        log_success "Services started! Frontend: http://localhost:3000, Proxy: http://localhost:5950"
        ;;
    
    "stop")
        log_info "Stopping portfolio services..."
        docker-compose down
        log_success "Services stopped"
        ;;
    
    "restart")
        log_info "Restarting portfolio services..."
        docker-compose down
        docker-compose up -d
        log_success "Services restarted!"
        ;;
    
    "status")
        log_info "Service status:"
        docker-compose ps
        ;;
    
    "logs")
        log_info "Showing all logs (Ctrl+C to exit)..."
        docker-compose logs -f
        ;;
    
    "logs-front")
        log_info "Showing frontend logs (Ctrl+C to exit)..."
        docker-compose logs -f frontend
        ;;
    
    "logs-proxy")
        log_info "Showing proxy logs (Ctrl+C to exit)..."
        docker-compose logs -f ollama-proxy
        ;;
    
    "clean")
        log_warning "This will stop containers and remove images. Continue? (y/N)"
        read -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            log_info "Cleaning up..."
            docker-compose down
            docker rmi portfolio-frontend:latest portfolio-proxy:latest 2>/dev/null || true
            docker system prune -f
            log_success "Cleanup completed"
        else
            log_info "Cleanup cancelled"
        fi
        ;;
    
    "rebuild")
        log_info "Full rebuild and restart..."
        docker-compose down
        ./scripts/build-local.sh
        docker-compose up -d
        log_success "Full rebuild completed! Frontend: http://localhost:3000"
        ;;
    
    "health")
        log_info "Checking service health..."
        echo ""
        
        # Check frontend
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            log_success "Frontend is healthy (http://localhost:3000)"
        else
            log_error "Frontend health check failed"
        fi
        
        # Check proxy
        if curl -f http://localhost:5950/health > /dev/null 2>&1; then
            log_success "Proxy is healthy (http://localhost:5950/health)"
        else
            log_error "Proxy health check failed"
        fi
        
        echo ""
        log_info "Container status:"
        docker-compose ps
        ;;
    
    "shell-front")
        log_info "Opening shell in frontend container..."
        docker exec -it portfolio-frontend /bin/sh
        ;;
    
    "shell-proxy")
        log_info "Opening shell in proxy container..."
        docker exec -it portfolio-ollama-proxy /bin/bash
        ;;
    
    "help")
        show_help
        ;;
    
    *)
        log_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
