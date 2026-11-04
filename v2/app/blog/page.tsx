import Link from "next/link"
import type { Metadata } from "next"

import { getAllPosts } from "@/lib/blog"
import { blogDescription } from "@/data/site"
import { profile } from "@/data/profile"
import IdentityFooter from "@/components/identity/IdentityFooter"

export const metadata: Metadata = {
  title: "Blog",
  description: blogDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${profile.name}`,
    description: blogDescription,
  },
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const allPosts = getAllPosts()
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts
  const [featured, ...rest] = posts

  const tagCounts = new Map<string, number>()
  allPosts.forEach((post) => {
    post.tags.forEach((postTag) => {
      tagCounts.set(postTag, (tagCounts.get(postTag) ?? 0) + 1)
    })
  })
  const rankedTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name)
  const topTags = rankedTags.slice(0, 6)
  if (tag && !topTags.includes(tag)) topTags.unshift(tag)
  const moreTags = rankedTags.filter((name) => !topTags.includes(name))

  return (
    <>
      <main id="main" className="page-main">
        <div className="shell page-content">
          <header className="flex flex-col gap-5 border-b border-line pb-10">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">home</Link>
              <span className="sep" aria-hidden>/</span>
              <span>blog</span>
            </nav>

            <h1 className="page-title">
              <span className="sr-only">{"// "}</span>blog
              <span className="sr-only"> by {profile.name}</span>
            </h1>

            <p className="lead">{blogDescription}</p>
          </header>

          {rankedTags.length > 0 && (
            <div className="mt-8 border-b border-line pb-8">
              <div className="filter-row">
                <Link
                  href="/blog"
                  className="filter-link"
                  data-active={!tag ? "true" : undefined}
                >
                  all
                </Link>
                {topTags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="filter-link"
                    data-active={tag === t ? "true" : undefined}
                  >
                    {t.toLowerCase()}
                  </Link>
                ))}
              </div>

              {moreTags.length > 0 && (
                <details className="tag-more">
                  <summary>more tags</summary>
                  <div className="tag-more-list">
                    {moreTags.map((t) => (
                      <Link
                        key={t}
                        href={`/blog?tag=${encodeURIComponent(t)}`}
                        className="filter-link"
                        data-active={tag === t ? "true" : undefined}
                      >
                        {t.toLowerCase()}
                      </Link>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="empty-state mt-8">
              Nothing here yet. Check back soon.
            </p>
          ) : (
            <div className="mt-8 flex flex-col gap-5">
              {featured && (
                <article className="post-feature">
                  <div className="post-feature-main">
                    <h2 className="post-feature-title">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h2>

                    {featured.description && (
                      <p className="post-feature-description">{featured.description}</p>
                    )}
                  </div>

                  <div className="post-feature-rail">
                    <div className="post-feature-meta">
                      <time dateTime={featured.date}>
                        {dateFormat.format(new Date(featured.date))}
                      </time>
                      <span>{featured.readingTime}</span>
                    </div>
                    <Link href={`/blog/${featured.slug}`} className="action-link">
                      read <span className="arrow" aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              )}

              {rest.length > 0 && (
                <ul className="post-index">
                  {rest.map((post) => (
                    <li key={post.slug} className="post-index-item post-index-item--with-time">
                      <time className="post-date" dateTime={post.date}>
                        {dateFormat.format(new Date(post.date))}
                      </time>
                      <h3 className="post-title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <span className="post-time">{post.readingTime}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link href="/" className="action-link">
                <span className="arrow" aria-hidden>←</span> home
              </Link>
            </div>
          )}
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
