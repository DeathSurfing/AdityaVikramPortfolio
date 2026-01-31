"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroChars = heroRef.current?.querySelectorAll(".hero-char") ?? [];
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
    }, heroRef);

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
    <div ref={heroRef} className="mb-16">
      <div className="flex items-start gap-6 sm:gap-8 mb-8">
        <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-foreground border-4 border-foreground rotate-45 mt-6 sm:mt-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]" />
        <div className="relative">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight">
            {splitText("LET'S")}
            <br />
            {splitText("TALK")}
          </h2>
          <div className="mt-4 flex gap-2">
            <div className="h-3 w-20 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
            <div className="h-3 w-16 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
            <div className="h-3 w-12 bg-foreground border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)]" />
          </div>
        </div>
      </div>

      <div className="ml-8 sm:ml-16 max-w-2xl">
        <p className="text-lg sm:text-xl lg:text-2xl font-black border-l-[6px] border-foreground pl-6 sm:pl-8 bg-primary py-4 pr-6 border-y-4 border-r-4 shadow-[8px_8px_0px_0px_var(--foreground)] text-primary-foreground">
          Have a project in mind? Let's build something together.
        </p>
      </div>
    </div>
  );
}
