#!/bin/bash

# Portfolio Docker Development Script
# This script helps manage the Docker containers for local development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Check if Ollama is running
check_ollama() {
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        print_warning "Ollama doesn't seem to be running on localhost:11434"
        print_warning "Make sure to start Ollama before running the containers"
        print_warning "Run: ollama serve"
    else
        print_success "Ollama is running and accessible"
    fi
}

# Build containers
build() {
    print_status "Building Docker containers..."
    
    check_docker
    
    # Build with no cache for fresh builds
    if [ "$1" == "--no-cache" ]; then
        docker-compose build --no-cache
    else
        docker-compose build
    fi
    
    print_success "Docker containers built successfully!"
}

# Start containers
start() {
    print_status "Starting Portfolio application..."
    
    check_docker
    check_ollama
    
    # Start without nginx by default (development mode)
    docker-compose up -d frontend ollama-proxy
    
    print_success "Portfolio application started!"
    print_status "Frontend: http://localhost:3000"
    print_status "API Proxy: http://localhost:5950"
    print_status "Health Check: http://localhost:5950/health"
    
    # Show logs
    if [ "$1" == "--logs" ]; then
        docker-compose logs -f
    fi
}

# Start with nginx (production-like)
start_production() {
    print_status "Starting Portfolio application with Nginx..."
    
    check_docker
    check_ollama
    
    docker-compose --profile production up -d
    
    print_success "Portfolio application with Nginx started!"
    print_status "Application: http://localhost (via Nginx)"
    print_status "Frontend: http://localhost:3000 (direct)"
    print_status "API Proxy: http://localhost:5950 (direct)"
}

# Stop containers
stop() {
    print_status "Stopping Portfolio application..."
    docker-compose down
    print_success "Portfolio application stopped!"
}

# Show logs
logs() {
    if [ -n "$1" ]; then
        docker-compose logs -f "$1"
    else
        docker-compose logs -f
    fi
}

# Show status
status() {
    print_status "Portfolio Docker Container Status:"
    docker-compose ps
    
    echo ""
    print_status "Docker Networks:"
    docker network ls | grep portfolio
    
    echo ""
    print_status "Container Resource Usage:"
    docker stats --no-stream $(docker-compose ps -q) 2>/dev/null || echo "No running containers"
}

# Clean up everything
clean() {
    print_warning "This will remove all containers, images, and volumes for this project."
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up Docker resources..."
        docker-compose down -v --remove-orphans
        docker-compose down --rmi all
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Restart containers
restart() {
    stop
    start "$@"
}

# Test the setup
test() {
    print_status "Testing Portfolio setup..."
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        print_error "No containers are running. Start them first with: $0 start"
        exit 1
    fi
    
    # Test frontend
    print_status "Testing frontend..."
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend is accessible"
    else
        print_error "Frontend is not accessible"
    fi
    
    # Test API proxy
    print_status "Testing API proxy..."
    if curl -s http://localhost:5950/health > /dev/null; then
        print_success "API proxy is accessible"
    else
        print_error "API proxy is not accessible"
    fi
    
    # Test Ollama connection
    print_status "Testing Ollama connection..."
    HEALTH_RESPONSE=$(curl -s http://localhost:5950/health | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    if [ "$HEALTH_RESPONSE" == "healthy" ]; then
        print_success "Ollama connection is healthy"
    else
        print_warning "Ollama connection might have issues"
    fi
}

# Help function
help() {
    echo "Portfolio Docker Management Script"
    echo ""
    echo "Usage: $0 COMMAND [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build [--no-cache]     Build Docker containers"
    echo "  start [--logs]         Start containers (development mode)"
    echo "  start-prod            Start containers with Nginx (production-like)"
    echo "  stop                  Stop all containers"
    echo "  restart [--logs]      Restart containers"
    echo "  logs [SERVICE]        Show logs (optionally for specific service)"
    echo "  status                Show container status and resource usage"
    echo "  test                  Test the running setup"
    echo "  clean                 Clean up all Docker resources (destructive)"
    echo "  help                  Show this help message"
    echo ""
    echo "Services: frontend, ollama-proxy, nginx"
    echo ""
    echo "Examples:"
    echo "  $0 build --no-cache   # Build fresh containers"
    echo "  $0 start --logs       # Start and follow logs"
    echo "  $0 logs frontend      # Show frontend logs"
    echo "  $0 test              # Test the setup"
}

# Main script logic
case "${1}" in
    build)
        build "$2"
        ;;
    start)
        start "$2"
        ;;
    start-prod)
        start_production
        ;;
    stop)
        stop
        ;;
    restart)
        restart "$2"
        ;;
    logs)
        logs "$2"
        ;;
    status)
        status
        ;;
    test)
        test
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        help
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use '$0 help' for usage information."
        exit 1
        ;;
esac
