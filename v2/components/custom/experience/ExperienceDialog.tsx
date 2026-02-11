'use client';

import { useEffect } from 'react';
import { DBExperience, experienceIcons, getIconByName } from '@/lib/experience-utils';
import { lenisStore } from '@/lib/lenis-store';
import {
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconX,
  IconRocket,
  IconTrophy,
  IconCode,
  IconStar,
} from '@tabler/icons-react';

interface ExperienceDialogProps {
  experience: DBExperience | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceDialog({ experience, isOpen, onClose }: ExperienceDialogProps) {
  useEffect(() => {
    if (isOpen) {
      // Stop Lenis
      const lenis = lenisStore.lenis;
      if (lenis) lenis.stop();
      
      // Lock body
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      };
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !experience) return null;

  const IconType = experienceIcons.type;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal - uses native browser scroll */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 pt-10">
          <div 
            className="relative w-full max-w-4xl bg-background border-[6px] border-foreground shadow-[12px_12px_0_0_var(--foreground)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 border-[4px] border-foreground bg-background hover:bg-primary hover:text-primary-foreground shadow-[4px_4px_0_0_var(--foreground)]"
            >
              <IconX className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="border-b-[6px] border-foreground pb-6 mb-6">
                <div className="inline-block mb-4">
                  <div className="bg-primary border-[4px] border-foreground px-4 py-2 shadow-[4px_4px_0_0_var(--foreground)]">
                    <span className="text-sm font-black uppercase text-primary-foreground flex items-center gap-2">
                      <IconType className="h-4 w-4" strokeWidth={2.5} />
                      {experience.type}
                    </span>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">
                  {experience.title}
                </h2>

                <div className="flex flex-wrap gap-4 mt-4 text-base font-bold">
                  <div className="flex items-center gap-2 border-[3px] border-foreground px-3 py-2 shadow-[3px_3px_0_0_var(--foreground)]">
                    <IconBuilding className="h-5 w-5 text-primary" strokeWidth={2.5} />
                    {experience.company}
                  </div>
                  <div className="flex items-center gap-2 border-[3px] border-foreground px-3 py-2 shadow-[3px_3px_0_0_var(--foreground)]">
                    <IconMapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-2 border-[3px] border-foreground px-3 py-2 shadow-[3px_3px_0_0_var(--foreground)]">
                    <IconCalendar className="h-5 w-5 text-primary" strokeWidth={2.5} />
                    {experience.duration}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rotate-45" />
                  <h3 className="text-xl font-black uppercase">Overview</h3>
                </div>
                <p className="text-lg leading-relaxed border-l-[6px] border-primary pl-6">
                  {experience.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rotate-45" />
                  <IconCode className="h-5 w-5" strokeWidth={2.5} />
                  <h3 className="text-xl font-black uppercase">Technologies</h3>
                </div>
                <div className="border-[4px] border-foreground p-4 shadow-[6px_6px_0_0_var(--foreground)]">
                  <div className="flex flex-wrap gap-3">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 border-[4px] border-foreground bg-background text-sm font-black uppercase shadow-[3px_3px_0_0_var(--foreground)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rotate-45" />
                  <IconTrophy className="h-5 w-5" strokeWidth={2.5} />
                  <h3 className="text-xl font-black uppercase">Key Achievements</h3>
                </div>
                <div className="border-[4px] border-foreground shadow-[6px_6px_0_0_var(--foreground)]">
                  {experience.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 border-b-[3px] border-foreground last:border-b-0"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-primary border-[3px] border-foreground flex items-center justify-center text-primary-foreground font-black shadow-[2px_2px_0_0_var(--foreground)]">
                        {idx + 1}
                      </span>
                      <span className="text-base font-bold leading-relaxed pt-1">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rotate-45" />
                  <IconStar className="h-5 w-5" strokeWidth={2.5} />
                  <h3 className="text-xl font-black uppercase">Highlights</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experience.highlights.map((highlight, idx) => {
                    const Icon = getIconByName(highlight.iconName);
                    return (
                      <div
                        key={idx}
                        className="border-[4px] border-foreground p-5 shadow-[6px_6px_0_0_var(--foreground)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary border-[4px] border-foreground shadow-[3px_3px_0_0_var(--foreground)]">
                            <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="font-black text-base uppercase mb-2">{highlight.title}</h4>
                            <p className="text-sm text-muted-foreground">{highlight.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-[6px] border-foreground pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IconRocket className="h-6 w-6 text-primary" strokeWidth={2.5} />
                  <span className="font-black text-lg uppercase">Ready for the next challenge</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-8 py-3 border-[4px] border-foreground bg-primary text-primary-foreground font-black uppercase shadow-[6px_6px_0_0_var(--foreground)] hover:shadow-[3px_3px_0_0_var(--foreground)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  CLOSE VIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
