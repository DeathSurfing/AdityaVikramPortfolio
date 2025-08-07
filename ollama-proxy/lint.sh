#!/bin/bash

# Simple Lint Script for Portfolio + Ollama Proxy
# Frontend linting + Docker validation only

set -e

echo "🎨 Portfolio Lint Script"
echo "======================"

# Check if we're in the right directory structure
if [ ! -d "../frontend" ] && [ ! -d "./frontend" ]; then
    echo "❌ Frontend directory not found. Run from ollama-proxy/ or project root."
    exit 1
fi

# Determine frontend path
if [ -d "../frontend" ]; then
    FRONTEND_PATH="../frontend"
else
    FRONTEND_PATH="./frontend"
fi

echo "📍 Frontend path: $FRONTEND_PATH"
echo ""

# Frontend Linting
echo "🎨 Linting Frontend..."
cd "$FRONTEND_PATH"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm ci
else
    echo "✅ Dependencies already installed"
fi

# Run ESLint
echo "🔍 Running ESLint..."
npm run lint

# Run TypeScript check
echo "📝 Running TypeScript check..."
npx tsc --noEmit

echo "✅ Frontend linting complete!"
echo ""

# Docker Validation
cd - > /dev/null  # Go back to original directory

echo "🐳 Validating Docker configurations..."

# Validate ollama-proxy docker-compose
if [ -f "docker-compose.yml" ]; then
    docker compose config > /dev/null && echo "✅ Ollama proxy Docker config valid"
else
    echo "⚠️ No docker-compose.yml found in current directory"
fi

# Validate main project docker-compose if exists
if [ -f "../docker-compose.yml" ]; then
    docker compose -f ../docker-compose.yml config > /dev/null && echo "✅ Main project Docker config valid"
elif [ -f "./docker-compose.yml" ] && [ "$(basename $(pwd))" != "ollama-proxy" ]; then
    docker compose config > /dev/null && echo "✅ Main project Docker config valid"
fi

echo ""
echo "✅ All checks completed!"
echo "🚀 Frontend linted, Docker configs validated"
echo "💡 Ready for deployment"
