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
import AuthorCard from "@/components/blog/AuthorCard"
import { getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema"
import { profile } from "@/data/profile"
import { siteConfig } from "@/data/site"
import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { FadeUp } from "@/components/identity/motion-primitives"

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
    alternates: {
      canonical: `/blog/${slug}`,
      types: {
        "text/markdown": `/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | ${profile.name}`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${slug}`,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: post.coverWidth ?? 1200,
              height: post.coverHeight ?? 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`)

  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const stats = readingTime(source)
  const related = getRelatedPosts(slug)

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
  const article = articleJsonLd(post, slug)
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ])

  return (
    <MotionRoot>
      <main className="min-h-screen bg-background font-sans text-foreground selection:bg-foreground selection:text-background">
        <article className="mx-auto max-w-2xl px-6 pt-32 pb-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
          />

          <FadeUp>
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex items-center gap-2 font-mono text-xs text-muted-foreground"
            >
              <Link href="/" className="transition-colors hover:text-foreground">
                home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/blog" className="transition-colors hover:text-foreground">
                blog
              </Link>
            </nav>
          </FadeUp>

          <FadeUp as="header" delay={1} className="mb-10 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              {data.title}
            </h1>

            {data.description && (
              <p className="text-base leading-relaxed text-muted-foreground">
                {data.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
              <Link
                href="/about"
                className="transition-colors hover:text-foreground"
              >
                {data.author || profile.name}
              </Link>
              <span aria-hidden>·</span>
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {post.updated && post.updated !== post.date && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    updated{" "}
                    <time dateTime={post.updated}>
                      {new Date(post.updated).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{readingTimeText}</span>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-primary bg-card px-2 py-0.5 font-mono text-xs text-ring"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {data.coverImage && (
              <div className="mt-4 overflow-hidden rounded-sm border border-primary">
                <Image
                  src={data.coverImage}
                  alt={data.title}
                  width={post.coverWidth ?? 1200}
                  height={post.coverHeight ?? 630}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </FadeUp>

          <FadeUp delay={2}>
            <div data-mdx-content>{mdxContent}</div>
          </FadeUp>

          <AuthorCard />

          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
                {`// related`}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-sm leading-relaxed text-ring transition-colors hover:text-foreground"
                    >
                      {r.title}
                    </Link>
                    <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
                      {r.tags.slice(0, 3).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <footer className="mt-16 border-t border-border pt-8">
            <Link
              href="/blog"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; all posts
            </Link>
          </footer>
        </article>
        <IdentityFooter />
      </main>
    </MotionRoot>
  )
}
