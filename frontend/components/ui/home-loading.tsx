'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Loading skeleton for the home page
export function HomePageSkeleton() {
  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden dark:bg-black">
      {/* Background gradient */}
      <div className="from-primary/20 dark:from-primary/30 absolute inset-0 bg-gradient-to-br via-transparent to-accent/20 blur-3xl dark:to-accent/30" />

      {/* Floating shapes skeleton */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute rounded-full bg-gradient-to-r from-muted to-muted-foreground/20 dark:from-muted dark:to-muted-foreground/20 animate-pulse',
              i === 0 && 'top-[15%] left-[-10%] w-[140px] h-[140px] md:top-[20%] md:left-[-5%]',
              i === 1 && 'top-[70%] right-[-5%] w-[120px] h-[120px] md:top-[75%] md:right-[0%]',
              i === 2 && 'bottom-[5%] left-[5%] w-[80px] h-[80px] md:bottom-[10%] md:left-[10%]',
              i === 3 && 'top-[10%] right-[15%] w-[60px] h-[60px] md:top-[15%] md:right-[20%]',
              i === 4 && 'top-[5%] left-[20%] w-[40px] h-[40px] md:top-[10%] md:left-[25%]'
            )}
          />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge skeleton */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <div className="h-8 w-48 bg-gradient-to-r from-muted to-muted-foreground/20 dark:from-muted dark:to-muted-foreground/20 rounded-full animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="mb-6 md:mb-8 space-y-4">
            <div className="h-12 sm:h-16 md:h-20 bg-gradient-to-r from-muted to-muted-foreground/20 dark:from-muted dark:to-muted-foreground/20 rounded-lg animate-pulse" />
            <div className="h-12 sm:h-16 md:h-20 bg-gradient-to-r from-accent/30 to-accent/50 dark:from-accent/30 dark:to-accent/50 rounded-lg animate-pulse" />
          </div>

          {/* Subtitle skeleton */}
          <div className="mb-10 flex justify-center">
            <div className="h-6 w-96 max-w-full bg-gradient-to-r from-muted to-muted-foreground/20 dark:from-muted dark:to-muted-foreground/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent dark:from-black dark:to-black/80" />
    </div>
  );
}

// Shimmer loading effect
export function ShimmerLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
      <div className="text-center">
        <motion.div
          className="inline-block"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full" />
        </motion.div>
        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  );
}

// Progressive loading component
export function ProgressiveLoader({ progress = 0 }: { progress?: number }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <motion.div
            className="inline-block mb-4"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Crafting Your Experience
          </h3>
          <p className="text-muted-foreground">
            Preparing something amazing for you...
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Shimmer effect on progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: [-80, 320],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            {progress}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
