import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getProject, projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { projectJsonLd } from "@/lib/schema"
import IdentityFooter from "@/components/identity/IdentityFooter"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
      types: { "text/markdown": `/projects/${project.slug}` },
    },
    openGraph: {
      title: `${project.name} | ${profile.alternateNames[0]}`,
      description: project.description,
      type: "article",
      url: `${profile.url}/projects/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <main id="main" className="page-main">
        <div className="shell page-content">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">home</Link>
            <span className="sep" aria-hidden>/</span>
            <Link href="/projects">projects</Link>
            <span className="sep" aria-hidden>/</span>
            <span>{project.name}</span>
          </nav>

          <header className="mt-8 flex flex-col gap-6 border-b border-line pb-10">
            <h1 className="page-title">{project.name}</h1>
            <p className="lead">{project.description}</p>

            <p className="font-mono text-xs leading-relaxed text-muted-foreground">
              {project.technologies.join(" · ")}
              {" · "}
              <Link href="/" className="link-underline text-foreground">
                {project.author.name}
              </Link>
            </p>

            <nav className="link-row" aria-label="Project links">
              {project.live && (
                <a
                  href={project.live}
                  target={project.live.startsWith("/") ? undefined : "_blank"}
                  rel={project.live.startsWith("/") ? undefined : "noopener noreferrer"}
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
              <a
                href={`/projects/${project.slug}`}
                type="text/markdown"
                className="action-link"
              >
                markdown <span className="arrow" aria-hidden>→</span>
              </a>
            </nav>
          </header>

          {project.image && (
            <div className="project-media mt-10 max-w-3xl">
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                sizes="(min-width: 760px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-12 flex max-w-2xl flex-col gap-8">
            {project.highlights && project.highlights.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="eyebrow">Details</h2>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-body leading-body text-muted-foreground"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link href="/projects" className="action-link">
              <span className="arrow" aria-hidden>←</span> all projects
            </Link>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
