'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience, experienceIcons } from '@/data/experiences';
import {
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconBriefcase,
  IconChevronDown,
} from '@tabler/icons-react';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

const cardVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const highlightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
    },
  }),
};

export default function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  const IconCompany = experienceIcons.company;
  const IconLocation = experienceIcons.location;
  const IconDuration = experienceIcons.duration;
  const IconType = experienceIcons.type;

  return (
    <motion.div
      className={`relative w-full lg:w-[45%] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
      custom={isLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
    >
      {/* Timeline connector dot */}
      <div
        className={`absolute top-12 hidden lg:block ${
          isLeft ? '-right-[12.5%]' : '-left-[12.5%]'
        } z-20`}
      >
        <div className="relative">
          <div className="w-6 h-6 bg-primary border-[4px] border-border rotate-45 shadow-md" />
          <div className="absolute inset-0 w-6 h-6 bg-primary-foreground border-[4px] border-border rotate-45 scale-50" />
        </div>
      </div>

      {/* Mobile timeline dot */}
      <div className="absolute left-0 top-12 lg:hidden z-20 -translate-x-[calc(50%+16px)]">
        <div className="relative">
          <div className="w-5 h-5 bg-primary border-[3px] border-border rotate-45 shadow-sm" />
          <div className="absolute inset-0 w-5 h-5 bg-primary-foreground border-[3px] border-border rotate-45 scale-50" />
        </div>
      </div>

      {/* Main card */}
      <div
        className={`
          relative
          border-[6px] border-border
          bg-background
          p-5 md:p-6
          shadow-[8px_8px_0_0_var(--border)]
          hover:shadow-[6px_6px_0_0_var(--border)]
          hover:translate-x-1 hover:translate-y-1
          transition-all duration-200
          ${index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}
          group
        `}
      >
        {/* Type badge */}
        <div className="absolute -top-3 left-6">
          <div className="bg-primary border-[4px] border-border px-3 py-1 shadow-sm">
            <span className="text-xs font-black uppercase tracking-wider text-primary-foreground flex items-center gap-1.5">
              <IconType className="h-3 w-3" strokeWidth={2.5} />
              {experience.type}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b-[4px] border-border pb-4 mb-4 mt-2">
          <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight leading-tight">
            {experience.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <IconCompany className="h-4 w-4" strokeWidth={2.5} />
              <span className="font-mono font-bold">{experience.company}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-border rotate-45" />
            <div className="flex items-center gap-1.5">
              <IconLocation className="h-4 w-4" strokeWidth={2.5} />
              <span className="font-mono">{experience.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-sm font-mono text-muted-foreground">
            <IconDuration className="h-4 w-4" strokeWidth={2.5} />
            <span>{experience.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed mb-4 text-foreground/90">
          {experience.description}
        </p>

        {/* Achievements */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rotate-45" />
            <h4 className="font-black text-sm uppercase tracking-wider">Key Achievements</h4>
          </div>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-border mt-2 rotate-45" />
                <span className="leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rotate-45" />
            <h4 className="font-black text-sm uppercase tracking-wider">Technologies</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-2.5 py-1
                  border-[3px] border-border
                  bg-muted
                  text-xs font-black uppercase tracking-wide
                  hover:bg-primary hover:text-primary-foreground
                  hover:border-foreground
                  transition-colors
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="border-t-[4px] border-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rotate-45" />
            <h4 className="font-black text-sm uppercase tracking-wider">Highlights</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experience.highlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={highlightVariants}
                  className="
                    border-[4px] border-border
                    bg-muted/50
                    p-3
                    hover:bg-muted
                    hover:border-foreground
                    transition-colors
                    group/highlight
                  "
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-1.5 bg-primary border-[3px] border-border">
                      <Icon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-black text-xs uppercase tracking-wide leading-tight">
                        {highlight.title}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
