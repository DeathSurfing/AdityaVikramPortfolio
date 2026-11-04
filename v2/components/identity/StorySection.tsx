import Link from 'next/link';

import { experiences } from '@/data/identity';
import { Section } from './Section';

export default function StorySection() {
  return (
    <Section label="// experience">
      <div className="flex flex-col gap-6">
        <div className="timeline">
          {experiences.slice(0, 3).map((exp) => (
            <article key={`${exp.role}-${exp.company}`} className="timeline-row">
              <div className="timeline-meta">
                <span className="block text-foreground">{exp.duration}</span>
                <span className="mt-1 block">{exp.location}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="timeline-role">
                  {exp.role}
                  <span className="text-muted-foreground"> · {exp.company}</span>
                </h3>
                <p className="timeline-summary">{exp.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <Link href="/experience" className="action-link">
          all roles and systems <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  );
}
