'use client';

import { motion } from 'framer-motion';
import { Azeret_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-azeret-mono',
});

export default function WhoAmIHero() {
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
    <section
      className="min-h-screen flex items-center justify-center px-6 lg:px-20 relative"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <div className="border-4 border-border bg-background p-8 md:p-16 shadow-[12px_12px_0px_0px_var(--border)] -rotate-1">
            <h1
              className={cn(
                'text-6xl md:text-9xl font-black mb-6 leading-none tracking-tight',
                azeretMono.className
              )}
            >
              WHO AM I?
            </h1>
            <div className="h-2 w-32 bg-primary mb-6" />
            <p className="text-xl md:text-3xl font-bold max-w-3xl border-l-4 border-primary pl-6">
              A journey through code, creativity, and continuous learning
            </p>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="mt-8 flex gap-4"
        >
          <div className="w-16 h-16 border-4 border-border bg-primary rotate-12" />
          <div className="w-16 h-16 border-4 border-border bg-background -rotate-6" />
          <div className="w-16 h-16 border-4 border-border bg-primary rotate-3" />
        </motion.div>
      </div>
    </section>
  );
}
