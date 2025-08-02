'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';

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
        delay: 2, // Delay to let page content load first
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
          {/* Left side - Brand/Copyright */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Aditya Vikram Mahendru
            </p>
          </motion.div>

          {/* Center - Links (optional) */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-6">
            <a
              href="/whoami"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Who Am I?
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
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
