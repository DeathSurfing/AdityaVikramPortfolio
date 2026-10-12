'use client';

import Link from 'next/link';
import { AnimatedLink } from './motion-primitives';

/**
 * Slim minimal header. The scroll-reactive background and hairline use a CSS
 * scroll-driven animation (`animation-timeline: scroll()`) instead of
 * useScroll/useTransform, so there is no scroll listener and no motion runtime.
 * Browsers without scroll-driven animations simply show the header chrome at
 * full opacity, which is a correct static state.
 */
export default function IdentityHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="scroll-chrome scroll-chrome-bg absolute inset-0 backdrop-blur-md"
        style={{ backgroundColor: '#0a0a0a' }}
      />
      <div className="relative mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-white"
        >
          Vikk<span className="text-muted-foreground">.</span>
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
          <AnimatedLink href="/blog" className="transition-colors hover:text-foreground">
            blog
          </AnimatedLink>
          <AnimatedLink href="/resume" className="transition-colors hover:text-foreground">
            resume
          </AnimatedLink>
        </nav>
      </div>
      <div className="scroll-chrome scroll-chrome-border h-px w-full bg-border" />
    </header>
  );
}
