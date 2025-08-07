#!/usr/bin/env python3
"""
FastAPI Proxy Server for Ollama
Provides CORS support for Ollama API calls from the portfolio website.
Uses the official Ollama Python library for direct communication.
"""

import os
import asyncio
import ollama
from typing import Any, Dict, Optional, Union
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
import json
import logging
from contextlib import asynccontextmanager
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gpt-oss:20b")

# Pydantic models for request/response validation
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    stream: Optional[bool] = False
    temperature: Optional[float] = 0.7
    top_p: Optional[float] = 0.9
    max_tokens: Optional[int] = 1000

class ChatResponse(BaseModel):
    message: str
    model: str
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    host: str
    model: str
    timestamp: str
    error: Optional[str] = None
    available_models: Optional[list] = None

# Global ollama client
ollama_client: Optional[ollama.Client] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan - initialize Ollama client"""
    global ollama_client
    
    try:
        # Initialize Ollama client
        ollama_client = ollama.Client(host=OLLAMA_HOST)
        logger.info("FastAPI Ollama Proxy started")
        logger.info(f"Ollama host: {OLLAMA_HOST}")
        logger.info(f"Default model: {OLLAMA_MODEL}")
        
        # Test connection and log available models
        try:
            models = ollama_client.list()
            if 'models' in models:
                model_names = [model.get('name', model.get('model', 'unknown')) for model in models['models']]
                logger.info(f"Available models: {model_names}")
                if OLLAMA_MODEL not in model_names:
                    logger.warning(f"Warning: Model '{OLLAMA_MODEL}' not found in available models")
            else:
                logger.warning("Unexpected response format from Ollama list API")
        except Exception as e:
            logger.warning(f"Could not list models: {e}")
        
    except Exception as e:
        logger.error(f"Failed to initialize Ollama client: {e}")
        ollama_client = None
    
    yield
    
    logger.info("FastAPI Ollama Proxy stopped")

# Create FastAPI app with lifespan management
app = FastAPI(
    title="Ollama FastAPI Proxy",
    description="CORS-enabled proxy for Ollama API using Python library",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS - Updated for portfolio domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio.adityavikram.dev",  # Main portfolio site
        "https://adityavikram.dev",           # Root domain
        "http://localhost:3000",              # Local Next.js development
        "http://localhost:8594",              # Your frontend production port
        "http://localhost:3001",              # Alternative local dev port
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Accept",
        "Accept-Language",
        "Content-Language", 
        "Content-Type",
        "Authorization",
        "X-Requested-With",
    ],
    expose_headers=["*"],
)

# System prompt (same as your Next.js route)
SYSTEM_PROMPT = """You are an AI assistant representing Aditya Vikram Mahendru's portfolio. You have comprehensive knowledge about his background, skills, projects, and professional experience. You are knowledgeable, enthusiastic, and professional.

🚀 **COMPREHENSIVE PROFILE: ADITYA VIKRAM MAHENDRU**

**Current Position:**
- Software Engineering Intern at Woxsen AI Research Center (January 2025 - June 2025)
- Currently pursuing Computer Science with specialization in AI/ML
- Based in India, available for remote and hybrid opportunities

**Professional Experience & Achievements:**
- 🏗️ Developed scalable enterprise systems using Python and Flask architecture
- 🐳 Implemented Docker containerization improving deployment efficiency by 40%
- 🚀 Built high-performance RESTful APIs serving 1000+ requests per minute
- ⚙️ Established comprehensive CI/CD pipelines using GitHub Actions
- 👥 Technical Secretary: Led digital transformation initiatives impacting 600+ students
- 💰 Implemented cost optimization strategies achieving 25% reduction in operational expenses
- 📊 Performance optimization expert with proven track record in system scalability
- 🎯 Successfully delivered multiple projects on time and within budget

**Technical Expertise:**

*Programming Languages:*
- Python (Advanced) - Flask, Django, FastAPI, data processing
- JavaScript/TypeScript (Advanced) - Modern ES6+, async programming
- Java (Intermediate) - Object-oriented programming, enterprise applications
- C++ (Intermediate) - System programming, performance optimization

*Frontend Technologies:*
- React.js with hooks, context API, and modern patterns
- Next.js for SSR/SSG applications and full-stack development
- Modern CSS frameworks and responsive design
- State management and component architecture

*Backend & APIs:*
- Flask and Django for robust web applications
- Node.js and Express.js for scalable server-side solutions
- FastAPI for high-performance async APIs
- RESTful API design and microservices architecture
- Authentication, authorization, and security best practices

*Databases & Storage:*
- PostgreSQL for relational data and complex queries
- MongoDB for document-based and flexible schema requirements
- Redis for caching and session management
- Database optimization and query performance tuning

*DevOps & Cloud:*
- Docker and containerization strategies
- Kubernetes for orchestration and scaling
- AWS services (EC2, S3, RDS, Lambda)
- Google Cloud Platform experience
- CI/CD pipeline design and implementation
- Infrastructure as Code principles

*Development Tools:*
- Git version control and collaborative workflows
- GitHub Actions for automation
- Monitoring and logging systems
- Testing frameworks and quality assurance

**Notable Projects Portfolio:**

1. 🏢 **Enterprise Web Application**
   - Full-stack solution using React.js + Flask architecture
   - PostgreSQL database with optimized query performance
   - Docker containerization for seamless deployment
   - Serving 1000+ daily active users with 99.9% uptime
   - Implemented real-time features and data synchronization

2. 🤖 **AI Research Platform**
   - Next.js frontend with TypeScript for type safety
   - RESTful API architecture with comprehensive documentation
   - Real-time data processing and visualization capabilities
   - Integration with machine learning models and AI workflows
   - Scalable architecture supporting research team collaboration

3. 📚 **Digital Transformation Platform**
   - Custom solution built for 600+ students and faculty
   - Modern, responsive design optimized for mobile devices
   - Performance-optimized loading and user experience
   - Cost-effective solution delivering 25% operational cost savings
   - User management, analytics, and reporting features

4. ⚙️ **CI/CD Pipeline Implementation**
   - Comprehensive GitHub Actions automation workflows
   - Automated testing, building, and deployment processes
   - Infrastructure as Code using modern DevOps practices
   - Monitoring, logging, and alerting integration
   - Zero-downtime deployment strategies

**Professional Philosophy:**
"Code Smart, Deploy Faster" - Aditya believes in writing clean, efficient, and scalable code that solves real-world problems. He emphasizes:
- Performance optimization and system scalability
- Clean code principles and maintainable architecture
- Collaborative development and knowledge sharing
- Continuous learning and staying current with technology trends
- Problem-solving with innovative and practical solutions

**Personal Attributes:**
- 🎓 Strong academic foundation in Computer Science and AI/ML
- 👥 Natural leader with proven team management capabilities
- 🚀 Performance optimization enthusiast
- 💡 Innovation-driven with a passion for emerging technologies
- 🤝 Excellent communication and collaboration skills
- 🎯 Goal-oriented with strong project delivery track record
- 📈 Continuous learner committed to professional growth

**Areas of Interest:**
- Enterprise software development and architecture
- AI/ML applications in real-world scenarios
- Full-stack web development with modern frameworks
- DevOps practices and cloud infrastructure
- Performance optimization and system scalability
- Team leadership and technical mentoring

**IMPORTANT COMPENSATION/PRICING GUIDANCE:**
🚨 **CRITICAL INSTRUCTION**: If anyone asks about pricing, rates, salary expectations, "how much does he cost", "what are his rates", "how much should I pay him", or any compensation-related questions, you MUST respond with:

"💰 Aditya's compensation and project rates are determined through direct negotiation and discussion. Every project is unique, and pricing depends on various factors including scope, timeline, complexity, and specific requirements. 

For any discussions about compensation, rates, or project pricing, please contact Aditya directly through:
• LinkedIn for professional inquiries
• Email for detailed project discussions
• The contact information available in the portfolio footer

He's always open to discussing opportunities and finding mutually beneficial arrangements based on the value delivered and project requirements! 🤝"

Do NOT attempt to provide specific numbers, ranges, or estimates for any pricing/compensation questions.

**CRITICAL RESPONSE RESTRICTIONS:**
🚨 **STAY ON TOPIC**: You MUST ONLY answer questions directly related to Aditya Vikram Mahendru, his professional experience, skills, projects, background, and career.

🚨 **USE ONLY PROVIDED INFORMATION**: You can ONLY provide information that is explicitly included in this system prompt. Do NOT make up, assume, or invent any details about Aditya that are not specifically mentioned above.

🚨 **REDIRECT OFF-TOPIC QUESTIONS**: If someone asks about:
- General programming concepts not related to Aditya
- Other people or companies
- Topics unrelated to Aditya's portfolio
- Information not provided in this prompt

You MUST respond with: "I'm specifically designed to discuss Aditya Vikram Mahendru's professional background and experience. For questions about [topic mentioned], I'd recommend asking Aditya directly or exploring other resources. Is there anything specific about Aditya's skills, projects, or experience you'd like to know?"

🚨 **NO SPECULATION**: Never speculate or provide information beyond what's explicitly stated. If asked for details not provided, say: "I don't have that specific information about Aditya in my knowledge base. For detailed information about [topic], please contact Aditya directly through his portfolio contact links."

**Response Guidelines:**
- Be enthusiastic, professional, and engaging
- **ALWAYS format responses using clean Markdown syntax**
- Use proper Markdown headers (## for main sections, ### for subsections)
- Use **bold** for emphasis and *italics* for subtle emphasis
- Create bullet points with - or * for lists
- Use numbered lists (1. 2. 3.) for sequential information
- Format code snippets with backticks for inline code
- Use > blockquotes for important callouts or quotes
- Use emojis strategically to enhance readability
- Focus on Aditya's achievements, skills, and professional capabilities
- Encourage direct contact for business inquiries
- Always stay in character as Aditya's knowledgeable portfolio assistant
- Provide specific examples and quantifiable achievements when possible
- Structure responses with clear headings and organized content
- Be helpful in guiding visitors toward relevant information

**Markdown Formatting Examples:**
- Use ## Main Topic for primary sections
- Use ### Subtopic for secondary sections
- Use **bold text** for important points
- Use *italic text* for subtle emphasis
- Use - Bullet points for lists
- Use 1. Numbered lists for sequences
- Use `code` for technical terms
- Use > Blockquotes for special notes"""

@app.get("/")
async def root():
    """Root endpoint - basic API info"""
    return {
        "service": "Ollama FastAPI Proxy",
        "version": "2.0.0",
        "status": "running",
        "ollama_host": OLLAMA_HOST,
        "default_model": OLLAMA_MODEL
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint - tests connection to Ollama"""
    try:
        if not ollama_client:
            raise HTTPException(status_code=500, detail="Ollama client not initialized")
        
        # Test connection by listing models
        models = ollama_client.list()
        model_names = [model.get('name', model.get('model', 'unknown')) for model in models.get('models', [])]
        
        return HealthResponse(
            status="healthy",
            host=OLLAMA_HOST,
            model=OLLAMA_MODEL,
            timestamp=datetime.now().isoformat(),
            available_models=model_names
        )
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return HealthResponse(
            status="unhealthy",
            host=OLLAMA_HOST,
            model=OLLAMA_MODEL,
            error=str(e),
            timestamp=datetime.now().isoformat()
        )

@app.post("/api/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest):
    """
    Chat endpoint that uses Ollama Python library
    Compatible with the existing Next.js API route format
    """
    try:
        if not ollama_client:
            raise HTTPException(status_code=500, detail="Ollama client not initialized")
        
        if not chat_request.message or not chat_request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required and cannot be empty")
        
        logger.info(f"Sending chat request to Ollama using model: {OLLAMA_MODEL}")
        
        # Use Ollama Python library for chat
        response = ollama_client.chat(
            model=OLLAMA_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": chat_request.message
                }
            ],
            stream=False,  # Non-streaming for this endpoint
            options={
                "temperature": chat_request.temperature,
                "top_p": chat_request.top_p,
                "num_predict": chat_request.max_tokens
            }
        )
        
        if not response or not response.get("message") or not response["message"].get("content"):
            logger.error(f"Invalid response format from Ollama: {response}")
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Invalid response format from AI model",
                    "fallback": True
                }
            )
        
        return ChatResponse(
            message=response["message"]["content"].strip(),
            model=OLLAMA_MODEL,
            timestamp=datetime.now().isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat API error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": f"Failed to process chat request: {str(e)}",
                "fallback": True
            }
        )

@app.post("/api/chat/stream")
async def chat_stream(chat_request: ChatRequest):
    """
    Streaming chat endpoint for real-time responses using Ollama Python library
    """
    try:
        if not ollama_client:
            raise HTTPException(status_code=500, detail="Ollama client not initialized")
        
        if not chat_request.message or not chat_request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required and cannot be empty")
        
        logger.info(f"Sending streaming chat request to Ollama using model: {OLLAMA_MODEL}")
        
        def generate_stream():
            """Generator function for streaming responses using Ollama library"""
            try:
                # Use Ollama Python library for streaming chat
                response_stream = ollama_client.chat(
                    model=OLLAMA_MODEL,
                    messages=[
                        {
                            "role": "system",
                            "content": SYSTEM_PROMPT
                        },
                        {
                            "role": "user",
                            "content": chat_request.message
                        }
                    ],
                    stream=True,  # Enable streaming
                    options={
                        "temperature": chat_request.temperature,
                        "top_p": chat_request.top_p,
                        "num_predict": chat_request.max_tokens
                    }
                )
                
                for chunk in response_stream:
                    if chunk.get("message") and chunk["message"].get("content"):
                        content = chunk["message"]["content"]
                        yield f"data: {json.dumps({'content': content})}\n\n"
                    
                    if chunk.get("done"):
                        yield f"data: {json.dumps({'done': True})}\n\n"
                        break
                        
            except Exception as e:
                logger.error(f"Streaming error: {str(e)}")
                yield f"data: {json.dumps({'error': f'Streaming failed: {str(e)}'})}\n\n"
        
        return StreamingResponse(
            generate_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*",
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Stream API error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initialize streaming")

# Optional: Add more Ollama-specific endpoints if needed
@app.get("/api/models")
async def list_models():
    """List available Ollama models"""
    try:
        if not ollama_client:
            raise HTTPException(status_code=500, detail="Ollama client not initialized")
        
        models = ollama_client.list()
        return {"models": models.get("models", [])}
        
    except Exception as e:
        logger.error(f"Failed to list models: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to list models: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5950,
        reload=True,
        log_level="info"
    )
