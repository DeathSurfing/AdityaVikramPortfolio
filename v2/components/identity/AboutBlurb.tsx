'use client';

import { bioParagraphs } from '@/data/identity';
import { FadeUp } from './motion-primitives';

export default function AboutBlurb() {
  return (
    <section className="flex flex-col gap-4">
      {bioParagraphs.map((segments, i) => (
        <FadeUp
          key={i}
          as="p"
          delay={i + 1}
          className="text-base leading-relaxed text-muted-foreground"
        >
          {segments.map((seg, j) =>
            seg.href ? (
              <a
                key={j}
                href={seg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {seg.text}
              </a>
            ) : (
              <span key={j}>{seg.text}</span>
            ),
          )}
        </FadeUp>
      ))}
    </section>
  );
}
