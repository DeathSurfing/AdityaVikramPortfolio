'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Code, Rocket, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotHomeProps {
  onSwitchToOriginal?: () => void;
}

export function ChatbotHome({ _onSwitchToOriginal }: ChatbotHomeProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `# 👋 Welcome!

Hey there! I'm your **AI assistant** powered by Ollama. I know all about **Aditya Vikram Mahendru's** projects, skills, and experience.

## Quick Start Questions:

- *"Tell me about Aditya's experience"*
- *"What technologies does he work with?"*
- *"Show me his projects"*
- *"What's his background?"*

> Feel free to ask me anything! Let's chat! 🚀`,
          timestamp: new Date(),
        }
      ]);
      setShowWelcome(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const quickQuestions = [
    { text: "Tell me about Aditya's experience", icon: <Code className="w-4 h-4" /> },
    { text: "What are his key skills?", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Show me his projects", icon: <Rocket className="w-4 h-4" /> },
    { text: "How can I contact him?", icon: <Heart className="w-4 h-4" /> },
  ];

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: Date.now().toString() + '-typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(errorData?.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Remove typing indicator and add real response
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message || 'I received your message but couldn&apos;t generate a proper response.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🤖 I'm having trouble connecting to my AI brain right now. This could be because:\n\n• The Ollama service might be temporarily unavailable\n• There's a network connection issue\n• The localhost:11434 endpoint might be down\n\nError details: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again in a moment, or feel free to contact Aditya directly through the links in the footer! 🚀`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-black dark:via-black dark:to-primary/10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src="/avatar-placeholder.png" alt="AI Assistant" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="font-semibold">AI Portfolio Assistant</h1>
                <p className="text-sm text-muted-foreground">Powered by Ollama</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20 dark:bg-accent/20 dark:text-accent-foreground dark:border-accent/30 mr-16 md:mr-0">
                <div className="w-2 h-2 bg-accent rounded-full mr-1 animate-pulse" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Animation */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                  <Bot className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Aditya&apos;s AI Assistant!</h2>
                <p className="text-muted-foreground">Initializing conversation...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="space-y-4 min-h-[50vh]">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 border border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <Card className={cn(
                    'max-w-[80%] sm:max-w-[70%]',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border-border/50'
                  )}>
                    <CardContent className="p-3">
                      {message.isTyping ? (
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
                        </div>
                      ) : (
                        <div className={cn(
                          "prose prose-sm max-w-none",
                          message.role === 'user' 
                            ? "prose-invert" 
                            : "dark:prose-invert"
                        )}>
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Custom styling for markdown elements
                              h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-0">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>,
                              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                              ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              code: ({ children }) => (
                                <code className={cn(
                                  "px-1 py-0.5 rounded text-xs font-mono",
                                  message.role === 'user'
                                    ? "bg-primary-foreground/20 text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                )}>
                                  {children}
                                </code>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className={cn(
                                  "border-l-4 pl-4 my-2 italic",
                                  message.role === 'user'
                                    ? "border-primary-foreground/30 text-primary-foreground/80"
                                    : "border-primary/30 text-muted-foreground"
                                )}>
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 border border-primary/20">
                      <AvatarFallback className="bg-muted">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Quick questions to get started:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={question.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    onClick={() => handleQuickQuestion(question.text)}
                    disabled={isLoading}
                    className="flex items-center gap-2 p-3 text-left bg-card hover:bg-accent border border-border/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question.icon}
                    <span className="text-sm">{question.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky bottom-4 mt-6"
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about Aditya..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Powered by Ollama • AI responses may not be 100% accurate
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
