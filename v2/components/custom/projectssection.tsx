"use client";

import { useEffect, useRef, memo } from "react";
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
import Image from "next/image";
import { lenisStore } from "@/lib/lenis-store";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

gsap.registerPlugin(ScrollTrigger);

// Map Convex project type to component project type
interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

// Memoized project card to prevent unnecessary re-renders
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <CarouselItem className="pl-6 sm:pl-8 md:basis-1/2 lg:basis-1/3">
      <div className="group relative h-full">
        {/* Project Card - Optimized */}
        <div 
          className="relative border-[5px] border-foreground bg-background shadow-[6px_6px_0_0_var(--foreground)] h-full flex flex-col"
          style={{ contain: 'layout style paint' }}
        >
          
          {/* Project ID Badge */}
          <div className="absolute -top-3 -right-3 z-20">
            <div className="border-[3px] border-foreground px-3 py-1.5 text-xs font-black tracking-[0.1em] shadow-[3px_3px_0_0_var(--foreground)] rotate-2 bg-primary text-primary-foreground">
              #{project.id.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Project number badge */}
          <div className="absolute -top-3 -left-3 z-20 w-10 h-10 sm:w-12 sm:h-12 border-[3px] border-foreground bg-foreground flex items-center justify-center rotate-[-3deg] shadow-[2px_2px_0_0_var(--foreground)]">
            <span className="text-lg sm:text-xl font-black text-background">
              {project.id.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Image area */}
          <div className="relative h-52 sm:h-60 bg-gradient-to-br from-muted via-background to-secondary overflow-hidden border-b-[4px] border-foreground">
            {/* Project Image - Optimized */}
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-90"
                loading={index < 2 ? "eager" : "lazy"}
                priority={index === 0}
              />
            )}
            
            {/* Simplified watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-7xl sm:text-8xl font-black opacity-[0.04]">
                {project.id.toString().padStart(2, "0")}
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {project.link ? (
                <Link
                  href={project.link}
                  className="border-[4px] border-background bg-primary px-6 py-3 text-sm font-black uppercase text-primary-foreground shadow-[3px_3px_0_0_var(--background)] tracking-wide"
                >
                  VIEW PROJECT →
                </Link>
              ) : (
                <span className="border-[4px] border-background bg-primary px-6 py-3 text-sm font-black uppercase text-primary-foreground shadow-[3px_3px_0_0_var(--background)]">
                  COMING SOON
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col bg-background">
            {/* Category */}
            <div className="inline-block mb-3 border-[2px] border-foreground bg-primary px-3 py-1.5 text-xs font-black uppercase tracking-[0.1em] w-fit shadow-[2px_2px_0_0_var(--foreground)] text-primary-foreground">
              {project.category}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-[0.95] mb-3 tracking-tight uppercase">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-sm font-bold leading-relaxed mb-4 flex-1 opacity-90">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-4 border-t-[2px] border-foreground">
              {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="border-[1px] border-foreground bg-background px-2 py-1 text-[10px] font-black uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="border-[1px] border-foreground bg-background px-2 py-1 text-[10px] font-black uppercase tracking-wide">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent bars */}
          <div className="flex h-2">
            <div className="flex-1 bg-foreground" />
            <div className="flex-1 bg-muted" />
            <div className="flex-1 bg-foreground/50" />
          </div>
        </div>
      </div>
    </CarouselItem>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function ProjectsNeoBrutalist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Fetch projects from Convex
  const convexProjects = useQuery(api.projects.getProjects, { limit: 50 });

  // Map Convex data to component format
  const projects: Project[] = convexProjects?.map((p: Doc<"projects">) => ({
    id: p.displayId,
    name: p.name,
    description: p.description,
    image: p.image,
    category: p.category,
    technologies: p.technologies,
    link: p.link,
  })) ?? [];

  useEffect(() => {
    // Clear any existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const ctx = gsap.context(() => {
      // Simplified heading animation
      const headingChars = headingRef.current?.querySelectorAll(".heading-char");
      if (headingChars && headingChars.length > 0) {
        const anim = gsap.from(headingChars, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
        if (anim.scrollTrigger) {
          triggersRef.current.push(anim.scrollTrigger);
        }
      }

      // Simplified carousel entrance
      const carouselAnim = gsap.from(carouselRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
      if (carouselAnim.scrollTrigger) {
        triggersRef.current.push(carouselAnim.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
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
      className="relative min-h-screen bg-background py-16 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Simplified background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-[3px] border-l-[3px] border-foreground" />
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-[3px] border-r-[3px] border-foreground" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-foreground rotate-45 mt-3 sm:mt-4" />
            
            <div className="relative">
              <div ref={headingRef}>
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  {splitText("PROJECTS")}
                </h2>
              </div>
              
              <div className="mt-2 flex gap-2">
                <div className="h-1.5 w-12 bg-foreground" />
                <div className="h-1.5 w-8 bg-foreground/60" />
                <div className="h-1.5 w-5 bg-foreground/30" />
              </div>
            </div>
          </div>
          
          <div className="ml-5 sm:ml-8 max-w-md">
            <p className="text-sm sm:text-base lg:text-lg font-bold border-l-[3px] border-foreground pl-3 sm:pl-4 bg-primary py-2 pr-3 border-y-[2px] border-r-[2px] shadow-[3px_3px_0_0_var(--border)] text-primary-foreground">
              REAL WORK. REAL IMPACT.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef}>
          {projects.length === 0 ? (
            <div className="flex items-center justify-center h-64 border-4 border-border bg-muted">
              <p className="text-lg font-black uppercase tracking-widest">Loading Projects...</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
                dragFree: false,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-6 sm:-ml-8">
                {projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </CarouselContent>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 border-[4px] border-foreground bg-primary hover:bg-foreground h-12 w-12 shadow-[4px_4px_0_0_var(--foreground)] transition-all text-primary-foreground hover:text-background" />
              
              <div className="border-[3px] border-foreground bg-foreground px-4 py-2 text-background font-black text-xs uppercase tracking-[0.15em]">
                ← SCROLL →
              </div>
              
              <CarouselNext className="static translate-y-0 border-[4px] border-foreground bg-primary hover:bg-foreground h-12 w-12 shadow-[4px_4px_0_0_var(--foreground)] transition-all text-primary-foreground hover:text-background" />
            </div>
          </Carousel>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-16 sm:mt-20 text-center">
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
            className="inline-block border-[4px] border-foreground bg-primary-hover px-8 py-4 text-sm sm:text-base font-black uppercase tracking-[0.1em] text-black shadow-[6px_6px_0_0_var(--foreground)] transition-all hover:shadow-[3px_3px_0_0_var(--foreground)] hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            LET'S BUILD SOMETHING →
          </button>
        </div>
      </div>

      {/* Bottom bars */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-foreground" />
    </section>
  );
}
