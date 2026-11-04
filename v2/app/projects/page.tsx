import Link from "next/link"
import type { Metadata } from "next"

import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { projectsIndexJsonLd } from "@/lib/schema"
import IdentityFooter from "@/components/identity/IdentityFooter"
import ProjectCard from "@/components/identity/ProjectCard"

export const metadata: Metadata = {
  title: `Projects`,
  description: `Open source tools and products by ${profile.name}: ${projects
    .map((p) => p.name)
    .join(", ")}.`,
  alternates: {
    canonical: "/projects",
    types: { "text/markdown": "/projects" },
  },
}

export default function ProjectsPage() {
  const featured = projects.filter((project) => Boolean(project.image))
  const remaining = projects.filter((project) => !project.image)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsIndexJsonLd()) }}
      />
      <main id="main" className="page-main">
        <div className="shell page-content">
          <header className="flex flex-col gap-5 border-b border-line pb-10">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">home</Link>
              <span className="sep" aria-hidden>/</span>
              <span>projects</span>
            </nav>

            <h1 id="projects-title" className="page-title">
              <span className="sr-only">{"// "}</span>projects
              <span className="sr-only"> by {profile.alternateNames[0]}</span>
            </h1>

            <p className="lead">
              Open source tools and digital products. Each project has a
              permanent page at its own URL.
            </p>
          </header>

          <div className="mt-10 flex flex-col gap-8">
            {featured.length > 0 && (
              <div className="project-feature-list">
                {featured.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="feature"
                    headingLevel={2}
                  />
                ))}
              </div>
            )}

            <div className="project-grid">
              {remaining.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  headingLevel={2}
                />
              ))}
            </div>

            <Link href="/" className="action-link">
              <span className="arrow" aria-hidden>←</span> home
            </Link>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
