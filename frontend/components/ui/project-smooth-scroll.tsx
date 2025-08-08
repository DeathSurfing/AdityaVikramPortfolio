"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectSmoothScrollProps {
  children: React.ReactNode;
  cardCount: number;
}

export default function ProjectSmoothScroll({ 
  children, 
  cardCount 
}: ProjectSmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
    });

    lenisRef.current = lenis;

    // Track scroll position and update current card
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const scrollProgress = scroll / (document.documentElement.scrollHeight - window.innerHeight);
      const newCard = Math.min(Math.floor(scrollProgress * cardCount), cardCount - 1);
      setCurrentCard(Math.max(0, newCard));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case "ArrowDown":
        case " ": // Space key
          e.preventDefault();
          scrollToNextCard();
          break;
        case "ArrowUp":
          e.preventDefault();
          scrollToPrevCard();
          break;
        case "Home":
          e.preventDefault();
          scrollToCard(0);
          break;
        case "End":
          e.preventDefault();
          scrollToCard(cardCount - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      lenis.destroy();
    };
  }, [cardCount, isScrolling]);

  const scrollToCard = (cardIndex: number) => {
    if (!lenisRef.current || isScrolling) return;
    
    const clampedIndex = Math.max(0, Math.min(cardIndex, cardCount - 1));
    const progress = clampedIndex / Math.max(cardCount - 1, 1);
    const targetScroll = progress * (document.documentElement.scrollHeight - window.innerHeight);
    
    setIsScrolling(true);
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.5,
      onComplete: () => setIsScrolling(false)
    });
    setCurrentCard(clampedIndex);
  };

  const scrollToNextCard = () => {
    if (currentCard < cardCount - 1) {
      scrollToCard(currentCard + 1);
    }
  };

  const scrollToPrevCard = () => {
    if (currentCard > 0) {
      scrollToCard(currentCard - 1);
    }
  };

  const scrollToTop = () => {
    scrollToCard(0);
  };

  return (
    <div className="relative">
      {children}
      
      {/* Navigation Controls */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {/* Scroll Up */}
        <button
          onClick={scrollToPrevCard}
          disabled={currentCard === 0 || isScrolling}
          className={cn(
            "p-3 rounded-full backdrop-blur-sm border transition-all duration-200",
            "bg-background/80 border-border/50 shadow-lg",
            "hover:bg-background/90 hover:scale-110",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Card Counter */}
        <div className="px-3 py-2 rounded-full backdrop-blur-sm border bg-background/80 border-border/50 shadow-lg text-sm font-medium text-center min-w-[60px]">
          {currentCard + 1} / {cardCount}
        </div>

        {/* Scroll Down */}
        <button
          onClick={scrollToNextCard}
          disabled={currentCard >= cardCount - 1 || isScrolling}
          className={cn(
            "p-3 rounded-full backdrop-blur-sm border transition-all duration-200",
            "bg-background/80 border-border/50 shadow-lg",
            "hover:bg-background/90 hover:scale-110",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          disabled={currentCard === 0 || isScrolling}
          className={cn(
            "p-3 rounded-full backdrop-blur-sm border transition-all duration-200",
            "bg-background/80 border-border/50 shadow-lg",
            "hover:bg-background/90 hover:scale-110",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "mt-2 border-t-2 border-primary/20"
          )}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
        {Array.from({ length: cardCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            disabled={isScrolling}
            className={cn(
              "w-2 h-8 rounded-full transition-all duration-300",
              "hover:w-3 focus:outline-none focus:ring-2 focus:ring-primary/20",
              currentCard === index
                ? "bg-primary shadow-lg shadow-primary/25"
                : "bg-muted hover:bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full backdrop-blur-sm border bg-background/80 border-border/50 shadow-lg text-xs text-muted-foreground">
        Use ↑↓ arrows or scroll to navigate • Space for next
      </div>
    </div>
  );
}
