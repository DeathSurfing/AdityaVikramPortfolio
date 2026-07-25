'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/* Shared easing — soft ease-out used across the identity page */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.08 },
  }),
};

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'p' | 'header' | 'article';
}

/** Fade + rise into view once, when scrolled into the viewport. */
export function FadeUp({ children, delay = 0, className, as = 'div' }: FadeUpProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Tag>
  );
}

/** Small mono section label, e.g. "// story so far". */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <FadeUp>
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
        {children}
      </h2>
    </FadeUp>
  );
}

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean | string;
}

/** Text link with a motion-driven underline sweep on hover. */
export function AnimatedLink({ href, children, className, external, download }: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`relative inline-flex items-center ${className ?? ''}`}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      animate="rest"
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full bg-current"
        variants={{
          rest: { scaleX: 0, originX: 0 },
          hover: { scaleX: 1, originX: 0 },
        }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </motion.a>
  );
}
