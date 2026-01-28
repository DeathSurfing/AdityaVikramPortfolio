"use client";

import { useEffect, useRef } from 'react';
import { Card } from "@/components/retroui/Card";
import { Accordion } from "@/components/retroui/Accordion";

const faqItems = [
  {
    id: "access",
    question: "How do I get access?",
    answer:
      "Create an account to get started. Once logged in, available services will appear in your dashboard with clear next steps.",
  },
  {
    id: "setup",
    question: "How does setup work?",
    answer:
      "Each service includes step-by-step setup instructions inside your dashboard. The process is designed to be simple and repeatable, even for first-time users.",
  },
  {
    id: "updates",
    question: "Do services receive updates?",
    answer:
      "Yes. Services are actively maintained and updated to ensure ongoing compatibility, performance, and reliability as software changes over time.",
  },
  {
    id: "security",
    question: "Is it safe to use?",
    answer:
      "Services are built with a privacy-first approach and tested internally for stability. We recommend following all provided usage guidelines.",
  },
  {
    id: "support",
    question: "What if I need help?",
    answer:
      "If you encounter issues, support is available through your account dashboard. Common problems are addressed quickly with clear guidance.",
  },
  {
    id: "delivery",
    question: "How fast is delivery?",
    answer:
      "Access is provided instantly after purchase. There is no manual approval or waiting period for most services.",
  },
  {
    id: "compatibility",
    question: "Is this compatible with the latest versions?",
    answer:
      "Yes. Services are designed to stay compatible with current versions, and updates are released whenever changes are required.",
  },
  {
    id: "usage",
    question: "Is prior experience required?",
    answer:
      "No prior technical knowledge is needed. All tools are designed to be user-friendly with clear instructions included.",
  },
];


export function FaqCard() {
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Card entrance animation
        gsap.from(cardWrapperRef.current, {
          scale: 0.9,
          rotation: -3,
          opacity: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.7)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: cardWrapperRef.current,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none none',
            once: true,
          }
        });

        // Header slides in
        gsap.from(headerWrapperRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: cardWrapperRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
            once: true,
          }
        });

        // Accordion items stagger in
        const items = contentWrapperRef.current?.querySelectorAll('[data-accordion-item]');
        gsap.from(items || [], {
          x: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: contentWrapperRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none',
            once: true,
          }
        });

        // Parallax on scroll
        gsap.to(cardWrapperRef.current, {
          y: -30,
          rotation: 0.5,
          scrollTrigger: {
            trigger: cardWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });

      }, cardWrapperRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  return (
    <div 
      ref={cardWrapperRef}
      className="will-change-transform opacity-100"
    >
      <Card 
        className="
          bg-background 
          border-[5px] border-border
          shadow-[8px_8px_0_hsl(var(--border))]
          hover:shadow-[12px_12px_0_hsl(var(--border))]
          hover:-translate-x-[2px]
          hover:-translate-y-[2px]
          h-full flex flex-col 
          transition-all
          rotate-[-0.5deg]
        "
      >
        <div ref={headerWrapperRef}>
          <Card.Header className="p-6 border-b-4 border-border">
            <div className="inline-block mb-2 px-4 py-1 bg-primary text-primary-foreground border-2 border-border rotate-[-1deg]">
              <p className="font-black text-xs tracking-widest">HELP CENTER</p>
            </div>
            <Card.Title
              className="
              font-head font-black text-4xl md:text-5xl tracking-tight
              [text-shadow:_3px_3px_0_hsl(var(--border))]
              text-foreground dark:text-foreground
              "
            >
              FAQ
            </Card.Title>
            <Card.Description className="mt-4 text-base md:text-lg font-bold border-l-4 border-primary pl-4">
              Common questions about access, onboarding, and general use.
            </Card.Description>
          </Card.Header>
        </div>

        <div ref={contentWrapperRef}>
          <Card.Content className="p-6 pt-6 flex-1 overflow-y-auto">
            <Accordion type="single" collapsible className="space-y-4 w-full">
              {faqItems.map((item, index) => (
                <div key={item.id} data-accordion-item>
                  <Accordion.Item 
                    value={item.id} 
                    className={`
                      border-[3px] border-border 
                      bg-background
                      shadow-[4px_4px_0_hsl(var(--border))]
                      hover:shadow-[6px_6px_0_hsl(var(--border))]
                      hover:-translate-x-[1px]
                      hover:-translate-y-[1px]
                      transition-all
                      ${index % 2 === 0 ? 'rotate-[0.5deg]' : 'rotate-[-0.5deg]'}
                    `}
                  >
                    <Accordion.Header className="px-6 py-4 font-black text-lg tracking-tight">
                      {item.question}
                    </Accordion.Header>
                    <Accordion.Content className="px-6 pb-4 font-medium text-base leading-relaxed border-t-2 border-border pt-4">
                      {item.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                </div>
              ))}
            </Accordion>
          </Card.Content>
        </div>
      </Card>
    </div>
  );
}