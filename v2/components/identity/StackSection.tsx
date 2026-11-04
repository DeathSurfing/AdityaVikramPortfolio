import Link from 'next/link';

import { stackSummary } from '@/data/identity';
import { skillCategories } from '@/data/skills';
import { Section } from './Section';

export default function StackSection() {
  return (
    <Section label="// tools i use">
      <div className="flex flex-col gap-6">
        <p className="body-text">{stackSummary}</p>
        <p className="text-body-sm leading-relaxed text-muted-foreground">
          Each group links to a shipped artifact, so you can check depth instead
          of taking the label at face value.
        </p>

        <div className="skill-grid">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-block">
              <h3 className="skill-name">{category.name}</h3>
              <p className="skill-list">{category.skills.join(' · ')}</p>
              <div className="skill-evidence">
                {category.evidence.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label} <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
