import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';

function initials(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase();
}

export default function ProjectCard({
  project,
  variant = 'compact',
  headingLevel = 3,
}: {
  project: Project;
  variant?: 'feature' | 'compact';
  headingLevel?: 2 | 3;
}) {
  const detailHref = `/projects/${project.slug}`;
  const feature = variant === 'feature';
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className={`project-card${feature ? ' project-card--feature' : ' project-card--compact'}`}>
      {feature &&
        (project.image ? (
          <Link
            href={detailHref}
            className="project-media"
            aria-label={`Open ${project.name}`}
            tabIndex={-1}
          >
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 760px) 22rem, 100vw"
              className="object-cover"
              loading="eager"
            />
          </Link>
        ) : (
          <Link
            href={detailHref}
            className="project-monogram"
            aria-label={`Open ${project.name}`}
            tabIndex={-1}
          >
            <span aria-hidden>{initials(project.name)}</span>
          </Link>
        ))}

      <div className="project-card-heading">
        <Heading className="project-card-title">
          <Link href={detailHref}>{project.name}</Link>
        </Heading>
      </div>

      <p className={`project-card-description${feature ? '' : ' line-clamp-2'}`}>
        {project.description}
      </p>

      <p className="project-tech">
        {project.technologies.slice(0, feature ? 4 : 3).join(' · ')}
      </p>

      <div className="project-card-footer">
        <span className="flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target={project.live.startsWith('/') ? undefined : '_blank'}
              rel={project.live.startsWith('/') ? undefined : 'noopener noreferrer'}
              className="action-link"
            >
              live <span className="arrow" aria-hidden>↗</span>
            </a>
          )}
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="action-link"
            >
              source <span className="arrow" aria-hidden>↗</span>
            </a>
          )}
          {project.registry && (
            <a
              href={project.registry}
              target="_blank"
              rel="noopener noreferrer"
              className="action-link"
            >
              registry <span className="arrow" aria-hidden>↗</span>
            </a>
          )}
        </span>
      </div>
    </article>
  );
}
