import { skillCategories } from "@/data/skills"
import { bioParagraphs, experiences } from "@/data/identity"
import { profile } from "@/data/profile"
import { getProject, projects, type Project } from "@/data/projects"
import { getAllPosts, getPostBody, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { siteConfig } from "@/data/site"

// Every markdown/text representation the site exposes is rendered here, from
// the canonical data modules. Nothing restates a fact by hand.
//
// Consumed by middleware.ts (markdown content negotiation) and the /llms.txt
// and /llms-full.txt routes.

// Links are flattened to text in the bio: the HTML site is a client-heavy
// React tree, and flattening leaves no anchor values to resolve.
function inline(segments: { text: string }[]): string {
  return segments.map((seg) => seg.text).join("")
}

export function projectLinks(project: Project): string {
  const links = [
    project.live && `[live](${project.live})`,
    project.repository && `[repository](${project.repository})`,
    project.registry && `[registry](${project.registry})`,
  ].filter(Boolean)

  return links.length > 0 ? ` Links: ${links.join(", ")}` : ""
}

export function experienceMarkdown(): string {
  return experiences
    .map(
      (exp) =>
        `### ${exp.role} - ${exp.company}\n\n${exp.duration} · ${exp.location} · ${exp.type}\n\n${exp.summary}`,
    )
    .join("\n\n")
}

export function experiencePageMarkdown(): string {
  return `# Experience - ${profile.name}

${profile.name} is a ${profile.title.toLowerCase()} based in ${profile.location.city}, ${profile.location.country}. Roles in order, most recent first.

${experienceMarkdown()}

## Skills

${skillsMarkdown()}

## Contact

${contactMarkdown()}

Source: ${siteConfig.url}/experience
`
}

function skillsMarkdown(): string {
  return skillCategories
    .map((cat) => `- **${cat.name}:** ${cat.skills.join(", ")}`)
    .join("\n")
}

function projectsMarkdown(): string {
  return projects
    .map(
      (p) =>
        `- [${p.name}](${siteConfig.url}/projects/${p.slug}) - ${p.description}${projectLinks(p)}`,
    )
    .join("\n")
}

function postsMarkdown(): string {
  return getAllPosts()
    .map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}) - ${p.description}`)
    .join("\n")
}

function contactMarkdown(): string {
  return `- Email: ${profile.email}
- GitHub: ${profile.sameAs[0]}
- LinkedIn: ${profile.sameAs[1]}
- Substack: ${profile.sameAs[2]}
- Resume (PDF): ${siteConfig.url}/resume`
}

export function homeMarkdown(): string {
  const bio = bioParagraphs.map(inline).join("\n\n")

  return `# ${profile.headline}

${bio}

## Work

${experienceMarkdown()}

## Projects

${projectsMarkdown()}

## Skills

${skillsMarkdown()}

## Writing

${postsMarkdown()}

## Contact

${contactMarkdown()}

Source of truth: ${profile.url}
`
}

export function projectMarkdown(slug: string): string | null {
  const project = getProject(slug)
  if (!project) return null

  const highlights =
    project.highlights && project.highlights.length > 0
      ? `\n## Details\n\n${project.highlights.map((h) => `- ${h}`).join("\n")}\n`
      : ""

  return `# ${project.name}

${project.description}
${highlights}
- Status: ${project.status}
- Type: ${project.type}
- Technologies: ${project.technologies.join(", ")}
${project.live ? `- Live: ${project.live}\n` : ""}${project.repository ? `- Repository: ${project.repository}\n` : ""}${project.registry ? `- Registry: ${project.registry}\n` : ""}
By [${project.author.name}](${project.author.url}).

---

Source: ${siteConfig.url}/projects/${project.slug}
`
}

export function projectsIndexMarkdown(): string {
  return `# Projects by ${profile.name}

${profile.shortBio}

${projectsMarkdown()}

See the full work history at ${siteConfig.url}/experience.

Source: ${siteConfig.url}/projects
`
}

export function blogIndexMarkdown(): string {
  return `# Writing by ${profile.name}

Thoughts on web development, TypeScript, React, machine learning, and building better software.

${postsMarkdown()}
`
}

export function postMarkdown(slug: string): string | null {
  const post = getPostBySlug(slug)
  const body = getPostBody(slug)
  if (!post || body === null) return null

  const tags = post.tags.length > 0 ? `\nTags: ${post.tags.join(", ")}\n` : ""

  const related = getRelatedPosts(slug)
  const relatedBlock =
    related.length > 0
      ? `\n## Related\n\n${related
          .map((r) => `- [${r.title}](${siteConfig.url}/blog/${r.slug})`)
          .join("\n")}\n`
      : ""

  return `# ${post.title}

${post.description}

${post.author} - ${post.date} - ${post.readingTime}
${tags}
${body}
${relatedBlock}
---

Source: ${siteConfig.url}/blog/${slug}
`
}

export function resumeMarkdown(): string {
  return `# Resume - ${profile.name}

${profile.name} is a ${profile.title.toLowerCase()}.

Downloadable role-specific PDFs: ${siteConfig.url}/resume

## Work

${experienceMarkdown()}

## Skills

${skillsMarkdown()}

## Contact

${contactMarkdown()}
`
}

// llms.txt - the index agents fetch first. Short, link-following, cheap to
// read. See https://llmstxt.org/
export function llmsTxt(): string {
  return `# ${profile.name}

> ${profile.shortBio}

${profile.name} is a software engineer based in ${profile.location.city}, ${profile.location.country}. This file indexes the canonical, machine-readable views of his work.

## Core

- [Homepage](${profile.url}): bio, work history, skills, and selected projects
- [About](${profile.url}/#about): background and current work
- [Experience](${profile.url}/experience): full work history, roles in order
- [Resume](${profile.url}/resume): role-specific PDF downloads
- [Profile JSON](${profile.url}/api/profile): this profile as JSON

## Projects

${projectsMarkdown()}

- [All projects](${profile.url}/projects): index of every project with status and technologies
- [Projects JSON](${profile.url}/api/projects): machine-readable project list

## Writing

${postsMarkdown()}

- [Blog index](${profile.url}/blog): all posts
- [RSS feed](${profile.url}/feed.xml): subscribe to new posts

## Contact

${contactMarkdown()}

## Optional

- [Full corpus](${profile.url}/llms-full.txt): every page's content in one file
- [Sitemap](${profile.url}/sitemap.xml): all indexable URLs
- [Experience JSON](${profile.url}/api/experience): work history as JSON

Every representation here is generated from one canonical data source, so nothing is stale.
`
}

// llms-full.txt - the whole corpus in one request, for agents that would
// rather not follow links.
export function llmsFullTxt(): string {
  const steps = [
    `# ${profile.name} - full corpus
> ${profile.shortBio}

Generated from the canonical data source. One page = one section.

---

`,
    homeMarkdown(),
    "\n---\n\n",
    projectsIndexMarkdown(),
    "\n---\n\n",
    experiencePageMarkdown(),
    "\n---\n\n",
  ]

  for (const project of projects) {
    const body = projectMarkdown(project.slug)
    if (body) steps.push(body, "\n---\n\n")
  }

  steps.push(blogIndexMarkdown(), "\n---\n\n")

  for (const post of getAllPosts()) {
    const body = postMarkdown(post.slug)
    if (body) steps.push(body, "\n---\n\n")
  }

  steps.push(resumeMarkdown())

  return steps.join("")
}
