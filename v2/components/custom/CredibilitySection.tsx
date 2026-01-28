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

  const [counters, setCounters] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    metrics.forEach((metric) => {
      initial[metric.label] = 0;
    });
    return initial;
  });

  const countersStarted = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  /* ============ COUNTER LOGIC ============ */

  const startCounters = () => {
    if (countersStarted.current) return;
    countersStarted.current = true;

    metrics.forEach((metric) => {
      const target = parseFloat(metric.value);
      let current = 0;
      const step = Math.max(target / 40, 1);

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounters((prev) => ({
          ...prev,
          [metric.label]: Math.floor(current),
        }));
      }, 24);

      timersRef.current.push(timer);
    });
  };

  /* ============ GSAP EFFECTS ============ */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    startCounters();

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

      gsap.utils.toArray<HTMLElement>(".impact-row").forEach((el) => {
        gsap.from(el, {
          x: -80,
          opacity: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      timersRef.current.forEach(clearInterval);
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
              No trendy tools. Only things I’d defend in production.
            </p>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
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

      {/* OPINIONATED STACK */}
      <div className="relative z-10 px-6 lg:px-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <p className="font-bold text-lg mb-8 max-w-2xl">
            Every choice below exists because something else failed under real
            load.
          </p>

          <div className="border-4 border-border shadow-[8px_8px_0px_0px_var(--border)]">
            {techMappings.map((m) => (
              <div
                key={m.tech}
                className="impact-row grid md:grid-cols-2 border-b-4 border-border last:border-b-0 hover:bg-primary/5"
              >
                <div className="p-6 font-mono font-bold">
                  {m.tech}
                </div>
                <div className="p-6 font-bold flex gap-4">
                  <span className="text-primary text-2xl">→</span>
                  {m.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
