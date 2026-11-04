'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { profile } from '@/data/profile';

const nav = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="shell site-header-inner">
        <Link href="/" className="brand" aria-label={`Vikk. ${profile.name}, home`}>
          Vikk<span aria-hidden>.</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
