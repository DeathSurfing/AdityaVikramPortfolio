'use client';

import { motion } from 'motion/react';
import { lenisStore } from '@/lib/lenis-store';
import { AnimatedLink, FadeUp } from './motion-primitives';

export default function IdentityFooter() {
  const scrollToTop = () => {
    const lenis = lenisStore.lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <FadeUp as="div" className="border-t border-[#1f1f1f]">
      <footer className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8 font-mono text-xs text-[#666]">
        <span>© 2026 Aditya Vikram</span>
        <div className="flex items-center gap-5">
          <AnimatedLink href="/sitemap.xml" className="transition-colors hover:text-[#b0b0b0]">
            sitemap
          </AnimatedLink>
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-colors hover:text-[#b0b0b0]"
          >
            top ↑
          </motion.button>
        </div>
      </footer>
    </FadeUp>
  );
}
