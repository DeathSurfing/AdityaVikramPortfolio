"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HeroNeoBrutalist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Disable parallax on mobile for performance
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text effect
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.from(titleChars, {
          y: isMobile ? 80 : 150,
          rotate: () => gsap.utils.random(-15, 15),
          opacity: 0,
          duration: isMobile ? 0.6 : 0.8,
          stagger: isMobile ? 0.02 : 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        });
      }

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        x: isMobile ? -40 : -80,
        opacity: 0,
        delay: isMobile ? 0.3 : 0.4,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // CTA buttons with bounce
      const ctaButtons = ctaRef.current?.querySelectorAll("a, button");
      if (ctaButtons) {
        gsap.from(ctaButtons, {
          scale: 0,
          opacity: 0,
          rotation: -180,
          duration: 0.6,
          stagger: 0.1,
          delay: isMobile ? 0.4 : 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        });
      }

      // Stamp animations - reduce on mobile
      if (!isMobile) {
        gsap.to(stampRef.current, {
          rotate: 12,
          y: 30,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Grid animation
      gsap.from(gridRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Floating shapes - reduce animation on mobile
      const shapes = floatingShapesRef.current?.querySelectorAll(".shape");
      if (shapes && !isMobile) {
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "30px 30px" : "40px 40px",
        }}
      />

      {/* Floating shapes - hidden on small mobile */}
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shape absolute top-20 left-[10%] w-12 h-12 sm:w-20 sm:h-20 border-2 sm:border-4 border-border bg-primary/20 rotate-12" />
        <div className="shape absolute top-40 right-[15%] w-10 h-10 sm:w-16 sm:h-16 border-2 sm:border-4 border-border bg-secondary/20 rounded-full hidden sm:block" />
        <div className="shape absolute bottom-32 left-[20%] w-16 h-16 sm:w-24 sm:h-24 border-2 sm:border-4 border-border bg-accent/20 hidden md:block" />
        <div className="shape absolute top-[60%] right-[25%] w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-border bg-primary/30 rotate-45 hidden sm:block" />
      </div>

      {/* Brutalist frames - responsive spacing */}
      <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-border pointer-events-none" />
      <div className="absolute inset-4 sm:inset-8 border border-border/50 sm:border-2 pointer-events-none hidden sm:block" />

      {/* Corner accents - responsive sizing */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 border-border" />
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 border-border" />
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-border" />
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-border" />

      {/* Stamps - responsive */}
      <div
        ref={stampRef}
        className="absolute top-12 right-2 sm:top-20 sm:right-6 rotate-[-12deg] border-2 sm:border-4 border-border bg-primary px-3 py-1 sm:px-5 sm:py-2 text-[10px] sm:text-sm font-extrabold tracking-widest text-primary-foreground shadow-[2px_2px_0px_0px_var(--border)] sm:shadow-[4px_4px_0px_0px_var(--border)]"
      >
        PORTFOLIO 2026
      </div>

      <div className="absolute bottom-16 left-2 sm:bottom-24 sm:left-8 rotate-[8deg] border-2 sm:border-4 border-border bg-secondary px-2 py-1 sm:px-4 sm:py-2 text-[9px] sm:text-xs font-bold tracking-wider text-secondary-foreground hidden sm:block">
        AVAILABLE FOR WORK
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex min-h-screen flex-col items-start justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-0"
        style={{
          transform: isMobile ? 'none' : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: isMobile ? 'none' : "transform 0.3s ease-out",
        }}
      >
        <h1
          ref={titleRef}
          className="max-w-5xl text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter"
        >
          <div className="overflow-hidden">
            <div>{splitText("BUILDING")}</div>
          </div>
          <div className="overflow-hidden mt-1 sm:mt-2">
            <span className="relative inline-block">
              <span className="underline decoration-border decoration-[4px] sm:decoration-[6px] lg:decoration-[8px] underline-offset-[6px] sm:underline-offset-[10px] lg:underline-offset-[12px]">
                {splitText("LOUD")}
              </span>
            </span>
          </div>
          <div className="overflow-hidden mt-1 sm:mt-2">
            <div>{splitText("IDEAS")}</div>
          </div>
        </h1>

        <div className="relative mt-6 sm:mt-8 max-w-2xl">
          <div className="absolute -left-1 sm:-left-2 top-0 bottom-0 w-0.5 sm:w-1 bg-border" />
          <div className="absolute -left-0.5 sm:-left-1 top-0 bottom-0 w-0.5 sm:w-1 bg-primary" />
          <p
            ref={subtitleRef}
            className="border-l-2 sm:border-l-4 border-border pl-3 sm:pl-6 text-base sm:text-lg lg:text-xl font-bold leading-relaxed"
          >
            I design and engineer bold digital systems that don't whisper — they{" "}
            <span className="relative inline-block bg-foreground text-background px-1.5 py-0.5 sm:px-2 rotate-[-1deg]">
              confront
            </span>
            .
          </p>
        </div>

        {/* Stats bar - responsive grid */}
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
          <div className="border border-border sm:border-2 bg-background px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-primary text-xl sm:text-2xl font-black">15+</span> PROJECTS
          </div>
          <div className="border border-border sm:border-2 bg-background px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-primary text-xl sm:text-2xl font-black">3</span> YEARS
          </div>
          <div className="border border-border sm:border-2 bg-background px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-primary text-xl sm:text-2xl font-black">100%</span> BOLD
          </div>
        </div>

        {/* CTA - responsive layout */}
        <div ref={ctaRef} className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/projects"
            className="group relative border-2 sm:border-4 border-border bg-foreground px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-background shadow-[4px_4px_0px_0px_var(--border)] sm:shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:shadow-[2px_2px_0px_0px_var(--border)] sm:hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 sm:hover:translate-x-1 sm:hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 sm:active:translate-x-2 sm:active:translate-y-2 text-center"
          >
            <span className="relative z-10">View Work</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-lg sm:text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          
          <Link
            href="/contact"
            className="group relative border-2 sm:border-4 border-border bg-primary px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_var(--border)] sm:shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:shadow-[2px_2px_0px_0px_var(--border)] sm:hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 sm:hover:translate-x-1 sm:hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 sm:active:translate-x-2 sm:active:translate-y-2 text-center"
          >
            Contact
          </Link>

          <button
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 sm:border-4 border-border bg-background px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all hover:bg-border/10 text-center sm:text-left"
          >
            ↓ Scroll
          </button>
        </div>

        {/* Social proof - responsive */}
        <div className="mt-10 sm:mt-16 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold opacity-70">
          <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse" />
          <span className="uppercase">Currently Accepting New Projects</span>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-border" />
      <div className="absolute bottom-0 left-0 h-1 sm:h-2 w-1/3 bg-primary animate-pulse" />
    </section>
  );
}