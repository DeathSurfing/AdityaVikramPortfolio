'use client';

import Link from 'next/link';

import { profile } from '@/data/profile';

export default function IdentityFooter() {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="flex flex-col gap-4">
            <p className="footer-mark" aria-hidden>
              Vikk<span>.</span>
            </p>
            <p className="measure-xs font-mono text-label leading-relaxed text-muted-foreground">
              {profile.title}. {profile.location.city}, {profile.location.country}.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <nav aria-label="Footer" className="footer-meta">
              <Link href="/about" className="footer-link">
                about
              </Link>
              <a href="/api/experience" className="footer-link">
                experience json
              </a>
              <a href="/api/profile" className="footer-link">
                profile json
              </a>
              <a href="/sitemap.xml" className="footer-link">
                sitemap
              </a>
              <button type="button" onClick={scrollToTop} className="footer-link">
                top ↑
              </button>
            </nav>
            <p className="font-mono text-label leading-relaxed text-muted-foreground sm:text-right">
              Built with Next.js and Tailwind.
            </p>
          </div>
        </div>

        <div className="footer-legal">
          <span>© 2026 {profile.name}</span>
          <span>Last updated {profile.updated}</span>
        </div>
      </div>
    </footer>
  );
}
