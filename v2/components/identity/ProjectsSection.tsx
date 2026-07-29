'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { selectedProjects, type SelectedProject } from '@/data/identity';
import { EASE, FadeUp, SectionHeading } from './motion-primitives';

function StatusBadge({ status }: { status: SelectedProject['status'] }) {
  return (
    <span className="flex items-center gap-1.5 rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
      <motion.span
        className="inline-block size-1 rounded-full bg-muted-foreground"
        animate={status === 'building' ? { opacity: [1, 0.25, 1] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {status}
    </span>
  );
}

function ProjectRow({ project, index }: { project: SelectedProject; index: number }) {
  return (
    <FadeUp delay={index}>
      <motion.article
        className="group flex gap-4 rounded-md border border-transparent p-3 -mx-3 transition-colors duration-[250ms] hover:border-border hover:bg-card"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        {project.image && (
          <div className="relative mt-1 hidden size-16 shrink-0 overflow-hidden rounded-sm border border-border sm:block">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="64px"
              className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-medium text-foreground">{project.name}</h3>
            <StatusBadge status={project.status} />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5">
            <span className="font-mono text-xs text-muted-foreground">
              {project.tags.join(' · ')}
            </span>
            {(project.live || project.github) && (
              <span className="flex items-center gap-3 font-mono text-xs">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    live ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    github ↗
                  </a>
                )}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </FadeUp>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="flex flex-col gap-5">
      <SectionHeading>// selected projects</SectionHeading>

      <div className="flex flex-col gap-2">
        {selectedProjects.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
