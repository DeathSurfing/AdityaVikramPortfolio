#!/bin/bash

# 🏗️ Local Portfolio Build Script
# Builds Docker containers locally without pushing to any registry

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

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
    log_success "Docker is running"
}

# Build frontend image
build_frontend() {
    log_info "Building Frontend Docker image..."
    cd frontend
    
    # Test the build first
    if npm run build; then
        log_success "Frontend build test passed"
    else
        log_error "Frontend build test failed"
        exit 1
    fi
    
    # Build Docker image
    docker build -t portfolio-frontend:latest -t "portfolio-frontend:$(git rev-parse --short HEAD)" .
    
    cd ..
    log_success "Frontend Docker image built successfully"
}

# Build proxy image
build_proxy() {
    log_info "Building Ollama Proxy Docker image..."
    cd ollama-proxy
    
    # Build Docker image
    docker build -t portfolio-proxy:latest -t "portfolio-proxy:$(git rev-parse --short HEAD)" .
    
    cd ..
    log_success "Proxy Docker image built successfully"
}

# Clean up old images
cleanup_images() {
    log_info "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f || true
    
    # Optionally remove old tagged images (keep latest + last 3)
    old_frontend_images=$(docker images portfolio-frontend --format "{{.Tag}}" | grep -v latest | tail -n +4)
    old_proxy_images=$(docker images portfolio-proxy --format "{{.Tag}}" | grep -v latest | tail -n +4)
    
    for img in $old_frontend_images; do
        docker rmi "portfolio-frontend:$img" || true
    done
    
    for img in $old_proxy_images; do
        docker rmi "portfolio-proxy:$img" || true
    done
    
    log_success "Cleanup completed"
}

# List built images
list_images() {
    log_info "Built Docker images:"
    echo ""
    docker images | grep -E "(REPOSITORY|portfolio-)" || echo "No portfolio images found"
    echo ""
}

# Main execution
main() {
    echo "🏗️ Portfolio Local Build Script"
    echo "==============================="
    echo ""
    
    # Check prerequisites
    check_docker
    
    # Change to project root
    cd "$(dirname "$0")/.."
    
    log_info "Project directory: $(pwd)"
    
    # Build images
    build_frontend
    build_proxy
    
    # Show results
    list_images
    
    # Optional cleanup
    read -p "Do you want to clean up old images? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup_images
    fi
    
    log_success "Build completed successfully! 🎉"
    echo ""
    echo "To start the containers, run:"
    echo "  docker-compose up -d"
    echo ""
    echo "To view logs:"
    echo "  docker-compose logs -f"
    echo ""
    echo "To stop the containers:"
    echo "  docker-compose down"
}

# Run main function
main "$@"
