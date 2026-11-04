import Link from 'next/link';

import { Section } from './Section';
import ProfileBio from './ProfileBio';

export default function AboutBlurb() {
  return (
    <Section label="// about">
      <div className="flex flex-col gap-5">
        <ProfileBio limit={1} />
        <Link href="/about" className="action-link">
          more about me <span className="arrow" aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  );
}
