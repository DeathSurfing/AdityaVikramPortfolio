#!/usr/bin/env python3
"""
FastAPI Proxy Server for Ollama
Provides CORS support for Ollama API calls from the portfolio website.
"""

import os
import asyncio
import httpx
from typing import Any, Dict, Optional, Union
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
import json
import logging
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_ENDPOINT = os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434")
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
    endpoint: str
    model: str
    timestamp: str
    error: Optional[str] = None

# Global HTTP client
http_client: Optional[httpx.AsyncClient] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan - create and cleanup HTTP client"""
    global http_client
    http_client = httpx.AsyncClient(timeout=30.0)
    logger.info("FastAPI Ollama Proxy started")
    logger.info(f"Ollama endpoint: {OLLAMA_ENDPOINT}")
    logger.info(f"Default model: {OLLAMA_MODEL}")
    
    yield
    
    # Cleanup
    if http_client:
        await http_client.aclose()
    logger.info("FastAPI Ollama Proxy stopped")

# Create FastAPI app with lifespan management
app = FastAPI(
    title="Ollama FastAPI Proxy",
    description="CORS-enabled proxy for Ollama API",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio.adityavikram.dev",
        "https://adityavikram.dev",
        "http://localhost:3000",  # For local development
        "http://localhost:8594",  # Your frontend port
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
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
        "version": "1.0.0",
        "status": "running",
        "ollama_endpoint": OLLAMA_ENDPOINT,
        "default_model": OLLAMA_MODEL
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint - tests connection to Ollama"""
    try:
        if not http_client:
            raise HTTPException(status_code=500, detail="HTTP client not initialized")
            
        response = await http_client.get(f"{OLLAMA_ENDPOINT}/api/tags")
        
        is_healthy = response.status_code == 200
        
        return HealthResponse(
            status="healthy" if is_healthy else "unhealthy",
            endpoint=OLLAMA_ENDPOINT,
            model=OLLAMA_MODEL,
            timestamp=asyncio.get_event_loop().time().__str__()
        )
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return HealthResponse(
            status="unhealthy",
            endpoint=OLLAMA_ENDPOINT,
            model=OLLAMA_MODEL,
            error=str(e),
            timestamp=asyncio.get_event_loop().time().__str__()
        )

@app.post("/api/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest):
    """
    Chat endpoint that proxies requests to Ollama
    Compatible with the existing Next.js API route format
    """
    try:
        if not http_client:
            raise HTTPException(status_code=500, detail="HTTP client not initialized")
        
        if not chat_request.message or not chat_request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required and cannot be empty")
        
        # Prepare the request to Ollama
        ollama_payload = {
            "model": OLLAMA_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": chat_request.message
                }
            ],
            "stream": chat_request.stream,
            "options": {
                "temperature": chat_request.temperature,
                "top_p": chat_request.top_p,
                "num_predict": chat_request.max_tokens
            }
        }
        
        logger.info(f"Sending request to Ollama: {OLLAMA_ENDPOINT}/api/chat")
        
        response = await http_client.post(
            f"{OLLAMA_ENDPOINT}/api/chat",
            json=ollama_payload,
            headers={"Content-Type": "application/json"}
        )
        
        if not response.is_success:
            error_text = await response.aread() if hasattr(response, 'aread') else response.text
            logger.error(f"Ollama API error: {response.status_code} - {error_text}")
            
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Failed to get response from AI model",
                    "details": f"Status: {response.status_code}",
                    "fallback": True
                }
            )
        
        data = response.json()
        
        if not data.get("message") or not data["message"].get("content"):
            logger.error(f"Invalid response format from Ollama: {data}")
            raise HTTPException(
                status_code=500,
                detail={
                    "error": "Invalid response format from AI model",
                    "fallback": True
                }
            )
        
        return ChatResponse(
            message=data["message"]["content"].strip(),
            model=OLLAMA_MODEL,
            timestamp=asyncio.get_event_loop().time().__str__()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat API error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Internal server error",
                "message": "Failed to process chat request",
                "fallback": True
            }
        )

@app.post("/api/chat/stream")
async def chat_stream(chat_request: ChatRequest):
    """
    Streaming chat endpoint for real-time responses
    """
    try:
        if not http_client:
            raise HTTPException(status_code=500, detail="HTTP client not initialized")
        
        if not chat_request.message or not chat_request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required and cannot be empty")
        
        # Prepare the request to Ollama with streaming enabled
        ollama_payload = {
            "model": OLLAMA_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": chat_request.message
                }
            ],
            "stream": True,
            "options": {
                "temperature": chat_request.temperature,
                "top_p": chat_request.top_p,
                "num_predict": chat_request.max_tokens
            }
        }
        
        async def generate_stream():
            """Generator function for streaming responses"""
            try:
                async with http_client.stream(
                    "POST",
                    f"{OLLAMA_ENDPOINT}/api/chat",
                    json=ollama_payload,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    
                    if not response.is_success:
                        yield f"data: {json.dumps({'error': 'Failed to connect to AI model'})}\n\n"
                        return
                    
                    async for chunk in response.aiter_lines():
                        if chunk:
                            try:
                                data = json.loads(chunk)
                                if data.get("message") and data["message"].get("content"):
                                    yield f"data: {json.dumps({'content': data['message']['content']})}\n\n"
                                elif data.get("done"):
                                    yield f"data: {json.dumps({'done': True})}\n\n"
                            except json.JSONDecodeError:
                                continue
                                
            except Exception as e:
                logger.error(f"Streaming error: {str(e)}")
                yield f"data: {json.dumps({'error': 'Streaming failed'})}\n\n"
        
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

# Proxy any other Ollama API endpoints
@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def proxy_ollama(request: Request, path: str):
    """
    Generic proxy for other Ollama API endpoints
    """
    try:
        if not http_client:
            raise HTTPException(status_code=500, detail="HTTP client not initialized")
        
        # Get request body if it exists
        body = None
        if request.method in ["POST", "PUT"]:
            body = await request.body()
        
        # Proxy the request to Ollama
        response = await http_client.request(
            method=request.method,
            url=f"{OLLAMA_ENDPOINT}/api/{path}",
            params=dict(request.query_params),
            headers={k: v for k, v in request.headers.items() if k.lower() != "host"},
            content=body
        )
        
        return JSONResponse(
            content=response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text,
            status_code=response.status_code,
            headers=dict(response.headers)
        )
        
    except Exception as e:
        logger.error(f"Proxy error for /{path}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Proxy request failed: {str(e)}")

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
