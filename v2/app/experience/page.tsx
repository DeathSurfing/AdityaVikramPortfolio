import Link from "next/link"
import type { Metadata } from "next"

import { experiences } from "@/data/identity"
import { skillCategories } from "@/data/skills"
import { profile } from "@/data/profile"
import { experienceJsonLd } from "@/lib/schema"
import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { FadeUp } from "@/components/identity/motion-primitives"

export const metadata: Metadata = {
  title: "Experience",
  description: `Work experience of ${profile.name}: ${experiences
    .map((exp) => `${exp.role} at ${exp.company}`)
    .join(", ")}.`,
  alternates: {
    canonical: "/experience",
    types: {
      "text/markdown": "/experience",
      "application/json": "/api/experience",
    },
  },
}

export default function ExperiencePage() {
  return (
    <MotionRoot>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd()) }}
      />
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 pt-32 pb-20">
          <div className="flex flex-col gap-5">
            <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              // experience - {profile.alternateNames[0]}
            </h1>
            <FadeUp as="p" className="text-base leading-relaxed text-[#b0b0b0]">
              {profile.name} is a {profile.title.toLowerCase()} based in{" "}
              {profile.location.city}, {profile.location.country}. Roles in
              order, most recent first.
            </FadeUp>
          </div>

          <section className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <FadeUp key={`${exp.role}-${exp.company}`} delay={i}>
                <article className="flex flex-col gap-2">
                  <h2 className="text-base font-medium text-foreground">
                    {exp.role}
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    {exp.company} · {exp.duration} · {exp.location} · {exp.type}
                  </p>
                  <p className="text-sm leading-relaxed text-[#b0b0b0]">
                    {exp.summary}
                  </p>
                </article>
              </FadeUp>
            ))}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              // skills
            </h2>
            <ul className="flex flex-col gap-2">
              {skillCategories.map((category) => (
                <li key={category.name} className="text-sm text-[#b0b0b0]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#6a6a6a]">
                    {category.name}
                  </span>
                  <br />
                  {category.skills.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
            <a
              href="/api/experience"
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              experience JSON
            </a>
            <a
              href="/api/profile"
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              profile JSON
            </a>
            <Link
              href="/resume"
              className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              resume
            </Link>
          </nav>

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
