"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories, type SkillCategory } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsInterestsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate hero title characters
      const heroChars =
        heroRef.current?.querySelectorAll(".hero-char") ?? [];

      gsap.from(heroChars, {
        y: 120,
        rotate: () => gsap.utils.random(-20, 20),
        opacity: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        },
      });

      // Animate skill cards
      gsap.from(".skill-card", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="skillset"
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* Background Grid */}
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

      {/* Content Container */}
      <div className="relative z-10 px-6 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Title */}
          <div ref={heroRef} className="mb-16">
            <div className="inline-block bg-foreground p-1 mb-6 -rotate-1">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-background px-6 py-3 tracking-tight">
                {splitText("SKILLSET")}
              </h2>
            </div>

            <div className="bg-yellow-300 border-4 border-black p-4 md:p-6 rotate-[0.5deg] shadow-xl max-w-3xl">
              <p className="text-lg md:text-xl font-black text-black leading-relaxed">
                Technologies I wield to{" "}
                <span className="bg-black text-yellow-300 px-2 py-1">
                  build
                </span>{" "}
                and{" "}
                <span className="bg-black text-yellow-300 px-2 py-1">
                  ship
                </span>{" "}
                real solutions.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skillCategories.map((category: SkillCategory, i: number) => (
              <div
                key={category.name}
                className="skill-card group relative"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: `rotate(${i % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 ${category.color} blur-xl transition-opacity duration-300 opacity-20 group-hover:opacity-40`}
                />

                {/* Card */}
                <div
                  className={`relative h-full border-4 border-black bg-background p-6 transition-all duration-300 ${
                    hoveredCard === i
                      ? "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -translate-y-2"
                      : "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`${category.color} border-4 border-black px-4 py-2 font-mono font-black text-sm uppercase tracking-wider text-black`}
                    >
                      {category.name}
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`w-3 h-3 border-4 border-black transition-all duration-300 ${
                        hoveredCard === i
                          ? `${category.color} rotate-45 scale-125`
                          : "bg-background"
                      }`}
                    />
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 group/skill"
                      >
                        <div
                          className={`w-2 h-2 border-2 border-black transition-all duration-300 ${
                            hoveredCard === i ? category.color : "bg-border"
                          }`}
                        />
                        <span
                          className={`font-bold text-base transition-all duration-300 ${
                            hoveredCard === i
                              ? "text-foreground translate-x-1"
                              : "text-foreground/80"
                          }`}
                        >
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black">
                    <div
                      className={`h-full ${category.color} transition-all duration-500 ${
                        hoveredCard === i ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statement */}
          <div className="mt-16 relative">
            <div className="bg-primary text-primary-foreground border-4 border-black p-6 md:p-8 shadow-2xl rotate-[0.5deg]">
              <p className="text-xl md:text-3xl font-black text-center leading-tight">
                EVERY TOOL HERE HAS SHIPPED{" "}
                <span className="bg-accent text-accent-foreground px-3 py-1 inline-block -rotate-1">
                  PRODUCTION CODE
                </span>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-black bg-yellow-300 -rotate-12 hidden lg:block" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-black bg-background rotate-6 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
