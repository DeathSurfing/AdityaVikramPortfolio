'use client';

import { useEffect, useRef } from 'react';
import Link from "next/link";

import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Shape 1 - Left top - parallax with rotation
        gsap.to(shape1Ref.current, {
          y: 100,
          rotation: 25,
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });

        // Shape 2 - Right bottom - opposite parallax
        gsap.to(shape2Ref.current, {
          y: -120,
          rotation: -20,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative px-6 md:px-20 py-32 bg-background text-foreground overflow-hidden"
    >
      {/* Background accent shapes with parallax */}
      <div 
        ref={shape1Ref}
        className="absolute left-[-10%] top-[10%] h-[40%] w-[30%] bg-primary/10 rotate-[15deg] border-4 border-border/20 will-change-transform" 
      />
      <div 
        ref={shape2Ref}
        className="absolute right-[-5%] bottom-[20%] h-[35%] w-[25%] bg-secondary/10 rotate-[-12deg] border-4 border-border/20 will-change-transform" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16 inline-block">
          <div className="px-6 py-3 bg-foreground text-background border-4 border-border rotate-[-1deg] shadow-[6px_6px_0_hsl(var(--border))]">
            <h2 className="font-black text-xl md:text-2xl tracking-widest">
              WHO WE ARE
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ABOUT – Primary */}
          <Card className="md:col-span-2 bg-background border-[5px] border-border shadow-[8px_8px_0_hsl(var(--border))] hover:shadow-[12px_12px_0_hsl(var(--border))] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all rotate-[-0.5deg]">
            <Card.Header className="p-8 md:p-12 border-b-4 border-border">
              <Card.Title className="font-head font-black text-5xl md:text-7xl leading-tight tracking-tight [text-shadow:_4px_4px_0_hsl(var(--border))]">
                ABOUT
                <br />
                <span className="text-primary">69K</span>
              </Card.Title>

              <Card.Description className="mt-8 max-w-2xl text-xl md:text-2xl font-bold leading-relaxed border-l-6 border-primary pl-6">
                Elite gaming tools for competitive domination.
              </Card.Description>
            </Card.Header>

            <Card.Content className="p-8 md:p-12 space-y-6 max-w-2xl">
              <div className="px-6 py-4 bg-secondary/20 border-4 border-border rotate-[0.5deg]">
                <p className="font-bold text-lg leading-relaxed">
                  We provide premium software with military-grade security and
                  unmatched performance across all major titles.
                </p>
              </div>

              <p className="text-base leading-relaxed font-medium">
                Every product features advanced detection bypass, instant updates,
                and 24/7 support — engineered for players who demand excellence.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-background border-3 border-border rotate-[-1deg] shadow-[3px_3px_0_hsl(var(--border))]">
                  <span className="font-black text-sm tracking-wide">UNDETECTED</span>
                </div>
                <div className="px-4 py-2 bg-background border-3 border-border rotate-[1deg] shadow-[3px_3px_0_hsl(var(--border))]">
                  <span className="font-black text-sm tracking-wide">INSTANT ACCESS</span>
                </div>
                <div className="px-4 py-2 bg-background border-3 border-border rotate-[-0.5deg] shadow-[3px_3px_0_hsl(var(--border))]">
                  <span className="font-black text-sm tracking-wide">LIFETIME UPDATES</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* AUTH COLUMN */}
          <div className="flex flex-col gap-6">
            {/* SIGN IN */}
            <Card className="bg-background border-[5px] border-border shadow-[6px_6px_0_hsl(var(--border))] hover:shadow-[10px_10px_0_hsl(var(--border))] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all rotate-[0.5deg]">
              <Card.Header className="p-6 border-b-4 border-border">
                <Card.Title className="text-3xl font-black tracking-tight">
                  SIGN IN
                </Card.Title>
                <Card.Description className="mt-3 text-base font-bold">
                  Access your premium tools
                </Card.Description>
              </Card.Header>

              <Card.Content className="p-6">
                <Button
                  asChild
                  variant="outline"
                  size="md"
                  className="
                    w-full justify-center 
                    border-[4px] border-border 
                    shadow-[4px_4px_0_hsl(var(--border))]
                    hover:shadow-[6px_6px_0_hsl(var(--border))]
                    hover:-translate-x-[1px]
                    hover:-translate-y-[1px]
                    active:translate-x-[1px]
                    active:translate-y-[1px]
                    active:shadow-[2px_2px_0_hsl(var(--border))]
                    font-black
                    transition-all
                  "
                >
                  <Link href="/signin">CONTINUE →</Link>
                </Button>
              </Card.Content>
            </Card>

            {/* SIGN UP */}
            <Card className="bg-primary border-[5px] border-border shadow-[6px_6px_0_hsl(var(--border))] hover:shadow-[10px_10px_0_hsl(var(--border))] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all rotate-[-0.5deg]">
              <Card.Header className="p-6 border-b-4 border-border">
                <Card.Title className="text-3xl font-black tracking-tight text-primary-foreground">
                  SIGN UP
                </Card.Title>
                <Card.Description className="mt-3 text-base font-bold text-primary-foreground/80">
                  Get gud
                </Card.Description>
              </Card.Header>

              <Card.Content className="p-6">
                <Button 
                  asChild 
                  size="md" 
                  className="
                    w-full justify-center
                    bg-foreground text-background
                    border-[4px] border-border 
                    shadow-[4px_4px_0_hsl(var(--border))]
                    hover:shadow-[6px_6px_0_hsl(var(--border))]
                    hover:-translate-x-[1px]
                    hover:-translate-y-[1px]
                    active:translate-x-[1px]
                    active:translate-y-[1px]
                    active:shadow-[2px_2px_0_hsl(var(--border))]
                    font-black
                    transition-all
                  "
                >
                  <Link href="/signup">GET STARTED →</Link>
                </Button>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}