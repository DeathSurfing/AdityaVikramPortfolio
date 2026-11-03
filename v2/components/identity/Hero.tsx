import Image from 'next/image';
import { heroCopy } from '@/data/identity';
import { profile } from '@/data/profile';

// pruned: was a motion stagger over each word with a spring and a blur.
// The portrait fade-in and the status dot pulse are CSS now (globals.css).
export default function Hero() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-5 sm:gap-6">
        <div className="hero-avatar size-14 shrink-0 overflow-hidden rounded-full border border-border grayscale transition-all duration-500 hover:grayscale-0 sm:size-16">
          <Image
            src={profile.image}
            alt={profile.name}
            width={64}
            height={64}
            priority
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-heading text-muted-foreground">
            {`// hello`}
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {profile.name}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
        <span>{heroCopy.role}</span>
        <span aria-hidden className="text-muted-foreground">
          ·
        </span>
        <span className="flex items-center gap-2">
          <span className="status-dot inline-block size-1.5 rounded-full bg-muted-foreground" />
          {heroCopy.status}
        </span>
      </div>
    </section>
  );
}
