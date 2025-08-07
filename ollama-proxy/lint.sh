#!/bin/bash

# Local Linting and Formatting Script
# Run this before committing changes

set -e

echo "🐍 Setting up Python environment..."

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "🏭 Creating virtual environment..."
    python -m venv .venv || python3 -m venv .venv
    echo "✅ Virtual environment created"
else
    echo "ℹ️ Using existing virtual environment"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source .venv/bin/activate

# Install linting tools if not available
echo "📦 Ensuring linting tools are available..."
python -m pip install --upgrade pip > /dev/null
python -m pip install black flake8 mypy bandit safety > /dev/null

echo "🎨 Running Black (code formatter)..."
black --check --diff main.py || {
    echo "❌ Code formatting issues found. Run 'black main.py' to fix."
    exit 1
}

echo "🔍 Running flake8 (linter)..."
flake8 main.py --count --select=E9,F63,F7,F82 --show-source --statistics
flake8 main.py --count --exit-zero --max-complexity=10 --max-line-length=88 --statistics

echo "📝 Running mypy (type checker)..."
mypy main.py --ignore-missing-imports || echo "⚠️ Type check issues found (non-blocking)"

echo "🛡️ Running bandit (security scan)..."
bandit -r main.py -f json || echo "⚠️ Security issues found (non-blocking)"

echo "🚨 Checking for known vulnerabilities..."
safety check --json || echo "⚠️ Vulnerability check completed (non-blocking)"

echo "🐳 Validating Docker configuration..."
docker compose config > /dev/null && echo "✅ Docker Compose config is valid"

echo ""
echo "✅ All checks completed!"
echo "🚀 Ready to commit and deploy"
