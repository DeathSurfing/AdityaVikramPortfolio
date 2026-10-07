'use client';

import type { ReactNode } from 'react';

/* Shared easing — soft ease-out used across the identity page. Kept as a CSS
   custom property so the same curve is used everywhere. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// pruned: the reveal-on-scroll animation is now CSS-driven. Elements start
// hidden and the `is-visible` class (added by the observer in MotionRoot)
// fades them in. One shared observer replaces one motion instance per element.

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'p' | 'header' | 'article' | 'h1' | 'h2' | 'h3';
}

/** Fade + rise into view once, when scrolled into the viewport. */
export function FadeUp({ children, delay = 0, className, as = 'div' }: FadeUpProps) {
  const Tag = as;
  return (
    <Tag
      className={`fade-up${className ? ` ${className}` : ''}`}
      style={delay ? ({ '--fade-delay': `${delay * 80}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Small mono section label, e.g. "// story so far". */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <FadeUp as="h2">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {children}
      </span>
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

/** Text link with an underline sweep on hover, driven by CSS. */
export function AnimatedLink({ href, children, className, external, download }: AnimatedLinkProps) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`link-sweep relative inline-flex items-center ${className ?? ''}`}
    >
      {children}
      <span
        aria-hidden
        className="link-sweep-bar absolute -bottom-0.5 left-0 h-px w-full bg-current"
      />
    </a>
  );
}
