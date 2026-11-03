import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import MotionRoot from "@/components/identity/MotionRoot"
import IdentityFooter from "@/components/identity/IdentityFooter"
import ProfileBio from "@/components/identity/ProfileBio"
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

const linkClass =
  "font-mono text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"

export default function AboutPage() {
  const recentPosts = getAllPosts().slice(0, 3)
  const jsonLd = profilePageJsonLd(recentPosts)

  return (
    <MotionRoot>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background font-sans text-foreground selection:bg-foreground selection:text-background">
        <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 pt-32 pb-20">
          <header className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
              {`// about`}
            </p>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Image
                src={profile.image}
                alt={profile.name}
                width={256}
                height={256}
                priority
                className="size-32 shrink-0 rounded-full border border-border object-cover grayscale transition-all duration-500 hover:grayscale-0 sm:size-40"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {profile.name}
                </h1>
                <p className="font-mono text-xs text-muted-foreground">
                  {profile.title}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {profile.location.city}, {profile.location.country}
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {profile.shortBio}
            </p>
          </header>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
              {`// biography`}
            </h2>
            <ProfileBio />
            <Link href="/experience" className={linkClass}>
              experience and measurement notes →
            </Link>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
              {`// what I work on`}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {stackSummary}
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
              {`// elsewhere`}
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {elsewhere.map((item) => {
                const external = item.href.startsWith("http")
                return (
                  <li key={item.label}>
                    {external ? (
                      <a
                        href={item.href}
                        className={linkClass}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
              {`// selected writing`}
            </h2>
            <ul className="flex flex-col gap-3">
              {recentPosts.map((post) => (
                <li key={post.slug} className="flex flex-col gap-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm leading-relaxed text-ring transition-colors hover:text-foreground"
                  >
                    {post.title}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {" · "}
                    {post.readingTime}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/blog" className={linkClass}>
              all posts →
            </Link>
          </section>
        </div>
        <IdentityFooter />
      </main>
    </MotionRoot>
  )
}
