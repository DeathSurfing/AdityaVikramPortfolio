import Image from 'next/image';
import Link from 'next/link';

import { profile } from '@/data/profile';

const nameParts = profile.name.split(' ');
const lastName = nameParts.pop() ?? '';
const firstName = nameParts.join(' ');

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="flex min-w-0 flex-col gap-6">
        <h1 id="hero-name" className="hero-name">
          <span>{firstName}</span>{' '}
          <span>{lastName}</span>
        </h1>

        <div className="hero-meta">
          <span>{profile.title}</span>
          <span className="sep" aria-hidden>
            /
          </span>
          <span>
            {profile.location.city}, {profile.location.country}
          </span>
        </div>

        <p className="lead">{profile.shortBio}</p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href={`mailto:${profile.email}`} className="action-primary">
            Email me <span aria-hidden>↗</span>
          </a>
          <Link href="/resume" className="action-ghost">
            Resume <span aria-hidden>→</span>
          </Link>
          <a
            href={profile.accounts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="action-link"
          >
            GitHub <span className="arrow" aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="hero-aside">
        <div className="hero-avatar portrait-frame">
          <Image
            src={profile.image}
            alt={profile.name}
            width={256}
            height={256}
            priority
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
