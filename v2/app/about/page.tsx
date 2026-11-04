import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import IdentityFooter from "@/components/identity/IdentityFooter"
import ProfileBio from "@/components/identity/ProfileBio"
import { Section } from "@/components/identity/Section"
import { profile } from "@/data/profile"
import { stackSummary } from "@/data/identity"
import { getAllPosts } from "@/lib/blog"
import { profilePageJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "About",
  description: profile.shortBio,
  alternates: {
    canonical: "/about",
    types: {
      "text/markdown": "/about",
    },
  },
  openGraph: {
    title: `About ${profile.name}`,
    description: profile.shortBio,
    url: `${profile.url}/about`,
    type: "profile",
    images: [
      {
        url: profile.image,
        width: 256,
        height: 256,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `About ${profile.name}`,
    description: profile.shortBio,
    images: [profile.image],
  },
}

const elsewhere = [
  { label: "GitHub", href: profile.accounts.github },
  { label: "LinkedIn", href: profile.accounts.linkedin },
  { label: "Substack", href: profile.accounts.substack },
  { label: "Hugging Face", href: profile.accounts.huggingface },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Resume", href: "/resume" },
]

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

export default function AboutPage() {
  const recentPosts = getAllPosts().slice(0, 3)
  const jsonLd = profilePageJsonLd(recentPosts)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="page-main">
        <div className="shell page-content">
          <header className="flex flex-col gap-8 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-5">
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <Link href="/">home</Link>
                <span className="sep" aria-hidden>/</span>
                <span>about</span>
              </nav>
              <div className="flex flex-col gap-4">
                <h1 className="page-title">{profile.name}</h1>
              </div>
              <p className="lead">{profile.shortBio}</p>
            </div>

            <div className="portrait-frame hero-avatar">
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                priority
                className="size-full object-cover"
              />
            </div>
          </header>

          <div className="mt-12 flex flex-col">
            <Section label="// biography">
              <div className="flex flex-col gap-5">
                <ProfileBio />
                <Link href="/experience" className="action-link">
                  full experience <span className="arrow" aria-hidden>→</span>
                </Link>
              </div>
            </Section>

            <Section label="// what I work on">
              <p className="body-text">{stackSummary}</p>
            </Section>

            <Section label="// elsewhere">
              <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                {elsewhere.map((item) => {
                  const external = item.href.startsWith("http")
                  const className =
                    "flex items-center justify-between gap-4 bg-card p-3 font-mono text-xs leading-relaxed text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  return (
                    <li key={item.label}>
                      {external ? (
                        <a
                          href={item.href}
                          className={className}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                          <span aria-hidden className="text-line-strong">↗</span>
                        </a>
                      ) : (
                        <Link href={item.href} className={className}>
                          {item.label}
                          <span aria-hidden className="text-line-strong">→</span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Section>

            <Section label="// selected writing">
              <div className="flex flex-col gap-5">
                <ul className="post-list">
                  {recentPosts.map((post) => (
                    <li key={post.slug} className="post-row">
                      <time className="post-date" dateTime={post.date}>
                        {dateFormat.format(new Date(post.date))}
                      </time>
                      <Link href={`/blog/${post.slug}`} className="post-title">
                        {post.title}
                      </Link>
                      <span className="post-time">{post.readingTime}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="action-link">
                  all posts <span className="arrow" aria-hidden>→</span>
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
