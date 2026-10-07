'use client';

import { useState } from 'react';
import { stackSummary } from '@/data/identity';
import { skillCategories } from '@/data/skills';
import { FadeUp, SectionHeading } from './motion-primitives';

// pruned: was AnimatePresence with an animated height:auto and staggered
// item fades. The drawer now animates grid-template-rows 0fr -> 1fr in CSS,
// which needs no height measurement and no runtime.
export default function StackSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// tools i use</SectionHeading>

      <FadeUp as="p" className="text-base leading-relaxed text-muted-foreground">
        {stackSummary}
      </FadeUp>

      <FadeUp delay={1}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="group flex items-center gap-2 self-start font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-expanded={expanded}
          aria-controls="stack-drawer"
        >
          <span className="stack-plus" data-open={expanded} aria-hidden>
            +
          </span>
          {expanded ? 'show less' : 'show all'}
        </button>
      </FadeUp>

      <div id="stack-drawer" className="stack-drawer" data-open={expanded}>
        <div>
          <div className="flex flex-col gap-5 border-l border-border pl-5">
            {skillCategories.map((category) => (
              <div key={category.name} className="flex flex-col gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {category.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm border border-border bg-card px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
