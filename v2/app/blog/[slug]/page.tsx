import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

import { mdxComponents } from "@/components/blog/MDXComponents"
import { getPostBySlug } from "@/lib/blog"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blog")
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"))
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Aditya Vikram`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const stats = readingTime(source)

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
    components: mdxComponents,
  })

  const tags: string[] = data.tags || []
  const readingTimeText = `${Math.ceil(stats.minutes)} min read`

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="h-3 w-full bg-border flex">
        <div className="flex-1 bg-foreground" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-foreground" />
      </div>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 lg:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          Back to Blog
        </Link>

        <header className="mb-10">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-muted border border-border rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-head text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            {data.title}
          </h1>

          {data.description && (
            <p className="text-lg text-muted-foreground mb-6">
              {data.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">
            <span>{data.author || "Aditya Vikram Mahendru"}</span>
            <span className="w-1.5 h-1.5 bg-border rotate-45" />
            <time dateTime={data.date}>
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="w-1.5 h-1.5 bg-border rotate-45" />
            <span>{readingTimeText}</span>
          </div>

          {data.coverImage && (
            <div className="mt-8 border-2 border-border rounded shadow-md overflow-hidden">
              <Image
                src={data.coverImage}
                alt={data.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </header>

        <div className="prose-custom">{mdxContent}</div>

        <footer className="mt-16 pt-8 border-t-2 border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-border bg-background px-5 py-2.5 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            &larr; Back to Blog
          </Link>
        </footer>
      </article>
    </main>
  )
}
