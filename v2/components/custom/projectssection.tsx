"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/custom/carousel";
import Link from "next/link";
import { lenisStore } from "@/lib/lenis-store";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsNeoBrutalist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - more aggressive
      const headingChars = headingRef.current?.querySelectorAll(".heading-char");
      if (headingChars) {
        gsap.from(headingChars, {
          y: 150,
          rotate: () => gsap.utils.random(-30, 30),
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      // Carousel entrance with bounce
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="heading-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="project"
      className="relative min-h-screen bg-background py-20 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Aggressive background grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 2px, transparent 2px),
            linear-gradient(to bottom, currentColor 2px, transparent 2px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Bold diagonal stripes */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            currentColor,
            currentColor 2px,
            transparent 2px,
            transparent 20px
          )`,
        }}
      />

      {/* Massive corner brackets */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-t-[6px] border-l-[6px] border-foreground" />
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-t-[6px] border-r-[6px] border-foreground" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-b-[6px] border-l-[6px] border-foreground" />
      <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-b-[6px] border-r-[6px] border-foreground" />

      {/* Floating aggressive stamps */}
      <div className="absolute top-16 right-16 rotate-12 border-[5px] border-foreground bg-background px-6 py-3 text-base font-black tracking-[0.2em] shadow-[8px_8px_0px_0px_var(--foreground)] hidden lg:block">
        ★ SELECTED WORKS ★
      </div>

      {/* Decorative aggressive shapes */}
      <div className="absolute top-1/4 left-8 w-28 h-28 border-[6px] border-foreground bg-background rotate-45 shadow-[10px_10px_0px_0px_var(--foreground)] hidden md:block" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 border-[6px] border-foreground bg-background rounded-full shadow-[12px_12px_0px_0px_var(--foreground)] hidden lg:block" />
      <div className="absolute top-1/2 right-8 w-20 h-20 border-[5px] border-foreground bg-background -rotate-12 shadow-[8px_8px_0px_0px_var(--foreground)] hidden xl:block" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence baseFrequency="0.8" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header - Ultra Brutal */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-start gap-6 sm:gap-8 mb-8">
            {/* Aggressive dot */}
            <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-foreground border-4 border-foreground rotate-45 mt-6 sm:mt-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]" />
            
            <div className="relative">
              {/* Background text shadow */}
              <div 
                ref={headingRef} 
                className="overflow-hidden relative"
                style={{
                  textShadow: `
                    4px 4px 0px rgba(0,0,0,0.1),
                    8px 8px 0px rgba(0,0,0,0.05)
                  `
                }}
              >
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[-0.03em] relative">
                  {splitText("PROJECTS")}
                </h2>
              </div>
              
              {/* Underline accent */}
              <div className="mt-4 flex gap-2">
                <div className="h-3 w-20 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
                <div className="h-3 w-16 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
                <div className="h-3 w-12 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
              </div>
            </div>
          </div>
          
          <div className="ml-8 sm:ml-16 max-w-2xl">
            <div className="relative">
              <p className="text-lg sm:text-xl lg:text-2xl font-black border-l-[6px] border-foreground pl-6 sm:pl-8 bg-primary py-4 pr-6 border-y-4 border-r-4 shadow-[8px_8px_0px_0px_var(--foreground)] text-primary-foreground">
                REAL WORK. REAL IMPACT. ZERO BS.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel - Brutalist AF */}
        <div ref={carouselRef} className="relative">
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-6 sm:-ml-8">
              {projects.map((project, idx) => (
                <CarouselItem key={project.id} className="pl-6 sm:pl-8 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    {/* Project Card - BRUTAL */}
                    <div className="relative border-[5px] border-foreground bg-background shadow-[12px_12px_0px_0px_var(--foreground)] transition-all duration-300 hover:shadow-[6px_6px_0px_0px_var(--foreground)] hover:translate-x-[6px] hover:translate-y-[6px] h-full flex flex-col">
                      
                      {/* Project ID Badge */}
                      <div className="absolute -top-4 -right-4 z-20">
                        <div className="border-4 border-foreground px-4 py-2 text-xs font-black tracking-[0.15em] shadow-[6px_6px_0px_0px_var(--foreground)] rotate-3 bg-primary text-primary-foreground">
                          ★ PROJECT {project.id.toString().padStart(2, "0")}
                        </div>
                      </div>

                      {/* Project number badge */}
                      <div className="absolute -top-4 -left-4 z-20 w-12 h-12 sm:w-14 sm:h-14 border-4 border-foreground bg-foreground flex items-center justify-center rotate-[-5deg] shadow-[4px_4px_0px_0px_var(--foreground)]">
                        <span className="text-xl sm:text-2xl font-black text-background">
                          {project.id.toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Image area - Bold gradient */}
                      <div className="relative h-56 sm:h-64 bg-linear-to-br from-muted via-background to-secondary overflow-hidden border-b-[5px] border-foreground">
                        {/* Project Image */}
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        
                        {/* Diagonal stripes overlay */}
                        <div
                          className="absolute inset-0 opacity-10 mix-blend-multiply"
                          style={{
                            backgroundImage: `repeating-linear-gradient(
                              45deg,
                              transparent,
                              transparent 10px,
                              rgba(0,0,0,0.5) 10px,
                              rgba(0,0,0,0.5) 20px
                            )`,
                          }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl sm:text-9xl font-black opacity-5 mix-blend-overlay">
                            {project.id.toString().padStart(2, "0")}
                          </div>
                        </div>
                        
                        {/* Hover overlay - BRUTAL */}
                        <div className="absolute inset-0 bg-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.link ? (
                            <Link
                              href={project.link}
                              className="border-[5px] border-background bg-primary px-8 py-4 text-base font-black uppercase text-primary-foreground shadow-[6px_6px_0px_0px_var(--background)] hover:shadow-[3px_3px_0px_0px_var(--background)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all tracking-wider"
                            >
                              VIEW PROJECT →
                            </Link>
                          ) : (
                            <span className="border-[5px] border-background bg-primary px-8 py-4 text-base font-black uppercase text-primary-foreground shadow-[6px_6px_0px_0px_var(--background)]">
                              COMING SOON
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col bg-background">
                        {/* Category - Aggressive tag */}
                        <div className="inline-block mb-4 border-[3px] border-foreground bg-primary px-4 py-2 text-xs font-black uppercase tracking-[0.15em] w-fit shadow-[4px_4px_0px_0px_var(--foreground)] -rotate-1 text-primary-foreground">
                          {project.category}
                        </div>

                        {/* Title - MASSIVE */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.95] mb-4 tracking-tight uppercase">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base font-bold leading-relaxed mb-6 flex-1 opacity-90">
                          {project.description}
                        </p>

                        {/* Technologies - Brutalist style */}
                        <div className="flex flex-wrap gap-2 pt-5 border-t-[3px] border-foreground">
                          {project.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="border-2 border-foreground bg-background px-3 py-1.5 text-[11px] font-black uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors shadow-[2px_2px_0px_0px_var(--foreground)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom brutal accent bars */}
                      <div className="flex h-3">
                        <div className="flex-1 bg-foreground" />
                        <div className="flex-1 bg-muted" />
                        <div className="flex-1 bg-foreground opacity-50" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons - ULTRA BRUTAL */}
            <div className="flex items-center justify-center gap-6 mt-16">
              <CarouselPrevious className="static translate-y-0 border-[5px] border-foreground bg-primary hover:bg-foreground h-16 w-16 shadow-[8px_8px_0px_0px_var(--foreground)] hover:shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-1 hover:translate-y-1 transition-all text-primary-foreground hover:text-background" />
              
              <div className="border-4 border-foreground bg-foreground px-6 py-3 text-background font-black text-sm uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                ← DRAG OR NAV →
              </div>
              
              <CarouselNext className="static translate-y-0 border-[5px] border-foreground bg-primary hover:bg-foreground h-16 w-16 shadow-[8px_8px_0px_0px_var(--foreground)] hover:shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-1 hover:translate-y-1 transition-all text-primary-foreground hover:text-background" />
            </div>
          </Carousel>
        </div>

        {/* Bottom CTA - MASSIVE BRUTAL BUTTON */}
        <div className="mt-20 sm:mt-28 text-center relative">
          
          <button
            onClick={() => {
              const lenis = lenisStore.lenis;
              if (lenis) {
                lenis.scrollTo("#contact", {
                  offset: 0,
                  duration: 1.2,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block relative border-[6px] border-foreground bg-primary-hover px-12 py-6 text-base sm:text-lg font-black uppercase tracking-[0.15em] text-primary-foreground shadow-[12px_12px_0px_0px_var(--foreground)] transition-all hover:shadow-[6px_6px_0px_0px_var(--foreground)] hover:translate-x-[6px] hover:translate-y-[6px] group"
          >
            <span className="relative z-10 text-black">LET'S BUILD SOMETHING →</span>
            
            {/* Animated underline */}
            <div className="absolute bottom-2 left-6 right-6 h-1 bg-foreground transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          {/* Decorative arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-0 h-0 border-l-15 border-l-transparent border-r-15 border-r-transparent border-b-20 border-b-foreground opacity-30" />
            <div className="w-0 h-0 border-l-15 border-l-transparent border-r-15 border-r-transparent border-b-20 border-b-foreground opacity-50" />
            <div className="w-0 h-0 border-l-15 border-l-transparent border-r-15 border-r-transparent border-b-20 border-b-foreground opacity-70" />
          </div>
        </div>
      </div>

      {/* Bottom decorative brutal bars */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-foreground" />
      <div className="absolute bottom-4 left-0 right-0 flex h-3">
        <div className="flex-1 bg-foreground" />
        <div className="flex-1 bg-muted" />
        <div className="flex-1 bg-foreground opacity-70" />
        <div className="flex-1 bg-muted" />
      </div>
    </section>
  );
}