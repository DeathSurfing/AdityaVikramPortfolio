# 🚀 Aditya Vikram Portfolio

> A modern, interactive portfolio website featuring AI-powered chat assistance, smooth animations, and a clean design system.

[![Deploy Status](https://img.shields.io/badge/deploy-automated-success?style=flat-square)](#deployment)
[![Tech Stack](https://img.shields.io/badge/stack-Next.js%2C%20Docker%2C%20Ollama-blue?style=flat-square)](#tech-stack)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#)

## ✨ Features

- 🤖 **AI Chat Assistant** - Powered by Ollama with custom knowledge base
- 🎨 **Modern Design** - Clean, responsive UI with dark/light themes
- ⚡ **Smooth Animations** - Framer Motion with optimized performance
- 📱 **Mobile-First** - Responsive design for all devices
- 🐳 **Docker Ready** - Containerized deployment with health checks
- 🔄 **CI/CD Pipeline** - Automated testing and deployment

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Ollama Proxy   │    │     Ollama      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (Local AI)    │
│   Port 3000     │    │   Port 5950     │    │   Port 11434    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         └──────────────┬────────┘
                        ▼
             ┌─────────────────┐
             │ Cloudflare      │
             │ Tunnel          │
             │ (Public)        │
             └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Ollama with `gpt-oss:20b` model

### 1. Clone & Setup
```bash
git clone https://github.com/DeathSurfing/AdityaVikramPortfolio.git
cd AdityaVikramPortfolio
```

### 2. Start Ollama
```bash
ollama serve
ollama pull gpt-oss:20b
```

### 3. Deploy with Docker
```bash
# Quick deployment
./scripts/manage-portfolio.sh rebuild

# Or manual deployment
cd ollama-proxy
./deploy.sh
```

### 4. Access
- **Frontend**: http://localhost:3000
- **AI API**: http://localhost:5950
- **Health Check**: http://localhost:5950/health

## 📚 Documentation

### Getting Started
- [Quick Start Guide](docs/QUICK_START.md) - Get up and running in 5 minutes
- [Frontend Setup](docs/frontend/) - Next.js development guide
- [Docker Guide](docs/deployment/DOCKER.md) - Containerized deployment

### AI & Content
- [AI Assistant Setup](docs/ai/OLLAMA_SETUP.md) - Ollama configuration
- [Blog Management](docs/content/BLOG_GUIDE.md) - Adding blog posts
- [Content Updates](docs/content/) - Managing portfolio content

### Deployment
- [GitHub Actions](docs/deployment/GITHUB_ACTIONS.md) - CI/CD pipeline
- [Docker Deployment](docs/deployment/DOCKER.md) - Container setup
- [Production Setup](docs/deployment/PRODUCTION.md) - Server configuration

### Operations
- [Troubleshooting](docs/operations/TROUBLESHOOTING.md) - Common issues
- [Monitoring](docs/operations/MONITORING.md) - Health checks
- [Testing](docs/operations/TESTING.md) - Test results

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Shadcn/ui** - Component library

### Backend
- **FastAPI** - High-performance Python API
- **Ollama** - Local AI model hosting
- **Docker** - Containerization
- **Nginx** - Reverse proxy (optional)

### DevOps
- **GitHub Actions** - CI/CD automation
- **Docker Compose** - Multi-container orchestration
- **Cloudflare Tunnel** - Secure public access

## 🎯 Project Structure

```
AdityaVikramPortfolio/
├── docs/                    # 📚 Organized documentation
│   ├── ai/                  # AI assistant guides
│   ├── deployment/          # Deployment guides
│   ├── frontend/           # Frontend development
│   ├── content/            # Content management
│   └── operations/         # Troubleshooting & monitoring
├── frontend/               # 🎨 Next.js application
├── ollama-proxy/          # 🤖 FastAPI AI proxy
├── scripts/               # 🔧 Management scripts
└── .github/workflows/     # 🚀 CI/CD pipelines
```

## 🔄 Development Workflow

### Local Development
```bash
# Frontend development
cd frontend
npm run dev

# Docker development
./scripts/docker-dev.sh start --logs

# Health monitoring
./scripts/manage-portfolio.sh health
```

### Testing
```bash
# Run all tests
./scripts/manage-portfolio.sh test

# Frontend linting
cd frontend && npm run lint

# AI proxy testing
cd ollama-proxy && python3 test_ollama_integration.py
```

## 📈 Key Features

### AI-Powered Chat Assistant
- Custom knowledge base about Aditya's experience
- Streaming responses for real-time interaction
- CORS-enabled for browser compatibility
- Fallback strategies for reliability

### Modern Frontend
- Responsive design with mobile-first approach
- Dark/light theme with smooth transitions
- Advanced animations with optimized performance
- Interactive project showcases

### Production-Ready Deployment
- Docker containerization with health checks
- Automated CI/CD with GitHub Actions
- Zero-downtime deployments
- Comprehensive monitoring and logging

## 🤝 Contributing

1. **Fork & Clone**: Get your own copy
2. **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Develop**: Make your changes with tests
4. **Test**: Run the test suite (`./scripts/manage-portfolio.sh test`)
5. **Commit**: Use conventional commits
6. **Push**: Push to your branch
7. **PR**: Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Portfolio**: [portfolio.adityavikram.dev](https://portfolio.adityavikram.dev)
- **GitHub**: [@DeathSurfing](https://github.com/DeathSurfing)
- **LinkedIn**: [aditya-vikram-mahendru](https://www.linkedin.com/in/aditya-vikram-mahendru/)
- **Email**: jobs.aditya.vikram.mahendru@gmail.com

---

<div align="center">
  <strong>🚀 Built with passion by Aditya Vikram Mahendru</strong>
</div>
