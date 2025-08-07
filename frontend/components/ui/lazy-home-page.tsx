'use client';

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { HomePageSkeleton, ProgressiveLoader } from './home-loading';

// Lazy load the home page toggle component
const LazyHomePageToggle = lazy(() => 
  import('./home-page-toggle').then(module => ({
    default: module.HomePageToggle
  }))
);

// Progressive loading states
type LoadingState = 'initial' | 'loading' | 'loaded' | 'error';

export function LazyHomePageWrapper() {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    const simulateLoading = async () => {
      setLoadingState('loading');
      
      // Simulate progressive loading with realistic delays
      const steps = [
        { progress: 10, delay: 100, message: 'Initializing...' },
        { progress: 25, delay: 200, message: 'Loading components...' },
        { progress: 45, delay: 300, message: 'Preparing animations...' },
        { progress: 70, delay: 250, message: 'Loading assets...' },
        { progress: 90, delay: 150, message: 'Almost ready...' },
        { progress: 100, delay: 100, message: 'Complete!' },
      ];

      for (const step of steps) {
        if (!mounted) return;
        
        await new Promise(resolve => setTimeout(resolve, step.delay));
        setProgress(step.progress);
      }
      
      // Small delay before showing content
      await new Promise(resolve => setTimeout(resolve, 200));
      if (mounted) setLoadingState('loaded');
    };

    // Start loading after component mounts
    const timer = setTimeout(simulateLoading, 100);
    
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Show progressive loader during loading
  if (loadingState === 'loading' || loadingState === 'initial') {
    return <ProgressiveLoader progress={progress} />;
  }

  // Show error state if needed
  if (loadingState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground mb-4">
            Failed to load the page content
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render the lazy loaded component with suspense fallback
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <LazyHomePageToggle />
    </Suspense>
  );
}
