'use client';

import Link from 'next/link';
import ProfileBio from './ProfileBio';
import { FadeUp } from './motion-primitives';

export default function AboutBlurb() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
        {`// about`}
      </h2>
      <ProfileBio />
      <FadeUp delay={4}>
        <Link
          href="/about"
          className="font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
        >
          more about me →
        </Link>
      </FadeUp>
    </section>
  );
}
