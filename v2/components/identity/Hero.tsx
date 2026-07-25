'use client';

import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { heroCopy } from '@/data/identity';
import { EASE } from './motion-primitives';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

export default function Hero() {
  const words = heroCopy.greeting.split(' ');

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-5 sm:gap-6">
        <motion.div
          className="size-14 shrink-0 overflow-hidden rounded-full border border-[#262626] grayscale transition-all duration-500 hover:grayscale-0 sm:size-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Image
            src="/AdityaVikram.webp"
            alt="Aditya Vikram"
            width={64}
            height={64}
            priority
            className="size-full object-cover"
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-semibold tracking-tight text-[#e5e5e5] sm:text-5xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className="mr-[0.28em] inline-block last:mr-0"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        className="flex items-center gap-3 font-mono text-sm text-[#8a8a8a]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
      >
        <span>{heroCopy.role}</span>
        <span aria-hidden className="text-[#3a3a3a]">
          ·
        </span>
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block size-1.5 rounded-full bg-[#a3a3a3]"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {heroCopy.status}
        </span>
      </motion.div>
    </section>
  );
}
