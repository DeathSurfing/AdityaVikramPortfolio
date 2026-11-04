import Link from 'next/link';

import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { Section } from './Section';

export default function ProjectsSection() {
  const featured = projects.filter((project) => Boolean(project.image));
  const remaining = projects.filter((project) => !project.image);
  const visible = remaining.slice(0, 4);
  const extra = remaining.slice(4);

  return (
    <Section id="projects" label="// selected projects">
      <div className="flex flex-col gap-8">
        {featured.length > 0 && (
          <div className="project-feature-list">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="feature"
              />
            ))}
          </div>
        )}

        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>

        {extra.length > 0 && (
          <details className="more-block">
            <summary>more projects ({extra.length})</summary>
            <div className="project-grid mt-4">
              {extra.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </details>
        )}

        <Link href="/projects" className="action-link">
          all projects <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  );
}
