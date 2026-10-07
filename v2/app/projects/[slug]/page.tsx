import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getProject, projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { projectJsonLd } from "@/lib/schema"
import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { FadeUp } from "@/components/identity/motion-primitives"

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
    <MotionRoot>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <article className="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-32 pb-20">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h1>
            <FadeUp as="p" className="text-base leading-relaxed text-[#b0b0b0]">
              {project.description}
            </FadeUp>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                // details
              </h2>
              <ul className="flex flex-col gap-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              // at a glance
            </h2>
            <dl className="flex flex-col gap-1.5 font-mono text-xs text-muted-foreground">
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-[#6a6a6a]">status</dt>
                <dd>{project.status}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-[#6a6a6a]">type</dt>
                <dd>{project.type}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-[#6a6a6a]">technologies</dt>
                <dd>{project.technologies.join(", ")}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-[#6a6a6a]">author</dt>
                <dd>
                  <Link href="/" className="underline underline-offset-4">
                    {project.author.name}
                  </Link>
                </dd>
              </div>
            </dl>
          </section>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
            {project.live && (
              <a
                href={project.live}
                target={project.live.startsWith("/") ? undefined : "_blank"}
                rel={project.live.startsWith("/") ? undefined : "noopener noreferrer"}
                className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                live ↗
              </a>
            )}
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                source ↗
              </a>
            )}
            {project.registry && (
              <a
                href={project.registry}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
              >
                registry ↗
              </a>
            )}
            <a
              href={`/projects/${project.slug}`}
              type="text/markdown"
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              markdown
            </a>
          </nav>

          <Link
            href="/projects"
            className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            &larr; all projects
          </Link>
        </article>
        <IdentityFooter />
      </main>
    </MotionRoot>
  )
}
