import Link from "next/link"
import type { Metadata } from "next"
import { BlogCard } from "@/components/blog/BlogCard"
import { getAllPosts, getAllTags } from "@/lib/blog"
import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import { FadeUp, SectionHeading } from "@/components/identity/motion-primitives"

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
    <MotionRoot>
      <main className="min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-32 pb-20">
          <div className="flex flex-col gap-5">
            <SectionHeading>// writing</SectionHeading>
            <FadeUp as="p" className="text-base leading-relaxed text-[#b0b0b0]">
              Thoughts on web development, TypeScript, React, and building
              better software.
            </FadeUp>
          </div>

          {tags.length > 0 && (
            <FadeUp delay={1}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#1f1f1f] pb-6 font-mono text-xs">
                <Link
                  href="/blog"
                  className={
                    !tag
                      ? "text-[#e5e5e5] underline underline-offset-4"
                      : "text-[#8a8a8a] transition-colors hover:text-[#e5e5e5]"
                  }
                >
                  all
                </Link>
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className={
                      tag === t
                        ? "text-[#e5e5e5] underline underline-offset-4"
                        : "text-[#8a8a8a] transition-colors hover:text-[#e5e5e5]"
                    }
                  >
                    {t.toLowerCase()}
                  </Link>
                ))}
              </div>
            </FadeUp>
          )}

          {posts.length === 0 ? (
            <FadeUp as="p" className="py-12 font-mono text-sm text-[#666]">
              nothing here yet — check back soon.
            </FadeUp>
          ) : (
            <div className="flex flex-col">
              {posts.map((post, i) => (
                <FadeUp key={post.slug} delay={Math.min(i, 6)}>
                  <BlogCard post={post} />
                </FadeUp>
              ))}
            </div>
          )}
        </div>
        <IdentityFooter />
      </main>
    </MotionRoot>
  )
}
