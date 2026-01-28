"use client";

import { useLayoutEffect, useRef } from "react";
import { FaqCard } from "./FaqCard";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* ───────── Background shapes (parallax) ───────── */

        gsap.to(shape1Ref.current, {
          y: 120,
          rotation: 30,
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(shape2Ref.current, {
          y: -80,
          rotation: -25,
          x: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(shape3Ref.current, {
          y: 100,
          rotation: 20,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        /* ───────── Heading reveal (FIRST LOAD SAFE) ───────── */

        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        /* ───────── Heading subtle parallax ───────── */

        gsap.to(headingRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }, sectionRef);

      // 🔑 Fix Lenis + first paint
      ScrollTrigger.refresh();
    };

    initGSAP();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        "px-6 md:px-20",
        "py-24 md:py-32",
        "bg-background text-foreground",
        "border-t-[8px] border-border"
      )}
    >
      {/* ───────── Decorative shapes ───────── */}
      <div
        ref={shape1Ref}
        className={cn(
          "absolute left-[-5%] top-[15%]",
          "h-[250px] w-[250px]",
          "bg-primary/10",
          "rotate-[20deg]",
          "border-4 border-border/20",
          "will-change-transform"
        )}
      />

      <div
        ref={shape2Ref}
        className={cn(
          "absolute right-[-8%] top-[40%]",
          "h-[180px] w-[180px]",
          "bg-secondary/10",
          "rotate-[-15deg]",
          "border-4 border-border/20",
          "will-change-transform"
        )}
      />

      <div
        ref={shape3Ref}
        className={cn(
          "absolute left-[10%] bottom-[10%]",
          "h-[150px] w-[150px]",
          "bg-accent/10",
          "rotate-[25deg]",
          "border-4 border-border/20",
          "will-change-transform hidden md:block"
        )}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ───────── Heading ───────── */}
        <div
          ref={headingRef}
          className="mb-16 will-change-transform opacity-0"
        >
          <div className="inline-block mb-6">
            <div className="px-6 py-3 bg-foreground text-background border-4 border-border rotate-[-1deg] shadow-[6px_6px_0_hsl(var(--border))]">
              <p className="font-black text-sm md:text-base tracking-widest">
                GOT QUESTIONS?
              </p>
            </div>
          </div>

          <h2 className="font-head font-black text-5xl md:text-7xl leading-tight tracking-tight [text-shadow:_6px_6px_0_hsl(var(--border))]">
            WE GOT
            <br />
            <span className="text-primary">ANSWERS</span>
          </h2>

          <div className="mt-6 max-w-xl">
            <p className="text-lg md:text-xl font-bold border-l-6 border-primary pl-6">
              Everything you need to know about getting started and dominating.
            </p>
          </div>
        </div>

        {/* ───────── FAQ card ───────── */}
        <div className="max-w-4xl mx-auto">
          <FaqCard />
        </div>

        {/* ───────── Bottom CTA ───────── */}
        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-secondary border-5 border-border rotate-[-1deg] shadow-[8px_8px_0_hsl(var(--border))] hover:shadow-[12px_12px_0_hsl(var(--border))] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
            <p className="font-black text-lg md:text-xl tracking-wide text-secondary-foreground">
              Still have questions? Join our Discord →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
