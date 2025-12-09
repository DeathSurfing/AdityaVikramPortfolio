"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisSmoothScrollProps {
  children: React.ReactNode;
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

export default function LenisSmoothScroll({
  children,
  options = {},
}: LenisSmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    lenisRef.current = lenis;

    // ⭐ Make Lenis accessible globally
    window.lenis = lenis;

    // ⭐ Relay scroll events into a globally usable hook
    lenis.on("scroll", (e: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", { detail: e.scroll })
      );
    });


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options]);

  return <div>{children}</div>;
}
