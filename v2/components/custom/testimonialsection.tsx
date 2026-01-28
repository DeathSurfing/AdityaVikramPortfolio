"use client";

import { useEffect, useRef } from 'react';
import { Card } from "@/components/retroui/Card";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  accent: "primary" | "secondary" | "accent";
};

const testimonials: Testimonial[] = [
  {
    name: "K1NGx",
    role: "Ranked Grinder",
    avatar: "/avatars/k1ngx.jpg",
    quote:
      "Went from hardstuck to top lobbies in a week. Smooth, undetected, and stupidly effective.",
    accent: "primary",
  },
  {
    name: "VoidSpectre",
    role: "Competitive FPS Player",
    avatar: "/avatars/void.jpg",
    quote:
      "No crashes, no bans, no nonsense. This is the kind of edge you pay for.",
    accent: "secondary",
  },
  {
    name: "RecoilZero",
    role: "Semi-Pro Scrims",
    avatar: "/avatars/recoil.jpg",
    quote:
      "Configs are clean, features are lethal, and updates stay ahead of patches.",
    accent: "accent",
  },
];

const accentColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Background shapes - wild parallax
        gsap.to(shape1Ref.current, {
          y: 150,
          rotation: 45,
          scale: 1.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });

        gsap.to(shape2Ref.current, {
          y: -100,
          rotation: -35,
          scale: 0.8,
          x: 50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          }
        });

        // Heading - subtle float
        gsap.to(headingRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        });

        // Cards - staggered parallax with rotation
        gsap.to(card1Ref.current, {
          y: -60,
          rotation: -2,
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        });

        gsap.to(card2Ref.current, {
          y: -90,
          rotation: 1,
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });

        gsap.to(card3Ref.current, {
          y: -70,
          rotation: -1.5,
          scrollTrigger: {
            trigger: card3Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          }
        });

        // CTA - bouncy entrance
        gsap.fromTo(ctaRef.current,
          {
            scale: 0.8,
            rotation: -5,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: -1,
            opacity: 1,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative px-6 md:px-20 py-32",
        "border-t-[8px] border-border",
        "bg-background text-foreground",
        "overflow-hidden"
      )}
    >
      {/* Background decorative elements with parallax */}
      <div 
        ref={shape1Ref}
        className="absolute right-[-5%] top-[10%] h-[200px] w-[200px] bg-primary/10 rotate-[25deg] border-4 border-border/20 will-change-transform" 
      />
      <div 
        ref={shape2Ref}
        className="absolute left-[-3%] bottom-[15%] h-[150px] w-[150px] bg-secondary/10 rotate-[-15deg] border-4 border-border/20 will-change-transform" 
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading with parallax */}
        <div ref={headingRef} className="mb-20 will-change-transform">
          <div className="inline-block mb-6">
            <div className="px-6 py-3 bg-foreground text-background border-4 border-border rotate-[-1deg] shadow-[6px_6px_0_hsl(var(--border))]">
              <p className="font-black text-sm md:text-base tracking-widest">
                TESTIMONIALS
              </p>
            </div>
          </div>
          
          <h2 className="font-head font-black text-5xl md:text-7xl leading-tight tracking-tight [text-shadow:_6px_6px_0_hsl(var(--border))]">
            WHAT PEOPLE
            <br />
            <span className="text-primary">SAY</span>
          </h2>
          
          <div className="mt-6 max-w-xl">
            <p className="text-lg md:text-xl font-bold border-l-6 border-primary pl-6">
              Real reviews from real gamers crushing their competition.
            </p>
          </div>
        </div>

        {/* Grid with individual card parallax */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={i === 0 ? card1Ref : i === 1 ? card2Ref : card3Ref}
              className="will-change-transform"
            >
              <Card
                className={cn(
                  "bg-background text-foreground",
                  "border-[5px] border-border",
                  "shadow-[8px_8px_0_hsl(var(--border))]",
                  "hover:shadow-[12px_12px_0_hsl(var(--border))]",
                  "hover:-translate-x-[2px]",
                  "hover:-translate-y-[2px]",
                  "transition-all",
                  "relative",
                  i === 0 && "rotate-[-1deg]",
                  i === 1 && "md:translate-y-8 rotate-[0.5deg]",
                  i === 2 && "rotate-[-0.5deg]"
                )}
              >
                {/* Accent corner */}
                <div className={cn(
                  "absolute top-0 right-0 w-16 h-16 border-b-[5px] border-l-[5px] border-border",
                  accentColors[t.accent]
                )} />

                <div className="p-8 relative">
                  {/* Quote mark */}
                  <div className="mb-4">
                    <span className="font-black text-6xl text-primary leading-none opacity-20">"</span>
                  </div>

                  <Text className="mb-8 text-base md:text-lg font-bold leading-relaxed">
                    {t.quote}
                  </Text>

                  {/* Divider */}
                  <div className="h-[3px] w-full bg-border mb-6" />

                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-[4px] border-border rounded-none bg-muted shadow-[4px_4px_0_hsl(var(--border))]">
                      <Avatar.Image src={t.avatar} alt={t.name} />
                      <Avatar.Fallback className="font-black text-xl">
                        {t.name.slice(0, 1)}
                      </Avatar.Fallback>
                    </Avatar>

                    <div>
                      <p className="text-base md:text-lg font-black tracking-tight">{t.name}</p>
                      <div className="mt-1 inline-block px-3 py-1 bg-muted border-2 border-border">
                        <p className="text-xs font-black uppercase tracking-wide">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA with entrance animation */}
        <div ref={ctaRef} className="mt-20 text-center will-change-transform">
          <div className="inline-block px-8 py-4 bg-secondary border-5 border-border rotate-[-1deg] shadow-[8px_8px_0_hsl(var(--border))]">
            <p className="font-black text-lg md:text-xl tracking-wide text-secondary-foreground">
              Become the best in 5 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}