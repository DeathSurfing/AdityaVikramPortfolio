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
    },
    openGraph: {
      title: `${post.title} | Aditya Vikram`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://adityavikram.dev/blog/${slug}`,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.coverImage ? `https://adityavikram.dev${data.coverImage}` : undefined,
    datePublished: data.date,
    dateModified: data.date,
    author: {
      "@type": "Person",
      name: data.author || "Aditya Vikram Mahendru",
      url: "https://adityavikram.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Aditya Vikram Mahendru",
      url: "https://adityavikram.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://adityavikram.dev/blog/${slug}`,
    },
    keywords: tags.join(", "),
  }

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <article className="mx-auto max-w-2xl px-6 pt-32 pb-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />

          <FadeUp>
            <Link
              href="/blog"
              className="mb-10 inline-block font-mono text-xs text-[#8a8a8a] transition-colors hover:text-[#e5e5e5]"
            >
              &larr; blog
            </Link>
          </FadeUp>

          <FadeUp as="header" delay={1} className="mb-10 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#e5e5e5] lg:text-4xl">
              {data.title}
            </h1>

            {data.description && (
              <p className="text-base leading-relaxed text-[#8a8a8a]">
                {data.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#666]">
              <span>{data.author || "Aditya Vikram Mahendru"}</span>
              <span aria-hidden>·</span>
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{readingTimeText}</span>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-[#262626] bg-[#141414] px-2 py-0.5 font-mono text-xs text-[#b0b0b0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {data.coverImage && (
              <div className="mt-4 overflow-hidden rounded-sm border border-[#262626]">
                <Image
                  src={data.coverImage}
                  alt={data.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </FadeUp>

          <FadeUp delay={2}>
            <div className="prose-custom">{mdxContent}</div>
          </FadeUp>

          <footer className="mt-16 border-t border-[#1f1f1f] pt-8">
            <Link
              href="/blog"
              className="font-mono text-xs text-[#8a8a8a] transition-colors hover:text-[#e5e5e5]"
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
