"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= TYPES ================= */

interface Metric {
  value: string;
  label: string;
  suffix?: string;
}

interface TechMapping {
  tech: string;
  outcome: string;
}

/* ================= DATA ================= */

const metrics: Metric[] = [
  { value: "3200", label: "REAL USERS", suffix: "+" },
  { value: "99.9", label: "MEASURED UPTIME", suffix: "%" },
  { value: "1200", label: "COMMITS DEPLOYED", suffix: "+" },
  { value: "0", label: "PRODUCTION INCIDENTS", suffix: "" },
];

const techMappings: TechMapping[] = [
  {
    tech: "Next.js",
    outcome: "Picked because SEO should work by default, not after rewrites",
  },
  {
    tech: "Convex",
    outcome: "Realtime without inventing a second backend career",
  },
  {
    tech: "TypeScript",
    outcome: "If it compiles, it survives prod",
  },
  {
    tech: "TailwindCSS",
    outcome: "Styling velocity matters more than theoretical elegance",
  },
  {
    tech: "Docker",
    outcome: "Runs the same on my laptop and at 3AM in production",
  },
  {
    tech: "Nixpacks",
    outcome: "Reproducibility beats tribal knowledge",
  },
  {
    tech: "Proxmox",
    outcome: "Cloud convenience is nice. Control is better",
  },
  {
    tech: "WorkOS",
    outcome: "Auth solutions are always better than rolling your own",
  },
];

/* ================= COMPONENT ================= */

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [counters] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    metrics.forEach((metric) => {
      initial[metric.label] = parseFloat(metric.value);
    });
    return initial;
  });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  /* ============ GSAP EFFECTS ============ */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heroChars =
        heroRef.current?.querySelectorAll(".hero-char") ?? [];

      gsap.from(heroChars, {
        y: 120,
        rotate: () => gsap.utils.random(-20, 20),
        opacity: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "back.out(1.5)",
      });

      // Animate cards in with stagger
      gsap.from(".tech-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotateX: -15,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  /* ============ UTIL ============ */

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  /* ================= JSX ================= */

  return (
    <section
      ref={sectionRef}
      id="opinions"
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* GRID */}
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

      {/* HERO */}
      <div className="relative z-10 px-6 lg:px-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="mb-12">
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight">
              {splitText("OPINIONS")}
            </h1>
            <p className="mt-6 text-xl font-bold border-l-4 border-border pl-6 max-w-xl">
              No trendy tools. Only things I'd defend in production.
            </p>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className="border-4 border-border bg-background p-6 shadow-[8px_8px_0px_0px_var(--border)]"
                style={{ transform: `rotate(${i % 2 ? "1deg" : "-1deg"})` }}
              >
                <div className="text-6xl font-black leading-none">
                  {counters[metric.label]}
                  <span className="text-primary">{metric.suffix}</span>
                </div>
                <div className="mt-3 text-xs font-extrabold tracking-widest opacity-70">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPINIONATED STACK - INTERACTIVE CARDS */}
      <div className="relative z-10 px-6 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <p className="font-bold text-2xl">
            My <span className="bg-accent-foreground text-accent font-mono">Personal</span> Choice for a Perfect <span className="font-extrabold bg-primary-hover text-black">Tech Stack</span></p>
          <p className="font-bold text-lg mb-12 max-w-2xl">
            Every choice below exists because something else failed under real
            load.
          </p>

          <div className="tech-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techMappings.map((m, i) => (
              <div
                key={m.tech}
                className="tech-card group relative"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background with Perspective */}
                <div className="relative h-full">
                  {/* Glowing effect on hover */}
                  <div
                    className={`absolute inset-0 bg-primary/20 blur-xl transition-opacity duration-300 ${
                      hoveredCard === i ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Main Card */}
                  <div
                    className={`relative h-full border-4 border-border bg-background p-6 transition-all duration-300 ${
                      hoveredCard === i
                        ? "shadow-[12px_12px_0px_0px_var(--primary)] -translate-y-2"
                        : "shadow-[6px_6px_0px_0px_var(--border)]"
                    }`}
                  >
                    {/* Tech Name Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`inline-block px-4 py-2 font-mono font-black text-lg border-2 border-border transition-all duration-300 ${
                          hoveredCard === i
                            ? "bg-primary text-background scale-105"
                            : "bg-background"
                        }`}
                      >
                        {m.tech}
                      </div>

                      {/* Decorative Corner */}
                      <div
                        className={`w-3 h-3 border-4 border-border transition-all duration-300 ${
                          hoveredCard === i
                            ? "bg-primary rotate-45 scale-125"
                            : "bg-background"
                        }`}
                      />
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-1 bg-border" />
                      <div
                        className={`text-3xl font-black transition-all duration-300 ${
                          hoveredCard === i
                            ? "text-black scale-125 translate-x-2 bg-primary-hover"
                            : "text-foreground/30 "
                        }`}
                      >
                        Why?
                      </div>
                      <div className="flex-1 h-1 bg-border" />
                    </div>

                    {/* Outcome Text */}
                    <p
                      className={`font-bold text-base leading-relaxed transition-all duration-300 ${
                        hoveredCard === i ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {m.outcome}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
                      <div
                        className={`h-full bg-primary transition-all duration-500 ${
                          hoveredCard === i ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 border-l-4 border-primary pl-6">
          </div>
        </div>
      </div>
    </section>
  );
}
