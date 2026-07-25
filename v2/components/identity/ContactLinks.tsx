'use client';

import { ctaLine } from '@/data/identity';
import { socialLinks } from '@/data/social';
import { FadeUp, AnimatedLink } from './motion-primitives';

export default function ContactLinks() {
  return (
    <section className="flex flex-col gap-5">
      <FadeUp as="p" className="text-lg font-medium tracking-tight text-[#e5e5e5]">
        {ctaLine}
      </FadeUp>
      <FadeUp delay={1}>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {socialLinks.map(({ name, icon: Icon, url }) => {
            const external = !url.startsWith('/');
            return (
              <li key={name}>
                <AnimatedLink
                  href={url}
                  external={external}
                  className="flex items-center gap-2 font-mono text-sm text-[#8a8a8a] transition-colors hover:text-[#e5e5e5]"
                >
                  <Icon className="size-3.5" />
                  {name}
                </AnimatedLink>
              </li>
            );
          })}
        </ul>
      </FadeUp>
    </section>
  );
}
