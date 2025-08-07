#!/usr/bin/env python3
"""
Quick test script to verify Ollama Python library integration
"""

import requests
import json
import time

def test_health():
    """Test the health endpoint"""
    print("🏥 Testing health endpoint...")
    try:
        response = requests.get("http://localhost:5950/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['status']}")
            print(f"   Available models: {data.get('available_models', [])}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_chat():
    """Test the chat endpoint"""
    print("\n💬 Testing chat endpoint...")
    try:
        payload = {
            "message": "Hello! Tell me briefly about Aditya's experience.",
            "temperature": 0.7,
            "max_tokens": 200
        }
        
        response = requests.post(
            "http://localhost:5950/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Chat endpoint working!")
            print(f"   Model used: {data['model']}")
            print(f"   Response length: {len(data['message'])} characters")
            print(f"   Sample response: {data['message'][:100]}...")
            return True
        else:
            print(f"❌ Chat failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Chat test failed: {e}")
        return False

def test_models():
    """Test the models endpoint"""
    print("\n📋 Testing models endpoint...")
    try:
        response = requests.get("http://localhost:5950/api/models", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("✅ Models endpoint working!")
            models = data.get('models', [])
            print(f"   Found {len(models)} models:")
            for model in models:
                print(f"     - {model.get('name', 'unknown')}")
            return True
        else:
            print(f"❌ Models endpoint failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Models test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Ollama FastAPI Integration")
    print("=" * 50)
    
    # Wait a moment for server to be ready
    print("⏳ Waiting for server to be ready...")
    time.sleep(2)
    
    tests_passed = 0
    total_tests = 3
    
    if test_health():
        tests_passed += 1
    
    if test_models():
        tests_passed += 1
        
    if test_chat():
        tests_passed += 1
    
    print(f"\n📊 Test Results: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! Your Ollama integration is working perfectly.")
    else:
        print("⚠️ Some tests failed. Check the output above for details.")
