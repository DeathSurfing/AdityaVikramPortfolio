import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const blogDir = path.join(process.cwd(), "content/blog")

// Static pages share one stable lastmod. Deriving it from the newest post date
// (instead of new Date()) keeps the sitemap from claiming every page changed on
// each build, which Google ignores as an unreliable freshness signal.
export function getLatestPostDate(): Date {
  const stamps = getAllPosts()
    .map((post) => Date.parse(post.date))
    .filter((t) => !Number.isNaN(t))
  return new Date(stamps.length > 0 ? Math.max(...stamps) : Date.UTC(2026, 0, 1))
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  coverImage?: string
  author: string
  readingTime: string
}

function formatReadingTime(minutes: number): string {
  return `${Math.ceil(minutes)} min read`
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const source = fs.readFileSync(path.join(blogDir, file), "utf8")
      const { data } = matter(source)
      const stats = readingTime(source)

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        tags: data.tags || [],
        coverImage: data.coverImage || undefined,
        author: data.author || "Aditya Vikram Mahendru",
        readingTime: formatReadingTime(stats.minutes),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

// Raw MDX body without frontmatter, for markdown content negotiation.
export function getPostBody(slug: string): string | null {
  const file = path.join(blogDir, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  return matter(fs.readFileSync(file, "utf8")).content.trim()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

// Related posts, ranked by shared tags. Tie-broken by recency so the list is
// deterministic rather than filesystem-order dependent.
//
// pruned: no manual "related" field in frontmatter. Tags already encode the
// relationships, and every post carries them, so this needs no per-post work.
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  const tags = new Set(current.tags)

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .slice(0, limit)
    .map((entry) => entry.post)
}
