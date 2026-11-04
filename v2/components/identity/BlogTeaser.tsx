import Link from 'next/link';

import { getAllPosts } from '@/lib/blog';
import { Section } from './Section';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function BlogTeaser() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  const visible = posts.slice(0, 6);
  const extra = posts.slice(6);

  return (
    <Section label="// blog">
      <div className="flex flex-col gap-6">
        <ul className="post-index">
          {visible.map((post) => (
            <li key={post.slug} className="post-index-item">
              <time className="post-date" dateTime={post.date}>
                {dateFormat.format(new Date(post.date))}
              </time>
              <Link href={`/blog/${post.slug}`} className="post-title">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>

        {extra.length > 0 && (
          <details className="more-block">
            <summary>older posts ({extra.length})</summary>
            <ul className="post-index mt-4">
              {extra.map((post) => (
                <li key={post.slug} className="post-index-item">
                  <time className="post-date" dateTime={post.date}>
                    {dateFormat.format(new Date(post.date))}
                  </time>
                  <Link href={`/blog/${post.slug}`} className="post-title">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )}

        <Link href="/blog" className="action-link">
          all posts <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  );
}
