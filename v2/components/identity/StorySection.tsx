'use client';

import { motion } from 'motion/react';
import { experiences } from '@/data/identity';
import { EASE, FadeUp, SectionHeading } from './motion-primitives';

export default function StorySection() {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// story so far</SectionHeading>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <FadeUp key={exp.company} delay={i}>
            <motion.article
              className="group flex flex-col gap-2 border-b border-[#1f1f1f] py-5 first:pt-0 last:border-b-0"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-medium text-[#e5e5e5]">
                  {exp.role}
                  <span className="text-[#8a8a8a]"> · {exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-[#666]">{exp.duration}</span>
              </div>
              <span className="font-mono text-xs text-[#666]">
                {exp.location} · {exp.type}
              </span>
              <p className="text-sm leading-relaxed text-[#8a8a8a]">{exp.summary}</p>
            </motion.article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
