import Link from "next/link"
import { BlogCard } from "./BlogCard"
import { getAllPosts } from "@/lib/blog"

export function LatestBlogPosts() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="h-4 w-full bg-border flex">
        <div className="flex-1 bg-foreground" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-foreground" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 lg:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-block px-4 py-1.5 bg-primary text-primary-foreground border-2 border-border shadow-md -rotate-1 mb-3">
              <span className="text-xs font-black uppercase tracking-widest">
                Latest Thoughts
              </span>
            </div>
            <h2 className="font-head text-3xl lg:text-4xl font-bold">From the Blog</h2>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 border-2 border-border bg-background px-4 py-2 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            View All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-border bg-background px-6 py-3 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
