#!/bin/bash

# Test Python Environment Setup
# Mirrors the GitHub Actions workflow steps for local testing

set -e

echo "🐍 Testing Python Environment Setup for Self-Hosted Runner"
echo "=========================================================="

# Check for Python versions (prefer specific versions if available)
if command -v python3.13 &> /dev/null; then
  echo "✅ Found python3.13"
  PYTHON_CMD=python3.13
elif command -v python3.12 &> /dev/null; then
  echo "✅ Found python3.12"
  PYTHON_CMD=python3.12
elif command -v python3.11 &> /dev/null; then
  echo "✅ Found python3.11"
  PYTHON_CMD=python3.11
elif command -v python &> /dev/null; then
  python_version=$(python --version 2>&1 | cut -d" " -f2 | cut -d"." -f1,2)
  echo "✅ Found Python version: $python_version"
  PYTHON_CMD=python
elif command -v python3 &> /dev/null; then
  python_version=$(python3 --version 2>&1 | cut -d" " -f2 | cut -d"." -f1,2)
  echo "✅ Found Python version: $python_version"
  PYTHON_CMD=python3
else
  echo "❌ Python not found"
  exit 1
fi

# Verify Python version
echo "🔍 Python details:"
$PYTHON_CMD --version
$PYTHON_CMD -c "import sys; print(f'Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}')"
$PYTHON_CMD -c "import sys; print(f'Platform: {sys.platform}')"

echo ""
echo "🏭 Creating virtual environment..."
# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    $PYTHON_CMD -m venv .venv
    echo "✅ Virtual environment created"
else
    echo "ℹ️ Virtual environment already exists"
fi

# Activate virtual environment
echo "ℹ️ Activating virtual environment..."
source .venv/bin/activate
echo "VIRTUAL_ENV: $VIRTUAL_ENV"

echo ""
echo "📦 Installing dependencies in virtual environment..."
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install black flake8 mypy bandit safety

echo ""
echo "🎨 Testing Black (code formatter)..."
if command -v black &> /dev/null; then
  echo "✅ Black available"
  black --version
  black --check --diff main.py && echo "✅ Code formatting is correct" || echo "⚠️ Code formatting issues found"
else
  echo "❌ Black not available in PATH"
fi

echo ""
echo "🔍 Testing Flake8 (linter)..."
if command -v flake8 &> /dev/null; then
  echo "✅ Flake8 available"
  flake8 --version
  echo "Running flake8 checks..."
  flake8 main.py --count --select=E9,F63,F7,F82 --show-source --statistics
  flake8 main.py --count --exit-zero --max-complexity=10 --max-line-length=88 --statistics
else
  echo "❌ Flake8 not available in PATH"
fi

echo ""
echo "📝 Testing MyPy (type checker)..."
if command -v mypy &> /dev/null; then
  echo "✅ MyPy available"
  mypy --version
  mypy main.py --ignore-missing-imports || echo "⚠️ Type check completed with warnings"
else
  echo "❌ MyPy not available in PATH"
fi

echo ""
echo "🛡️ Testing Bandit (security scanner)..."
if command -v bandit &> /dev/null; then
  echo "✅ Bandit available"
  bandit --version
  bandit -r main.py -f json || echo "⚠️ Security scan completed"
else
  echo "❌ Bandit not available in PATH"
fi

echo ""
echo "🚨 Testing Safety (vulnerability checker)..."
if command -v safety &> /dev/null; then
  echo "✅ Safety available"
  safety --version
  safety check --json || echo "⚠️ Vulnerability check completed"
else
  echo "❌ Safety not available in PATH"
fi

echo ""
echo "🐳 Testing Docker configuration..."
if command -v docker &> /dev/null; then
  echo "✅ Docker available"
  docker --version
  docker compose config && echo "✅ Docker Compose config is valid"
else
  echo "❌ Docker not available"
fi

echo ""
echo "📊 Environment Test Summary"
echo "=========================="
echo "✅ Python environment setup complete"
echo "🐍 Python command: $PYTHON_CMD"
echo "🔧 Development tools installed"
echo "🚀 Ready for GitHub Actions workflow"
