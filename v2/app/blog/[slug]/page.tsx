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
import IdentityFooter from "@/components/identity/IdentityFooter"
import { getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema"
import { plainHeading, slugifyHeading } from "@/lib/slug"
import { profile } from "@/data/profile"
import { siteConfig } from "@/data/site"

interface PageProps {
  params: Promise<{ slug: string }>
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

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

  const readingTimeText = `${Math.ceil(stats.minutes)} min read`
  const toc: { text: string; id: string }[] = []
  let inFence = false
  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const heading = line.match(/^##\s+(.+)$/)
    if (heading) {
      toc.push({
        text: plainHeading(heading[1]),
        id: slugifyHeading(heading[1]),
      })
    }
  }
  const article = articleJsonLd(post, slug)
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ])

  return (
    <>
      <main id="main" className="page-main">
        <div className="reading-progress" aria-hidden />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />

        <div className="shell page-content">
          <article>
            <header className="article-header">
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <Link href="/">home</Link>
                <span className="sep" aria-hidden>/</span>
                <Link href="/blog">blog</Link>
              </nav>

              <h1 className="article-title">{data.title}</h1>

              {data.description && <p className="lead">{data.description}</p>}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label text-muted-foreground">
                <Link href="/about" className="transition-colors hover:text-foreground">
                  {data.author || profile.name}
                </Link>
                <span aria-hidden>·</span>
                <time dateTime={data.date}>{dateFormat.format(new Date(data.date))}</time>
                {post.updated && post.updated !== post.date && (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      updated{" "}
                      <time dateTime={post.updated}>
                        {dateFormat.format(new Date(post.updated))}
                      </time>
                    </span>
                  </>
                )}
                <span aria-hidden>·</span>
                <span>{readingTimeText}</span>
              </div>

              {data.coverImage && (
                <div className="mt-2 overflow-hidden border border-line">
                  <Image
                    src={data.coverImage}
                    alt={data.title}
                    width={post.coverWidth ?? 1200}
                    height={post.coverHeight ?? 630}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
            </header>

            <div className={toc.length > 0 ? "article-layout" : ""}>
              {toc.length > 0 && (
                <nav className="article-rail" aria-label="On this page">
                  <p className="eyebrow">On this page</p>
                  <ol className="toc-list">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="article-body">
                <div data-mdx-content>{mdxContent}</div>
                <AuthorCard />
              </div>
            </div>

            {related.length > 0 && (
              <section className="mt-16 border-t border-line pt-8">
                <p className="eyebrow">Related</p>
                <ul className="post-list mt-4">
                  {related.map((r) => (
                    <li key={r.slug} className="border-b border-line py-3 last:border-b-0">
                      <Link href={`/blog/${r.slug}`} className="post-title">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="mt-16 border-t border-line pt-8">
              <Link href="/blog" className="action-link">
                <span className="arrow" aria-hidden>←</span> all posts
              </Link>
            </footer>
          </article>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
