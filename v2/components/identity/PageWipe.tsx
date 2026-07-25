'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useAnimationControls, useReducedMotion, type Variants } from 'motion/react';
import { lenisStore } from '@/lib/lenis-store';
import { EASE } from './motion-primitives';

/* Greyscale curtain panels — lightest leads the wipe */
const PANELS = ['#e5e5e5', '#b0b0b0', '#8a8a8a', '#5c5c5c', '#333333'];
const STAGGER = 0.045;
const DURATION = 0.35;

const panelVariants: Variants = {
  hidden: { scaleY: 0 },
  cover: (i: number) => ({
    scaleY: 1,
    originY: 1, // rise from the bottom
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
  reveal: (i: number) => ({
    scaleY: 0,
    originY: 0, // lift away toward the top
    transition: {
      duration: DURATION,
      ease: EASE,
      delay: (PANELS.length - 1 - i) * STAGGER,
    },
  }),
};

export default function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const pathnameRef = useRef(pathname);
  const pendingRef = useRef(false);
  const busyRef = useRef(false);
  const [blocking, setBlocking] = useState(false);

  const reveal = () => {
    controls
      .start('reveal')
      .then(() => {
        busyRef.current = false;
        setBlocking(false);
        controls.set('hidden');
      })
      .catch(() => {
        busyRef.current = false;
        setBlocking(false);
      });
  };

  /* Reveal once the new route has mounted */
  useEffect(() => {
    pathnameRef.current = pathname;
    if (pendingRef.current) {
      pendingRef.current = false;
      reveal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Intercept internal link clicks → cover → navigate */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/')) return;

      const url = new URL(href, window.location.origin);
      // Same-path navigations (tag filters, hash) stay wipe-free
      if (url.pathname === pathnameRef.current) return;

      e.preventDefault();
      if (busyRef.current) return;

      if (reduceMotion) {
        router.push(url.pathname + url.search);
        return;
      }

      busyRef.current = true;
      setBlocking(true);
      controls.start('cover').then(() => {
        pendingRef.current = true;
        lenisStore.lenis?.scrollTo(0, { immediate: true });
        router.push(url.pathname + url.search);
        // Safety: if the route never changes, lift the curtain anyway
        setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = false;
            reveal();
          }
        }, 1500);
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, router]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] flex"
      style={{ pointerEvents: blocking ? 'auto' : 'none' }}
    >
      {PANELS.map((color, i) => (
        <motion.div
          key={color}
          className="h-full flex-1"
          style={{ backgroundColor: color }}
          custom={i}
          variants={panelVariants}
          initial="hidden"
          animate={controls}
        />
      ))}
    </motion.div>
  );
}
