'use client';

import { motion } from 'framer-motion';
import { Azeret_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import BlurVignette from '@/components/ui/blur-vignette';

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-azeret-mono',
});

export default function WhoAmIPage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.23, 1, 0.32, 1] as any,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-20 relative">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <div className="border-4 border-border bg-background p-8 md:p-16 shadow-[12px_12px_0px_0px_var(--border)] transform -rotate-1">
              <h1
                className={cn(
                  "text-6xl md:text-9xl font-black text-foreground mb-6 leading-none tracking-tight",
                  azeretMono.className
                )}
              >
                WHO AM I?
              </h1>
              <div className="h-2 w-32 bg-primary mb-6" />
              <p className="text-xl md:text-3xl font-bold text-foreground max-w-3xl border-l-4 border-primary pl-6">
                A journey through code, creativity, and continuous learning
              </p>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="mt-8 flex gap-4"
          >
            <div className="w-16 h-16 border-4 border-border bg-primary transform rotate-12" />
            <div className="w-16 h-16 border-4 border-border bg-background transform -rotate-6" />
            <div className="w-16 h-16 border-4 border-border bg-primary transform rotate-3" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
            >
              <div className="border-4 border-border bg-background p-8 shadow-[8px_8px_0px_0px_var(--border)]">
                <div className="inline-block px-4 py-2 bg-primary border-4 border-border mb-6 font-black text-2xl text-background shadow-[4px_4px_0px_0px_var(--border)]">
                  THE STORY
                </div>

                <div className="space-y-6">
                  <p className="text-lg font-bold text-foreground leading-relaxed border-l-4 border-border pl-6">
                    I&apos;m a passionate developer who believes in building experiences that matter.
                    My journey started with curiosity and has evolved into a dedication to crafting
                    digital solutions that make a difference.
                  </p>
                  
                  <div className="h-1 bg-border w-full" />
                  
                  <p className="text-lg font-bold text-foreground leading-relaxed border-l-4 border-primary pl-6">
                    Every line of code I write is an opportunity to solve problems,
                    create beauty, and push the boundaries of what&apos;s possible on the web.
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-8 flex gap-2">
                  <div className="h-3 flex-1 bg-primary" />
                  <div className="h-3 flex-1 bg-border" />
                  <div className="h-3 flex-1 bg-primary" />
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
              className="h-full w-full flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Image container with brutalist frame */}
                <div className="border-8 border-border bg-primary p-3 shadow-[16px_16px_0px_0px_var(--border)] transform rotate-2">
                  <div className="w-72 h-72 md:w-96 md:h-96 border-4 border-background overflow-hidden">
                    <BlurVignette>
                      <img
                        src="/AdityaVikram.webp"
                        alt="Aditya Vikram"
                        className="w-full h-full object-cover"
                      />
                    </BlurVignette>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-4 border-border bg-background transform -rotate-12" />
                <div className="absolute -top-4 -right-4 w-16 h-16 border-4 border-border bg-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-20 py-20 relative">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
            className="mb-16"
          >
            <div className="border-4 border-border bg-primary p-6 shadow-[8px_8px_0px_0px_var(--border)] inline-block transform -rotate-1">
              <h2 className="text-4xl md:text-6xl font-black text-background">
                WHAT PEOPLE SAY
              </h2>
            </div>
            
            {/* Decorative line */}
            <div className="mt-6 h-2 bg-border w-full" />
          </motion.div>

          {/* Testimonials Container */}
          <div className="border-4 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--primary)]">
            <AnimatedTestimonials
              testimonials={[
                {
                  quote: "Aditya is one of the most creative indivdiuals I've worked with.",
                  name: "G. Lohith Reddy",
                  designation: "General Secretary at Woxsen University Student Council",
                  src: "/testimonials/Lohith.webp",
                },
                {
                  quote: "His problem-solving skills and UI sense are top-notch.",
                  name: "Melvin Johnson",
                  designation: "Intern at AI Research Center Woxsen University",
                  src: "/testimonials/melvin.webp",
                },
                {
                  quote: "He blends design and code like an artist.",
                  name: "Mitansh Seghal",
                  designation: "Software Engineer",
                  src: "/testimonials/mitansh.webp",
                },
              ]}
            />
          </div>

          {/* Bottom decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex justify-end gap-4"
          >
            <div className="w-12 h-12 border-4 border-border bg-primary transform rotate-45" />
            <div className="w-12 h-12 border-4 border-border bg-background transform -rotate-12" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}