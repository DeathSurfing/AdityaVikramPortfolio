'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';
import { Home } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const footerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border/50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Home Icon */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Home"
                  >
                    <Home className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Center - Links */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-6">
            <a
              href="/whoami"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Who Am I?
            </a>
            <a
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="/uploads/Resume.pdf"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
          </motion.div>

          {/* Right side - Theme Switcher */}
          <motion.div variants={itemVariants} className="flex items-center">
            <ThemeSwitcher
              value={theme as 'light' | 'dark' | 'system'}
              onChange={setTheme}
              defaultValue="system"
            />
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

