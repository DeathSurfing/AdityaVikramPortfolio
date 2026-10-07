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

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}
