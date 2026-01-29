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

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  year: string;
  status: "Live" | "In Progress" | "Archived";
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-COMMERCE REVOLUTION",
    category: "Full Stack",
    description: "A brutal approach to online shopping. No unnecessary elements, just pure conversion-focused design with real-time inventory management.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "/projects/ecommerce.jpg",
    link: "https://example.com",
    year: "2024",
    status: "Live",
  },
  {
    id: 2,
    title: "TASK DOMINATION",
    category: "SaaS Platform",
    description: "Project management that doesn't mess around. Built for teams who ship fast and break things intentionally.",
    tags: ["React", "Node.js", "MongoDB", "WebSocket"],
    image: "/projects/taskmanager.jpg",
    link: "https://example.com",
    year: "2024",
    status: "Live",
  },
  {
    id: 3,
    title: "PORTFOLIO SYSTEM",
    category: "Web Design",
    description: "Dynamic portfolio generator for creatives who refuse to be templated. Each site is unique, loud, and unapologetically bold.",
    tags: ["TypeScript", "Tailwind", "Framer Motion", "CMS"],
    image: "/projects/portfolio.jpg",
    link: "https://example.com",
    year: "2023",
    status: "Live",
  },
  {
    id: 4,
    title: "SOCIAL DISRUPTOR",
    category: "Mobile App",
    description: "Social media platform that prioritizes genuine connection over engagement metrics. Revolutionary UX patterns.",
    tags: ["React Native", "Firebase", "GraphQL", "AWS"],
    image: "/projects/social.jpg",
    link: "https://example.com",
    year: "2024",
    status: "In Progress",
  },
  {
    id: 5,
    title: "DATA CRUSHER",
    category: "Dashboard",
    description: "Analytics dashboard that makes data scream. Real-time visualizations that actually tell you what to do next.",
    tags: ["Vue.js", "D3.js", "FastAPI", "Docker"],
    image: "/projects/analytics.jpg",
    link: "https://example.com",
    year: "2023",
    status: "Live",
  },
];

export default function ProjectsNeoBrutalist() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const headingChars = headingRef.current?.querySelectorAll(".heading-char");
      if (headingChars) {
        gsap.from(headingChars, {
          y: 100,
          rotate: () => gsap.utils.random(-20, 20),
          opacity: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      // Carousel entrance
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
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
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-border" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-border" />

      {/* Floating stamp */}
      <div className="absolute top-12 right-12 rotate-12 border-4 border-border bg-accent px-4 py-2 text-sm font-extrabold tracking-widest shadow-[6px_6px_0px_0px_var(--border)] hidden lg:block">
        SELECTED WORKS
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-1/4 left-8 w-20 h-20 border-4 border-border bg-primary/10 rotate-45 hidden md:block" />
      <div className="absolute bottom-1/3 right-16 w-24 h-24 border-4 border-border bg-secondary/10 rounded-full hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 bg-primary mt-4 sm:mt-6" />
            <div ref={headingRef} className="overflow-hidden">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter">
                {splitText("PROJECTS")}
              </h2>
            </div>
          </div>
          
          <div className="ml-6 sm:ml-12 max-w-2xl">
            <p className="text-base sm:text-lg lg:text-xl font-bold border-l-4 border-border pl-4 sm:pl-6">
              Real work. Real impact. No portfolio filler.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 sm:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    {/* Project Card */}
                    <div className="relative border-4 border-border bg-background shadow-[8px_8px_0px_0px_var(--border)] transition-all duration-300 hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1 h-full flex flex-col">
                      {/* Status Badge */}
                      <div className="absolute -top-3 -right-3 z-20">
                        <div
                          className={`border-2 border-border px-3 py-1 text-xs font-extrabold tracking-wider shadow-[4px_4px_0px_0px_var(--border)] ${
                            project.status === "Live"
                              ? "bg-green-400 text-black"
                              : project.status === "In Progress"
                              ? "bg-yellow-400 text-black"
                              : "bg-gray-400 text-black"
                          }`}
                        >
                          {project.status.toUpperCase()}
                        </div>
                      </div>

                      {/* Image placeholder with overlay */}
                      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden border-b-4 border-border">
                        {/* You can replace this with actual images */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl sm:text-7xl font-black opacity-10">
                            {project.id.toString().padStart(2, "0")}
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link
                            href={project.link}
                            className="border-4 border-background bg-primary px-6 py-3 text-sm font-extrabold uppercase text-primary-foreground shadow-[4px_4px_0px_0px_var(--background)] hover:shadow-[2px_2px_0px_0px_var(--background)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                          >
                            View Project →
                          </Link>
                        </div>

                        {/* Year badge */}
                        <div className="absolute bottom-3 left-3 border-2 border-border bg-background px-2 py-1 text-xs font-bold">
                          {project.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category */}
                        <div className="inline-block mb-3 border-2 border-border bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wider w-fit">
                          {project.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-3 tracking-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm font-bold leading-relaxed mb-4 flex-1 opacity-80">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-border">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="border border-border bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="h-2 bg-primary" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 border-4 border-border bg-background h-14 w-14 shadow-[6px_6px_0px_0px_var(--border)] hover:shadow-[3px_3px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all" />
              
              <div className="border-2 border-border bg-foreground px-4 py-2 text-background font-extrabold text-sm uppercase tracking-widest">
                Drag or Navigate
              </div>
              
              <CarouselNext className="static translate-y-0 border-4 border-border bg-background h-14 w-14 shadow-[6px_6px_0px_0px_var(--border)] hover:shadow-[3px_3px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all" />
            </div>
          </Carousel>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-24 text-center">
            <Link
            href="#contact"
            className="inline-block border-4 border-border bg-primary-hover px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-black shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1"
            >
            Let's Build Something →
            </Link>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-border" />
      <div className="absolute bottom-0 right-0 h-2 w-1/2 bg-primary" />
    </section>
  );
}