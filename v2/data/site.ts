import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Aditya Vikram | Full Stack Developer and Machine Learning Engineer',
    template: '%s | Aditya Vikram',
  },
  description:
    'Aditya Vikram is a full stack developer and machine learning engineer. Next.js, TypeScript, and Rust on the web; Python, PyTorch, and MLOps for ML systems. Open source maintainer and founder of LexContra.',

  applicationName: 'Aditya Vikram Portfolio',

  metadataBase: new URL('https://adityavikram.dev'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },

  keywords: [
    'Aditya Vikram',
    'Aditya Vikram Mahendru',
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

  authors: [{ name: 'Aditya Vikram' }],
  creator: 'Aditya Vikram',
  publisher: 'Aditya Vikram',

  openGraph: {
    title: 'Aditya Vikram - Full Stack Developer and ML Engineer',
    description:
      'Full stack developer and machine learning engineer. Next.js, TypeScript, and Rust on the web; Python, PyTorch, and MLOps for ML systems.',
    url: 'https://adityavikram.dev',
    siteName: 'Aditya Vikram',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Aditya Vikram - Full Stack Developer and ML Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Vikram - Full Stack Developer and ML Engineer',
    description:
      'Building web products with Next.js, TypeScript, and Rust, and ML systems with Python, PyTorch, and MLOps.',
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
  title: 'Full Stack Developer and ML Engineer',
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
    'Aditya Vikram is a full stack developer and machine learning engineer - Next.js, TypeScript, Rust, Python, PyTorch, MLOps, and Kubernetes.',
};
