import Link from "next/link"
import type { Metadata } from "next"

import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { projectsIndexJsonLd } from "@/lib/schema"
import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { FadeUp } from "@/components/identity/motion-primitives"

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
  return (
    <MotionRoot>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsIndexJsonLd()) }}
      />
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-32 pb-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              // projects by {profile.alternateNames[0]}
            </h1>
            <FadeUp as="p" className="text-base leading-relaxed text-[#b0b0b0]">
              Open source tools and digital products. Each project has a
              permanent page at its own URL.
            </FadeUp>
          </div>

          <div className="flex flex-col gap-2">
            {projects.map((project, i) => (
              <FadeUp key={project.slug} delay={i}>
                <article className="flex flex-col gap-1.5 rounded-md border border-transparent p-3 -mx-3 transition-colors hover:border-border hover:bg-card">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-base font-medium text-foreground">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors hover:text-[#b0b0b0]"
                      >
                        {project.name}
                      </Link>
                    </h2>
                    <span className="rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.technologies.join(" · ")}
                  </span>
                </article>
              </FadeUp>
            ))}
          </div>

          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            &larr; home
          </Link>
        </div>
        <IdentityFooter />
      </main>
    </MotionRoot>
  )
}
