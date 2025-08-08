"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: "vertical" | "horizontal";
    gestureDirection?: "vertical" | "horizontal" | "both";
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

export default function SmoothScroll({ 
  children, 
  className,
  options = {}
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const defaultOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical" as const,
      gestureDirection: "vertical" as const,
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options
    };

    const lenis = new Lenis(defaultOptions);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for external control
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [options]);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Hook to access the Lenis instance
export function useLenis() {
  return useRef<Lenis>((window as any).lenis).current;
}

// Utility functions for scroll control
export const scrollTo = (target: string | number | HTMLElement, options?: any) => {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(target, options);
  }
};

export const scrollToNext = () => {
  const lenis = (window as any).lenis;
  if (lenis) {
    const currentScroll = lenis.scroll;
    const windowHeight = window.innerHeight;
    lenis.scrollTo(currentScroll + windowHeight, { duration: 1.2 });
  }
};

export const scrollToPrev = () => {
  const lenis = (window as any).lenis;
  if (lenis) {
    const currentScroll = lenis.scroll;
    const windowHeight = window.innerHeight;
    lenis.scrollTo(Math.max(0, currentScroll - windowHeight), { duration: 1.2 });
  }
};
