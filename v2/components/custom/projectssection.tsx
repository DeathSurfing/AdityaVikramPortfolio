"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
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
import { IconFilter, IconX } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

// Map Convex project type to component project type
interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

// Extract unique categories from projects
const getCategories = (projects: Project[]): string[] => {
  const categories = new Set(projects.map(p => p.category));
  return Array.from(categories).sort();
};

// Extract unique technologies from projects
const getTechnologies = (projects: Project[]): string[] => {
  const technologies = new Set<string>();
  projects.forEach(p => {
    p.technologies.forEach(tech => technologies.add(tech));
  });
  return Array.from(technologies).sort();
};

// Memoized project card to prevent unnecessary re-renders
const ProjectCard = memo(({ project }: { project: Project }) => {
  return (
    <div className="group relative h-full">
      {/* Project Card - Optimized */}
      <div 
        className="relative border-[5px] border-foreground bg-background shadow-[6px_6px_0_0_var(--foreground)] h-full flex flex-col"
        style={{ contain: 'layout style paint' }}
      >
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
              loading="lazy"
            />
          )}
          
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
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function ProjectsNeoBrutalist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all projects
  const projectsData = useQuery(api.projects.getProjects, { limit: 50 });
  
  // Map projects data
  const allProjects: Project[] = projectsData?.projects?.map((p: Doc<"projects">) => ({
    _id: p._id,
    name: p.name,
    description: p.description,
    image: p.image,
    category: p.category,
    technologies: p.technologies,
    link: p.link,
  })) ?? [];

  // Filtered projects by category and technology
  const filteredProjects = allProjects.filter(p => {
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    const technologyMatch = selectedTechnology ? p.technologies.includes(selectedTechnology) : true;
    return categoryMatch && technologyMatch;
  });

  // Get unique categories and technologies
  const categories = getCategories(allProjects);
  const technologies = getTechnologies(allProjects);

  // Count active filters
  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedTechnology ? 1 : 0);

  // Duplicate projects for infinite loop effect (minimum 6 for smooth carousel)
  const duplicatedProjects = filteredProjects.length > 0 
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects] 
    : [];

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedTechnology(null);
  };

  useEffect(() => {
    // Clear any existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

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
        <div className="mb-8 sm:mb-12">
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
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 ml-5 sm:ml-8">
            <p className="text-sm sm:text-base lg:text-lg font-bold border-l-[3px] border-foreground pl-3 sm:pl-4 bg-primary py-2 pr-3 border-y-[2px] border-r-[2px] shadow-[3px_3px_0_0_var(--border)] text-primary-foreground">
              REAL WORK. REAL IMPACT.
            </p>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 border-[4px] border-foreground bg-background px-4 py-2 font-black text-sm uppercase tracking-wider shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:shadow-[2px_2px_0_0_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <IconFilter className="h-4 w-4" strokeWidth={2.5} />
              {showFilters ? 'HIDE FILTERS' : 'FILTER'}
              {activeFilterCount > 0 && <span className="ml-1 text-primary">({activeFilterCount})</span>}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 ml-5 sm:ml-8 space-y-4">
            {/* Category Filter */}
            <div className="inline-flex flex-wrap items-center gap-3 border-[4px] border-foreground bg-background p-4 shadow-[6px_6px_0_0_var(--foreground)]">
              <span className="font-black text-sm uppercase tracking-wider">CATEGORY:</span>
              
              {/* All button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 font-black text-xs uppercase tracking-wide border-[3px] transition-all ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_var(--foreground)]'
                    : 'bg-background text-foreground border-border hover:border-foreground'
                }`}
              >
                ALL
              </button>
              
              {/* Category buttons */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-4 py-2 font-black text-xs uppercase tracking-wide border-[3px] transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_var(--foreground)]'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Technology Filter */}
            <div className="inline-flex flex-wrap items-center gap-3 border-[4px] border-foreground bg-background p-4 shadow-[6px_6px_0_0_var(--foreground)]">
              <span className="font-black text-sm uppercase tracking-wider">TECH:</span>
              
              {/* All button */}
              <button
                onClick={() => setSelectedTechnology(null)}
                className={`px-4 py-2 font-black text-xs uppercase tracking-wide border-[3px] transition-all ${
                  selectedTechnology === null
                    ? 'bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_var(--foreground)]'
                    : 'bg-background text-foreground border-border hover:border-foreground'
                }`}
              >
                ALL
              </button>
              
              {/* Technology buttons */}
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTechnology(tech === selectedTechnology ? null : tech)}
                  className={`px-4 py-2 font-black text-xs uppercase tracking-wide border-[3px] transition-all ${
                    selectedTechnology === tech
                      ? 'bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_var(--foreground)]'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  {tech}
                </button>
              ))}
              
              {/* Clear all filters button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="p-2 border-[3px] border-foreground bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  aria-label="Clear all filters"
                >
                  <IconX className="h-4 w-4" strokeWidth={2.5} />
                </button>
              )}
            </div>
            
            {/* Filter status */}
            {activeFilterCount > 0 && (
              <div className="mt-3 inline-block border-[3px] border-foreground bg-yellow-300 px-4 py-2 font-black text-sm text-black">
                SHOWING: {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
                {selectedCategory && ` IN ${selectedCategory.toUpperCase()}`}
                {selectedTechnology && ` WITH ${selectedTechnology.toUpperCase()}`}
              </div>
            )}
          </div>
        )}

        {/* Carousel */}
        <div ref={carouselRef}>
          {allProjects.length === 0 ? (
            <div className="flex items-center justify-center h-64 border-4 border-border bg-muted">
              <p className="text-lg font-black uppercase tracking-widest">Loading Projects…</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center h-64 border-4 border-border bg-muted">
              <p className="text-lg font-black uppercase tracking-widest">No projects match the filters</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: false,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-6 sm:-ml-8">
                {duplicatedProjects.map((project, idx) => (
                  <CarouselItem 
                    key={`${project._id}-${idx}`} 
                    className="pl-6 sm:pl-8 md:basis-1/2 lg:basis-1/3"
                  >
                    <ProjectCard project={project} />
                  </CarouselItem>
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
            aria-label="Navigate to contact section"
            className="inline-block border-[4px] border-foreground bg-primary-hover px-8 py-4 text-sm sm:text-base font-black uppercase tracking-[0.1em] text-black shadow-[6px_6px_0_0_var(--foreground)] transition-[shadow,transform] hover:shadow-[3px_3px_0_0_var(--foreground)] hover:translate-x-[3px] hover:translate-y-[3px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
