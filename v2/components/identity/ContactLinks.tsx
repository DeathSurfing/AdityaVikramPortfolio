import { ctaLine } from '@/data/identity';
import { socialLinks } from '@/data/social';
import { Section } from './Section';

export default function ContactLinks() {
  return (
    <Section label="// contact">
      <div className="cta-band">
        <div className="flex flex-col gap-3">
          <p className="cta-title">{ctaLine}</p>
        </div>

        <ul className="link-row">
          {socialLinks.map(({ name, icon: Icon, url }) => {
            const external = !url.startsWith('/');
            return (
              <li key={name}>
                <a
                  href={url}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="social-link"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
