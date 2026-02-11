'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ExperienceCard from './experience/ExperienceCard';
import TimelineConnector from './experience/TimelineConnector';
import { IconBriefcase } from '@tabler/icons-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const splitText = (text: string) =>
  text.split('').map((char, i) => (
    <span key={i} className="hero-char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Fetch experiences from Convex database
  const experiences = useQuery(api.experiences.getExperiences, {});

  useEffect(() => {
    if (!headingRef.current) return;

    const chars = headingRef.current.querySelectorAll('.hero-char');

    gsap.fromTo(
      chars,
      {
        y: 80,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Function to trigger timeline update when cards expand/collapse
  const handleCardExpandChange = () => {
    // Small delay to allow animation to complete
    setTimeout(() => {
      setForceUpdate((prev) => prev + 1);
    }, 350);
  };

  useEffect(() => {
    if (!timelineRef.current) return;

    // Set initial height
    setTimelineHeight(timelineRef.current.scrollHeight);

    // Watch for height changes (when cards expand)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTimelineHeight(entry.target.scrollHeight);
      }
    });

    resizeObserver.observe(timelineRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [forceUpdate]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-background text-foreground py-16 md:py-24 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-[6px] border-border/20 rotate-12" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border-[6px] border-border/20 -rotate-12" />
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-primary/5 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-primary rotate-45" />
            <span className="font-mono text-sm font-black uppercase tracking-widest text-muted-foreground">
              Career Path
            </span>
          </div>

          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.9] perspective-1000">
            {splitText('Professional')}
            <br />
            {splitText('Experience')}
          </h2>

          {/* Underline bars */}
          <div className="flex gap-2 mt-6">
            <div className="h-2 w-32 bg-primary" />
            <div className="h-2 w-16 bg-border" />
            <div className="h-2 w-8 bg-border/50" />
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <TimelineConnector height={timelineHeight} />

          {/* Experience cards */}
          <div className="relative space-y-8 md:space-y-12 lg:space-y-16 pl-16 lg:pl-0">
            {!experiences ? (
              // Loading state
              <div className="flex items-center justify-center py-20">
                <div className="border-[4px] border-border bg-muted p-8 shadow-[6px_6px_0_0_var(--border)]">
                  <p className="font-black text-lg uppercase tracking-wider">Loading Experiences...</p>
                </div>
              </div>
            ) : experiences.length === 0 ? (
              // Empty state
              <div className="flex items-center justify-center py-20">
                <div className="border-[4px] border-border bg-muted p-8 shadow-[6px_6px_0_0_var(--border)]">
                  <p className="font-black text-lg uppercase tracking-wider">No experiences found</p>
                </div>
              </div>
            ) : (
              experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience._id}
                  experience={experience}
                  index={index}
                  isLeft={index % 2 === 0}
                  onExpandChange={handleCardExpandChange}
                />
              ))
            )}
          </div>

          {/* Timeline end marker */}
          <motion.div
            className="absolute left-8 lg:left-1/2 -translate-x-1/2 bottom-0 z-20"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring' as const,
              stiffness: 200,
              damping: 15,
              delay: 0.5,
            }}
          >
            <div className="w-8 h-8 bg-primary border-[4px] border-border shadow-lg flex items-center justify-center">
              <IconBriefcase className="h-4 w-4 text-primary-foreground -rotate-45" strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-block border-[6px] border-border bg-muted p-6 md:p-8 shadow-[8px_8px_0_0_var(--border)]">
            <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Want to see more?
            </p>
            <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4">
              Check out my full resume
            </h3>
            <a
              href="/resume"
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-primary text-primary-foreground
                border-[4px] border-border
                font-black uppercase tracking-wide text-sm
                shadow-[4px_4px_0_0_var(--border)]
                hover:shadow-[6px_6px_0_0_var(--border)]
                hover:-translate-x-0.5 hover:-translate-y-0.5
                transition-all
              "
            >
              <IconBriefcase className="h-4 w-4" strokeWidth={2.5} />
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
