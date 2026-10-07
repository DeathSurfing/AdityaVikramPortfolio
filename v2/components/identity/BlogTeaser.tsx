import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { FadeUp, SectionHeading } from "./motion-primitives";

export default function BlogTeaser() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>// writing</SectionHeading>
      <FadeUp delay={1}>
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm leading-relaxed text-[#b0b0b0] transition-colors hover:text-[#e5e5e5]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </FadeUp>
      <FadeUp delay={2}>
        <Link
          href="/blog"
          className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          all posts
        </Link>
      </FadeUp>
    </section>
  );
}
