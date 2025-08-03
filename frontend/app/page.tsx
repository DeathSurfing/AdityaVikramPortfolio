'use client';

import { easeInOut, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Pacifico, Azeret_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import SlideButton from '@/components/ui/slide-button';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-azeret-mono',
});

function AnimatedText() {
  return (
    <div className="mx-auto mb-10 max-w-xl px-4 h-16 flex items-center justify-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeInOut, delay: 1.5 }}
        className={cn(
          "text-muted-foreground text-lg leading-relaxed sm:text-xl md:text-2xl text-center font-medium tracking-wide",
          azeretMono.className
        )}
      >
        <span
          id="zoom-target-t"
          className="relative inline-block font-bold text-primary"
        >
          Slide To Continue
        </span>
      </motion.p>
    </div>
  );
}

function StarShape({
  size = 100,
  gradient = 'from-white/[0.08]'
}: {
  size?: number;
  gradient?: string;
}) {
  // Create star path - 5-pointed star
  const starPath = `
    M${size / 2},${size * 0.1} 
    L${size * 0.61},${size * 0.35} 
    L${size * 0.95},${size * 0.35} 
    L${size * 0.68},${size * 0.57} 
    L${size * 0.79},${size * 0.91} 
    L${size / 2},${size * 0.7} 
    L${size * 0.21},${size * 0.91} 
    L${size * 0.32},${size * 0.57} 
    L${size * 0.05},${size * 0.35} 
    L${size * 0.39},${size * 0.35} 
    Z
  `;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id={`starGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <filter id={`starGlow-${size}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Star shape */}
        <path
          d={starPath}
          fill={`url(#starGradient-${size})`}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          filter={`url(#starGlow-${size})`}
          className="drop-shadow-lg"
        />

        {/* Inner sparkle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.08}
          fill="rgba(255,255,255,0.9)"
          className="animate-pulse"
        />
      </svg>

      {/* Additional glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-50',
          'bg-gradient-to-r',
          gradient
        )}
        style={{
          transform: 'scale(1.2)',
        }}
      />
    </div>
  );
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  // Use the smaller dimension to determine star size
  const starSize = Math.min(width, height);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <StarShape size={starSize} gradient={gradient} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// This is now a proper Next.js page component (no props)
export default function HomePage() {
  // Default values are now defined within the component
  const badge = 'Aditya Vikram Mahendru';
  const title1 = 'Code Smart';
  const title2 = 'Deploy Faster';

  const handleRedirect = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/whoami';
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: easeInOut,
      },
    }),
  };

  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden dark:bg-black">
      <div className="from-primary/20 dark:from-primary/30 absolute inset-0 bg-gradient-to-br via-transparent to-rose-500/20 blur-3xl dark:to-rose-500/30" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={140}
          height={140}
          rotate={12}
          gradient="from-indigo-500/70"
          className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        />

        <ElegantShape
          delay={0.5}
          width={120}
          height={120}
          rotate={-15}
          gradient="from-rose-400"
          className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
        />

        <ElegantShape
          delay={0.4}
          width={80}
          height={80}
          rotate={-8}
          gradient="from-violet-400"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={60}
          height={60}
          rotate={20}
          gradient="from-amber-500/70 dark:from-amber-400/90"
          className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
        />

        <ElegantShape
          delay={0.7}
          width={40}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/70 dark:from-cyan-400/90"
          className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="border-primary/30 bg-card/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm backdrop-blur-sm md:mb-12"
          >
            <span className="text-foreground text-sm font-medium tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="mx-4 mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="from-foreground to-foreground/80 bg-gradient-to-b bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  'from-primary via-primary/90 bg-gradient-to-r to-rose-500 bg-clip-text p-4 text-transparent',
                  pacifico.className,
                  'font-bold',
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatedText />
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <SlideButton
              onSlideComplete={handleRedirect}
              className="mx-auto w-full max-w-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 border-emerald-400/50 relative overflow-hidden"
              size="lg"
              variant="default"
            />
          </motion.div>
        </div>
      </div>

      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
    </div>
  );
}
