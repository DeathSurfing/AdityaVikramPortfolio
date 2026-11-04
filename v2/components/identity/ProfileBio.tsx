import { bioParagraphs } from '@/data/identity';

export default function ProfileBio({ limit }: { limit?: number }) {
  const paragraphs = typeof limit === 'number' ? bioParagraphs.slice(0, limit) : bioParagraphs;

  return (
    <div className="flex measure flex-col gap-4">
      {paragraphs.map((segments, i) => (
        <p
          key={i}
          className={
            i === 0
              ? 'text-body-lg leading-body-tight text-foreground'
              : 'text-body leading-body text-muted-foreground'
          }
        >
          {segments.map((seg, j) =>
            seg.href ? (
              <a
                key={j}
                href={seg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-foreground"
              >
                {seg.text}
              </a>
            ) : (
              <span key={j}>{seg.text}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
