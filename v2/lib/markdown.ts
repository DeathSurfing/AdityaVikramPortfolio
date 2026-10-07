import { skillCategories } from "@/data/skills"
import { bioParagraphs, experiences, selectedProjects } from "@/data/identity"
import { getAllPosts, getPostBody, getPostBySlug } from "@/lib/blog"
import { siteConfig } from "@/data/site"

const headline = `${siteConfig.name} - ${siteConfig.title}`

// Markdown for Agents: requests with `Accept: text/markdown` get a plain-text
// representation instead of the styled HTML. See the negotiation route in
// app/[...path]/route.ts, which serves these bodies.

// Links are flattened to text: the HTML site is a client-heavy React tree, and
// a flattened rendering has no anchor values left to resolve.
function inline(segments: { text: string }[]): string {
  return segments.map((seg) => seg.text).join("")
}

export function homeMarkdown(): string {
  const bio = bioParagraphs.map(inline).join("\n\n")

  const skills = skillCategories
    .map((cat) => `- **${cat.name}:** ${cat.skills.join(", ")}`)
    .join("\n")

  const work = experiences
    .map(
      (exp) =>
        `- **${exp.role}**, ${exp.company} (${exp.duration}, ${exp.location}) - ${exp.summary}`,
    )
    .join("\n")

  const projects = selectedProjects
    .map((p) => {
      const links = [p.live, p.github].filter(Boolean).join(", ")
      return `- **${p.name}** (${p.status}): ${p.description}${
        links ? ` Links: ${links}` : ""
      }`
    })
    .join("\n")

  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}) - ${p.description}`)
    .join("\n")

  return `# ${headline}

${bio}

## Work

${work}

## Projects

${projects}

## Skills

${skills}

## Writing

${posts}

## Contact

- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github.url}
- LinkedIn: ${siteConfig.linkedin.url}
- Resume (PDF): ${siteConfig.url}/resume

Source of truth: ${siteConfig.url}
`
}

export function blogIndexMarkdown(): string {
  const posts = getAllPosts()
    .map(
      (p) =>
        `- [${p.title}](${siteConfig.url}/blog/${p.slug}) (${p.date}, ${p.readingTime}) - ${p.description}`,
    )
    .join("\n")

  return `# Writing by ${siteConfig.name}

Thoughts on web development, TypeScript, React, machine learning, and building better software.

${posts}
`
}

export function postMarkdown(slug: string): string | null {
  const post = getPostBySlug(slug)
  const body = getPostBody(slug)
  if (!post || body === null) return null

  const tags = post.tags.length > 0 ? `\nTags: ${post.tags.join(", ")}\n` : ""

  return `# ${post.title}

${post.description}

${post.author} - ${post.date} - ${post.readingTime}
${tags}
${body}

---

Source: ${siteConfig.url}/blog/${slug}
`
}

export function resumeMarkdown(): string {
  const work = experiences
    .map(
      (exp) =>
        `- **${exp.role}**, ${exp.company} (${exp.duration}, ${exp.location}) - ${exp.summary}`,
    )
    .join("\n")

  const skills = skillCategories
    .map((cat) => `- **${cat.name}:** ${cat.skills.join(", ")}`)
    .join("\n")

  return `# Resume - ${siteConfig.name}

${siteConfig.name} is a full stack developer and machine learning engineer.

Downloadable role-specific PDFs: ${siteConfig.url}/resume

## Work

${work}

## Skills

${skills}

## Contact

- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github.url}
- LinkedIn: ${siteConfig.linkedin.url}
`
}
