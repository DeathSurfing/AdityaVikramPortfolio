// Site config and Next.js metadata, derived from the canonical profile record.
// Nothing here restates a fact by hand: edit data/profile.ts instead.

import type { Metadata } from 'next';

import { profile } from './profile';

export const siteConfig = {
  name: profile.name,
  title: profile.title,
  url: profile.url,
  email: profile.email,
  github: {
    username: 'deathSurfing',
    url: profile.sameAs[0],
  },
  linkedin: {
    username: 'aditya-vikram-mahendru',
    url: profile.sameAs[1],
  },
  description: profile.shortBio,
};

export const siteMetadata: Metadata = {
  title: {
    default: profile.headline,
    template: `%s | ${profile.alternateNames[0]}`,
  },
  description: profile.shortBio,

  applicationName: `${profile.name} Portfolio`,

  metadataBase: new URL(profile.url),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
      'text/markdown': '/',
    },
  },

  keywords: [
    profile.alternateNames[0],
    profile.name,
    profile.alternateNames[2],
    'full stack developer',
    'machine learning engineer',
    'ML engineer',
    'MLOps',
    'developer',
    'TypeScript',
    'React',
    'Next.js',
    'Python',
    'PyTorch',
    'Kubernetes',
    'Rust',
    'open source',
  ],

  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  publisher: profile.name,

  openGraph: {
    title: profile.headline,
    description: profile.shortBio,
    url: profile.url,
    siteName: profile.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: profile.headline,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: profile.headline,
    description: profile.shortBio,
    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'technology',
};
