'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatbotHome } from './chatbot-home';
import { HomeContent } from '@/app/home-content';

type ViewMode = 'original' | 'chatbot';

export function HomePageToggle() {
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [_isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('portfolio-visited', 'true');
      // Show chatbot mode for first-time visitors after a delay
      const timer = setTimeout(() => {
        setViewMode('chatbot');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const switchToOriginal = () => setViewMode('original');
  const switchToChatbot = () => setViewMode('chatbot');

  return (
    <div className="relative min-h-screen">
      {/* Mode Toggle FAB - Only show in chatbot mode */}
      <AnimatePresence>
        {viewMode === 'chatbot' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
            className="fixed top-4 right-4 z-50 flex flex-col gap-2"
          >
            {/* Toggle Button */}
            <Button
              onClick={switchToOriginal}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              title="View Website Portfolio"
            >
              <motion.div
                key={viewMode}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Website</span>
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'original' ? (
          <motion.div
            key="original"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HomeContent onSwitchToChatbot={switchToChatbot} />
          </motion.div>
        ) : (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ChatbotHome _onSwitchToOriginal={switchToOriginal} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
