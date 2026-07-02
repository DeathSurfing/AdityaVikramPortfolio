import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { cn } from "@/lib/utils"

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block border-2 border-border rounded p-6 shadow-md hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-card",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-muted border border-border rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-head text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      {post.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span className="w-1 h-1 bg-border rounded-full" />
        <span>{post.readingTime}</span>
      </div>
    </Link>
  )
}
