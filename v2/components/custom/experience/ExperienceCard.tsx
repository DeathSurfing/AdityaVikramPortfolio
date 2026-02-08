'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience, experienceIcons } from '@/data/experiences';
import {
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconChevronDown,
  IconRocket,
  IconTrophy,
  IconCode,
  IconStar,
  IconChevronUp,
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

export default function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const IconCompany = experienceIcons.company;
  const IconLocation = experienceIcons.location;
  const IconDuration = experienceIcons.duration;
  const IconType = experienceIcons.type;

  // Get preview items
  const previewHighlights = experience.highlights.slice(0, 2);
  const previewTechs = experience.technologies.slice(0, 4);
  const remainingTechs = experience.technologies.length - 4;

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
          shadow-[8px_8px_0_0_var(--border)]
          hover:shadow-[6px_6px_0_0_var(--border)]
          hover:translate-x-1 hover:translate-y-1
          transition-all duration-200
          ${index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}
          ${isExpanded ? 'z-30' : 'z-10'}
          group
          pb-16
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
        <div className="border-b-[4px] border-border pb-4 mb-4 mt-2 p-5 md:p-6">
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

        {/* Collapsed Content */}
        <div className="px-5 md:px-6">
          <p className="text-sm md:text-base leading-relaxed mb-4 text-foreground/90 line-clamp-2">
            {experience.description}
          </p>

          {/* Technologies Preview */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <IconCode className="h-4 w-4" strokeWidth={2.5} />
              <h4 className="font-black text-xs uppercase tracking-wider">Technologies</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {previewTechs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 border-[3px] border-border bg-muted text-xs font-black uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
              {remainingTechs > 0 && (
                <span className="px-2.5 py-1 border-[3px] border-border bg-primary text-primary-foreground text-xs font-black uppercase tracking-wide">
                  +{remainingTechs} more
                </span>
              )}
            </div>
          </div>

          {/* Highlights Preview */}
          <div className="border-t-[4px] border-border pt-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <IconStar className="h-4 w-4" strokeWidth={2.5} />
              <h4 className="font-black text-xs uppercase tracking-wider">Key Highlights</h4>
            </div>
            <div className="space-y-2">
              {previewHighlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <Icon className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                    <span className="font-bold leading-tight">{highlight.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t-[6px] border-border bg-muted/20"
            >
              <div className="p-5 md:p-6 space-y-8">
                {/* Full Description */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rotate-45" />
                    <h3 className="text-lg font-black uppercase tracking-wider">Full Overview</h3>
                  </div>
                  <p className="text-base leading-relaxed border-l-[6px] border-primary pl-6 py-2 bg-background p-4 border-[3px] border-border shadow-[4px_4px_0_0_var(--border)]">
                    {experience.description}
                  </p>
                </div>

                {/* All Technologies */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rotate-45" />
                    <IconCode className="h-5 w-5" strokeWidth={2.5} />
                    <h3 className="text-lg font-black uppercase tracking-wider">All Technologies</h3>
                  </div>
                  <div className="border-[4px] border-border bg-background p-4 shadow-[6px_6px_0_0_var(--border)]">
                    <div className="flex flex-wrap gap-3">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 border-[4px] border-border bg-background text-sm font-black uppercase shadow-[3px_3px_0_0_var(--border)] hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* All Achievements */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rotate-45" />
                    <IconTrophy className="h-5 w-5" strokeWidth={2.5} />
                    <h3 className="text-lg font-black uppercase tracking-wider">All Achievements</h3>
                  </div>
                  <div className="border-[4px] border-border bg-background shadow-[6px_6px_0_0_var(--border)]">
                    {experience.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 border-b-[3px] border-border last:border-b-0 hover:bg-primary/5 transition-colors"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-primary border-[3px] border-border flex items-center justify-center text-primary-foreground font-black text-sm shadow-[2px_2px_0_0_var(--border)]">
                          {idx + 1}
                        </span>
                        <span className="text-base font-bold leading-relaxed pt-1">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Highlights */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rotate-45" />
                    <IconStar className="h-5 w-5" strokeWidth={2.5} />
                    <h3 className="text-lg font-black uppercase tracking-wider">All Highlights</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {experience.highlights.map((highlight, idx) => {
                      const Icon = highlight.icon;
                      return (
                        <div
                          key={idx}
                          className="border-[4px] border-border bg-background p-5 shadow-[6px_6px_0_0_var(--border)]"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-2 bg-primary border-[4px] border-border shadow-[3px_3px_0_0_var(--border)]">
                              <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
                            </div>
                            <div>
                              <h4 className="font-black text-base uppercase tracking-wide leading-tight mb-2">
                                {highlight.title}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-snug">
                                {highlight.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t-[4px] border-border pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconRocket className="h-6 w-6 text-primary" strokeWidth={2.5} />
                    <span className="font-black text-base uppercase tracking-wider">
                      Ready for the next challenge
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Large Expand/Collapse Button - Always at bottom right */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            absolute bottom-4 right-4
            flex items-center gap-2
            px-5 py-3
            border-[4px] border-foreground
            bg-primary
            text-primary-foreground
            font-black text-sm uppercase tracking-wider
            shadow-[6px_6px_0_0_var(--foreground)]
            hover:shadow-[3px_3px_0_0_var(--foreground)]
            hover:translate-x-1 hover:translate-y-1
            active:shadow-none
            active:translate-x-1.5 active:translate-y-1.5
            transition-all
            z-20
          "
        >
          <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
          {isExpanded ? (
            <IconChevronUp className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <IconChevronDown className="h-5 w-5" strokeWidth={2.5} />
          )}
        </button>

        {/* Bottom accent bars */}
        <div className="flex h-2">
          <div className="flex-1 bg-foreground" />
          <div className="flex-1 bg-muted" />
          <div className="flex-1 bg-foreground/50" />
        </div>
      </div>
    </motion.div>
  );
}
