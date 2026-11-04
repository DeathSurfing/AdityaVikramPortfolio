import Link from "next/link"
import type { Metadata } from "next"

import { experiences } from "@/data/identity"
import { skillCategories } from "@/data/skills"
import { profile } from "@/data/profile"
import { experienceJsonLd } from "@/lib/schema"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { Section } from "@/components/identity/Section"

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd()) }}
      />
      <main id="main" className="page-main">
        <div className="shell page-content">
          <header className="flex flex-col gap-5 border-b border-line pb-10">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">home</Link>
              <span className="sep" aria-hidden>/</span>
              <span>experience</span>
            </nav>

            <h1 className="page-title">
              <span className="sr-only">{"// "}</span>experience
              <span className="sr-only"> - {profile.name}</span>
            </h1>

            <p className="lead">
              {profile.name} is a {profile.title} based in{" "}
              {profile.location.city}, {profile.location.country}. Roles in
              order, most recent first.
            </p>

            <div className="link-row">
              <Link href="/resume" className="action-link">
                resume <span className="arrow" aria-hidden>→</span>
              </Link>
            </div>
          </header>

          <div className="mt-12 flex flex-col">
            <Section label="// roles">
              <div className="timeline">
                {experiences.map((exp) => (
                  <article key={`${exp.role}-${exp.company}`} className="timeline-row">
                    <div className="timeline-meta">
                      <span className="block text-foreground">{exp.duration}</span>
                      <span className="mt-1 block">{exp.company}</span>
                      <span className="mt-1 block">{exp.location}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="timeline-role">{exp.role}</h3>
                      <p className="timeline-summary">{exp.summary}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section label="// skills">
              <div className="skill-grid">
                {skillCategories.map((category) => (
                  <article key={category.name} className="skill-block">
                    <h3 className="skill-name">{category.name}</h3>
                    <p className="skill-list">{category.skills.join(" · ")}</p>
                    <div className="skill-evidence">
                      {category.evidence.map((item) => (
                        <Link key={item.href} href={item.href}>
                          {item.label} <span aria-hidden>→</span>
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
