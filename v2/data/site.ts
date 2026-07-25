import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Aditya Vikram — Full Stack Developer | TypeScript, React & Kubernetes',
    template: '%s | Aditya Vikram',
  },
  description:
    'Full stack developer building digital products with Next.js, TypeScript, and Rust. Web agency operator, Kubernetes hobbyist, and Student Council Technical Secretary.',

  applicationName: 'Aditya Vikram Portfolio',

  metadataBase: new URL('https://adityavikram.dev'),
  alternates: {
    canonical: '/',
  },

  keywords: [
    'Aditya Vikram',
    'full stack developer',
    'TypeScript',
    'React',
    'Next.js',
    'web development',
    'Kubernetes',
    'Rust',
    'portfolio',
  ],

  authors: [{ name: 'Aditya Vikram' }],
  creator: 'Aditya Vikram',
  publisher: 'Aditya Vikram',

  openGraph: {
    title: 'Aditya Vikram — Full Stack Developer',
    description:
      'Full stack developer building digital products with Next.js, TypeScript, and Rust.',
    url: 'https://adityavikram.dev',
    siteName: 'Aditya Vikram',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aditya Vikram — Full Stack Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Vikram — Full Stack Developer',
    description:
      'Building digital products with Next.js, TypeScript, Rust, and Kubernetes.',
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

export const siteConfig = {
  name: 'Aditya Vikram',
  title: 'Full Stack Developer',
  url: 'https://adityavikram.dev',
  email: 'jobs.aditya.vikram.mahendru@gmail.com',
  github: {
    username: 'deathSurfing',
    url: 'https://github.com/deathSurfing',
  },
  linkedin: {
    username: 'aditya-vikram-mahendru',
    url: 'https://www.linkedin.com/in/aditya-vikram-mahendru/',
  },
  description:
    'Full Stack Developer building digital products — Next.js, TypeScript, Rust, and Kubernetes.',
};
