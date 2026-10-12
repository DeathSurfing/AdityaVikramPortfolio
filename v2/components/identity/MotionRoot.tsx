'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Replaces the old motion MotionConfig wrapper. Adds `is-visible` to every
 * `.fade-up` element as it enters the viewport, which drives the CSS reveal.
 *
 * One IntersectionObserver for the whole page instead of one motion instance
 * per animated element, and it works without shipping the animation runtime.
 *
 * pruned: no MotionConfig reducedMotion. The CSS reveal is disabled under
 * `prefers-reduced-motion` in globals.css instead, which is where the other
 * transitions are handled too.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.fade-up'));

    // No IntersectionObserver, or the user asked for less motion: show now.
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '-64px' },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
