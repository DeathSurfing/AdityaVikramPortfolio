'use client';

import { motion } from 'framer-motion';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export default function WhoAmITestimonials() {
  // Fetch testimonials from Convex
  const convexTestimonials = useQuery(api.projects.getTestimonials, { limit: 50 });

  // Map Convex data to component format
  const testimonials: Testimonial[] = convexTestimonials?.map((t: Doc<'testimonials'>) => ({
    quote: t.quote,
    name: t.name,
    designation: t.designation,
    src: t.src,
  })) ?? [];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-20 py-20 relative bg-background">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
          className="mb-16"
        >
          <div className="border-4 border-border bg-primary p-6 shadow-[8px_8px_0px_0px_var(--border)] inline-block -rotate-1">
            <h2 className="text-4xl md:text-6xl font-black text-background">
              WHAT PEOPLE SAY
            </h2>
          </div>

          <div className="mt-6 h-2 bg-border w-full" />
        </motion.div>

        <div className="border-4 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--primary)]">
          <AnimatedTestimonials
            testimonials={testimonials}
          />
        </div>
      </div>
    </section>
  );
}
