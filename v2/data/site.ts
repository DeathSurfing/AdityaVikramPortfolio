import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Aditya Vikram — Full Stack Developer',
    template: '%s | Aditya Vikram',
  },
  description:
    'Full stack developer specializing in TypeScript, React, and modern web technologies. Explore my projects and digital products.',
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
    'web development',
    'portfolio',
  ],

  authors: [{ name: 'Aditya Vikram' }],
  creator: 'Aditya Vikram',
  publisher: 'Aditya Vikram',

  openGraph: {
    title: 'Aditya Vikram — Full Stack Developer',
    description:
      'Full stack developer creating modern web applications with TypeScript and React.',
    url: 'https://adityavikram.dev',
    siteName: 'Aditya Vikram',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Vikram — Full Stack Developer',
    description:
      'Exploring full stack development, modern technologies, and digital innovation.',
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
    'Full Stack Developer crafting scalable digital experiences with modern technologies.',
};
