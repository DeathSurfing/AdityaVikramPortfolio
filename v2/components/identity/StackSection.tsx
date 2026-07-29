'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { stackSummary } from '@/data/identity';
import { skillCategories } from '@/data/skills';
import { EASE, FadeUp, SectionHeading } from './motion-primitives';

export default function StackSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// tools i use</SectionHeading>

      <FadeUp as="p" className="text-base leading-relaxed text-muted-foreground">
        {stackSummary}
      </FadeUp>

      <FadeUp delay={1}>
        <motion.button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-2 self-start font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-expanded={expanded}
        >
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="inline-block"
          >
            +
          </motion.span>
          {expanded ? 'show less' : 'show all'}
        </motion.button>
      </FadeUp>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="stack-grid"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 border-l border-border pl-5">
              {skillCategories.map((category, i) => (
                <motion.div
                  key={category.name}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.06 }}
                >
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
