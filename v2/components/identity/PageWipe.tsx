'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/* Greyscale curtain panels — lightest leads the wipe */
const PANELS = ['#e5e5e5', '#b0b0b0', '#8a8a8a', '#5c5c5c', '#333333'];
const STAGGER = 45; // ms, matches the old 0.045s
const DURATION = 350; // ms, matches the old 0.35s

/**
 * Page-transition curtain. Driven by CSS animations on data attributes rather
 * than a motion timeline, so it costs no JS runtime.
 *
 * pruned: the old version drove this with useAnimationControls and awaited
 * each tween. Now it sets a state, lets the CSS animation run, and uses one
 * timeout of the same total duration to know when the curtain is done.
 */
export default function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();

  const pathnameRef = useRef(pathname);
  const pendingRef = useRef(false);
  const busyRef = useRef(false);
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const [blocking, setBlocking] = useState(false);

  /* Reveal once the new route has mounted */
  useEffect(() => {
    pathnameRef.current = pathname;
    if (pendingRef.current) {
      pendingRef.current = false;
      setPhase('reveal');
      const total = DURATION + STAGGER * (PANELS.length - 1);
      window.setTimeout(() => {
        busyRef.current = false;
        setBlocking(false);
        setPhase('idle');
      }, total);
    }
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

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        router.push(url.pathname + url.search);
        return;
      }

      busyRef.current = true;
      setBlocking(true);
      setPhase('cover');

      const total = DURATION + STAGGER * (PANELS.length - 1);
      window.setTimeout(() => {
        pendingRef.current = true;
        window.scrollTo(0, 0);
        router.push(url.pathname + url.search);
        // Safety: if the route never changes, lift the curtain anyway
        window.setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current = false;
            setPhase('reveal');
            window.setTimeout(() => {
              busyRef.current = false;
              setBlocking(false);
              setPhase('idle');
            }, total);
          }
        }, 1500);
      }, total);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex"
      style={{ pointerEvents: blocking ? 'auto' : 'none' }}
    >
      {PANELS.map((color, i) => {
        const delay = `${(phase === 'reveal' ? PANELS.length - 1 - i : i) * STAGGER}ms`;
        return (
          <div
            key={color}
            className="wipe-panel h-full flex-1"
            style={{ backgroundColor: color, animationDelay: delay }}
            data-cover={phase === 'cover'}
            data-reveal={phase === 'reveal'}
          />
        );
      })}
    </div>
  );
}
