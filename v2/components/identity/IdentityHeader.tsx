'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedLink } from './motion-primitives';

/** Slim minimal header — landing page only. */
export default function IdentityHeader() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 48], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 48], [0, 0.8]);

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          opacity: bgOpacity,
          backgroundColor: '#0a0a0a',
        }}
      />
      <div className="relative mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-[#e5e5e5] transition-colors hover:text-white"
        >
          aditya<span className="text-[#8a8a8a]">.</span>
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs text-[#8a8a8a]">
          <AnimatedLink href="/blog" className="transition-colors hover:text-[#e5e5e5]">
            blog
          </AnimatedLink>
          <AnimatedLink href="/resume" className="transition-colors hover:text-[#e5e5e5]">
            resume
          </AnimatedLink>
        </nav>
      </div>
      <motion.div
        className="h-px w-full bg-[#1f1f1f]"
        style={{ opacity: borderOpacity }}
      />
    </motion.header>
  );
}
