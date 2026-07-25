import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { cn } from "@/lib/utils"

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block border-b border-[#1f1f1f] py-6 transition-colors",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium text-[#e5e5e5] transition-transform duration-300 group-hover:translate-x-1.5">
          {post.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-[#666]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          {" · "}
          {post.readingTime}
        </span>
      </div>

      {post.description && (
        <p className="mt-1.5 text-sm leading-relaxed text-[#8a8a8a] line-clamp-2">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <span className="mt-2 block font-mono text-xs text-[#666]">
          {post.tags.join(" · ")}
        </span>
      )}
    </Link>
  )
}
