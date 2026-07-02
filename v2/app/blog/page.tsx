import Link from "next/link"
import type { Metadata } from "next"
import { BlogCard } from "@/components/blog/BlogCard"
import { getAllPosts, getAllTags } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, TypeScript, React, and building better software.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Aditya Vikram",
    description:
      "Thoughts on web development, TypeScript, React, and building better software.",
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="h-3 w-full bg-border flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-foreground" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-primary" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 lg:py-16">
        <div className="mb-10">
          <div className="inline-block px-4 py-1.5 bg-primary text-primary-foreground border-2 border-border shadow-md -rotate-1 mb-4">
            <span className="text-xs font-black uppercase tracking-widest">
              Writings
            </span>
          </div>
          <h1 className="font-head text-4xl lg:text-5xl font-bold mb-3">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Thoughts on web development, TypeScript, React, and building better
            software.
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b-2 border-border">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground mr-1 self-center">
              Filter:
            </span>
            <Link
              href="/blog"
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-border bg-background shadow-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-border bg-background shadow-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block px-6 py-3 bg-muted border-2 border-border shadow-md rotate-1 mb-4">
              <p className="font-black text-lg">Coming Soon</p>
            </div>
            <p className="text-muted-foreground">
              Blog posts are on their way. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
