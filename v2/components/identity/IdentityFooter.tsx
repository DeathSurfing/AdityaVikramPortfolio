'use client';

import { FadeUp } from './motion-primitives';

export default function IdentityFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FadeUp className="border-t border-border">
      <footer className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8 font-mono text-xs text-muted-foreground">
        <span>© 2026 Aditya Vikram</span>
        <div className="flex items-center gap-5">
          <a
            href="/sitemap.xml"
            className="link-sweep relative inline-flex items-center transition-colors hover:text-muted-foreground"
          >
            sitemap
            <span
              aria-hidden
              className="link-sweep-bar absolute -bottom-0.5 left-0 h-px w-full bg-current"
            />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="transition-colors hover:text-muted-foreground"
          >
            top ↑
          </button>
        </div>
      </footer>
    </FadeUp>
  );
}
