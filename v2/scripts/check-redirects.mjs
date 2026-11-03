import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const redirects = JSON.parse(
  fs.readFileSync(path.join(root, "data/redirects.json"), "utf8"),
)

// Losing one of these five URLs again removes the page, its clicks, and its ranking.
const requiredSources = [
  "/blog/bare-metal-kubernetes-cluster",
  "/blog/clean-architecture-in-typescript",
  "/blog/postgres-can-replace-your-whole-stack",
  "/blog/proxmox-lxc-containers",
  "/blog/understanding-react-server-components",
  "/uploads/Resume.pdf",
]

const errors = []
const sources = new Set(redirects.map((redirect) => redirect.source))
const destinations = new Set(redirects.map((redirect) => redirect.destination))
const projects = fs.readFileSync(path.join(root, "data/projects.ts"), "utf8")

function hasProject(slug) {
  return new RegExp(`slug:\\s*['"]${slug}['"]`).test(projects)
}

for (const redirect of redirects) {
  const { source, destination } = redirect

  if (!source.startsWith("/")) {
    errors.push(`${source}: source must start with /`)
  }
  if (!destination.startsWith("/") && !destination.startsWith("https://")) {
    errors.push(`${source}: destination must be an absolute path or URL`)
  }
  if (sources.has(destination)) {
    errors.push(`${source}: destination ${destination} is also a source`)
  }

  if (destination.startsWith("/blog/")) {
    const slug = destination.slice("/blog/".length)
    if (!fs.existsSync(path.join(root, "content/blog", `${slug}.mdx`))) {
      errors.push(`${source}: no post at content/blog/${slug}.mdx`)
    }
    continue
  }

  if (destination.startsWith("/projects/")) {
    const slug = destination.slice("/projects/".length)
    if (!hasProject(slug)) {
      errors.push(`${source}: no project with slug ${slug}`)
    }
    continue
  }

  if (destination.startsWith("/api/projects/")) {
    const slug = destination.slice("/api/projects/".length)
    if (!hasProject(slug)) {
      errors.push(`${source}: no project with slug ${slug}`)
    }
    continue
  }

  if (destination === "/resume") {
    if (!fs.existsSync(path.join(root, "app/resume/page.tsx"))) {
      errors.push(`${source}: no resume page`)
    }
    continue
  }

  errors.push(`${source}: no destination check for ${destination}`)
}

const duplicates = redirects
  .map((redirect) => redirect.source)
  .filter((source, index, all) => all.indexOf(source) !== index)

for (const source of new Set(duplicates)) {
  errors.push(`${source}: duplicate source`)
}

for (const source of requiredSources) {
  if (!sources.has(source)) {
    errors.push(`${source}: required redirect is missing`)
  }
}

if (errors.length > 0) {
  console.error(`redirect check failed with ${errors.length} error(s)`)
  for (const error of errors) console.error(`  ${error}`)
  process.exit(1)
}

console.log(
  `redirect check passed: ${redirects.length} permanent redirects, ${destinations.size} destinations`,
)
