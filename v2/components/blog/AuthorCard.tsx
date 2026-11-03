import Image from "next/image"
import Link from "next/link"

import { profile } from "@/data/profile"

const linkClass =
  "font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"

const accounts = [
  { label: "github", href: profile.accounts.github },
  { label: "linkedin", href: profile.accounts.linkedin },
  { label: "substack", href: profile.accounts.substack },
  { label: "hugging face", href: profile.accounts.huggingface },
]

export default function AuthorCard() {
  return (
    <aside className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row">
      <Image
        src={profile.image}
        alt={profile.name}
        width={128}
        height={128}
        className="size-16 shrink-0 rounded-full border border-border object-cover grayscale transition-all duration-500 hover:grayscale-0"
      />
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
          {`// written by`}
        </p>
        <Link
          href="/about"
          className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          {profile.name}
        </Link>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {profile.shortBio}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {accounts.map((account) => (
            <a
              key={account.label}
              href={account.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {account.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
