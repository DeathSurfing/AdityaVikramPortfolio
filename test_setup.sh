#!/bin/bash

# 🧪 Ollama Proxy Setup Test Script

echo "🧪 Testing Ollama + FastAPI Proxy Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test functions
test_ollama() {
    echo -e "\n${YELLOW}1. Testing Ollama connection...${NC}"
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Ollama is running and accessible${NC}"
        return 0
    else
        echo -e "${RED}❌ Ollama is not accessible at http://localhost:11434${NC}"
        echo "   Run: ollama serve"
        return 1
    fi
}

test_proxy_health() {
    echo -e "\n${YELLOW}2. Testing FastAPI proxy health...${NC}"
    if curl -s http://localhost:5950/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ FastAPI proxy is running${NC}"
        # Show health details
        curl -s http://localhost:5950/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:5950/health
        return 0
    else
        echo -e "${RED}❌ FastAPI proxy is not accessible at http://localhost:5950${NC}"
        echo "   Run: cd ollama-proxy && ./start.fish"
        return 1
    fi
}

test_proxy_chat() {
    echo -e "\n${YELLOW}3. Testing FastAPI proxy chat endpoint...${NC}"
    response=$(curl -s -X POST http://localhost:5950/api/chat \
        -H "Content-Type: application/json" \
        -d '{"message": "Hello! Just testing the connection."}' 2>/dev/null)
    
    if [ $? -eq 0 ] && echo "$response" | grep -q "message"; then
        echo -e "${GREEN}✅ Chat endpoint is working${NC}"
        echo "Sample response:"
        echo "$response" | python3 -c "import sys,json; data=json.load(sys.stdin); print(f'  Message length: {len(data.get(\"message\", \"\"))} characters')" 2>/dev/null || echo "  Got response (JSON parsing failed)"
        return 0
    else
        echo -e "${RED}❌ Chat endpoint failed${NC}"
        echo "Response: $response"
        return 1
    fi
}

test_frontend() {
    echo -e "\n${YELLOW}4. Testing frontend accessibility...${NC}"
    if curl -s http://localhost:8594 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend is accessible${NC}"
        return 0
    else
        echo -e "${RED}❌ Frontend is not accessible at http://localhost:8594${NC}"
        echo "   Make sure your Next.js dev server is running"
        return 1
    fi
}

test_tunnel() {
    echo -e "\n${YELLOW}5. Testing Cloudflare tunnel (if configured)...${NC}"
    if curl -s -I https://portfolio.adityavikram.dev > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Cloudflare tunnel is working for main site${NC}"
        
        # Test API route through tunnel
        echo "   Testing API route through tunnel..."
        api_response=$(curl -s -X POST https://portfolio.adityavikram.dev/api/chat \
            -H "Content-Type: application/json" \
            -d '{"message": "Testing tunnel"}' 2>/dev/null)
        
        if echo "$api_response" | grep -q "message"; then
            echo -e "${GREEN}   ✅ API route through tunnel is working${NC}"
        else
            echo -e "${YELLOW}   ⚠️  API route through tunnel not responding as expected${NC}"
            echo "   Response: $api_response"
        fi
        return 0
    else
        echo -e "${YELLOW}⚠️  Cloudflare tunnel not accessible or not configured${NC}"
        echo "   This is OK if you haven't set up the tunnel yet"
        return 0
    fi
}

# Run tests
echo "Starting comprehensive setup test..."
echo

failed_tests=0

test_ollama || ((failed_tests++))
test_proxy_health || ((failed_tests++))
test_proxy_chat || ((failed_tests++))
test_frontend || ((failed_tests++))
test_tunnel || ((failed_tests++))

# Summary
echo -e "\n========================================"
if [ $failed_tests -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your setup is working correctly.${NC}"
    echo
    echo "You can now:"
    echo "• Visit your portfolio: https://portfolio.adityavikram.dev"
    echo "• Click 'Try AI Assistant' to test the chatbot"
    echo "• Ask questions about Aditya's experience and projects"
else
    echo -e "${RED}❌ $failed_tests test(s) failed. Check the output above for details.${NC}"
    echo
    echo "Common fixes:"
    echo "• Start Ollama: ollama serve"
    echo "• Start proxy: cd ollama-proxy && ./start.fish"
    echo "• Start frontend: npm run dev (in frontend directory)"
    echo "• Start tunnel: cloudflared tunnel run your-tunnel-name"
fi

exit $failed_tests
