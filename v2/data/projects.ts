// Canonical project records. Every representation derives from this array:
// the homepage listing, /projects, /projects/<slug>, JSON-LD, llms.txt,
// llms-full.txt, /api/projects, the sitemap, and markdown negotiation.
//
// To add a project: append one object here and commit. Nothing else.
//
// Descriptions mirror what the live site already published. `highlights` is
// intentionally left unpopulated: it is for verified specifics only, and the
// brief forbids inventing detail to fill it.

import { profile } from './profile'

export interface Project {
  slug: string
  name: string
  description: string
  status: 'live' | 'building' | 'archived'
  // 'open-source' gets a SoftwareSourceCode JSON-LD node, 'product' gets a
  // SoftwareApplication node.
  type: 'open-source' | 'product'
  technologies: string[]
  live?: string
  repository?: string
  registry?: string
  image?: string
  // Long-form verified detail, one bullet each. Rendered on the project page
  // and in markdown/API output.
  highlights?: string[]
  author: {
    name: string
    url: string
  }
}

export const projects: Project[] = [
  {
    slug: 'featrs',
    name: 'featrs',
    description:
      'A Polars-native feature engineering library for Rust - scikit-learn inspired transforms, built for performance and composability.',
    status: 'building',
    type: 'open-source',
    technologies: ['Rust', 'Polars', 'Data Engineering', 'Machine Learning'],
    repository: 'https://github.com/featrs/featrs',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: '69k-lol',
    name: '69k.lol',
    description:
      'End-to-end digital product platform - secure auth via WorkOS, subscription billing with Stripe, and a real-time Convex backend.',
    status: 'live',
    type: 'product',
    technologies: ['Next.js', 'Convex', 'Stripe', 'WorkOS', 'TypeScript'],
    live: 'https://69k.lol',
    image: '/card/69k.lol.png',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'essetai',
    name: 'EssetAI',
    description:
      'AI website builder that generates complete sites from Google Maps business links - Next.js 16, React 19, and TypeScript.',
    status: 'building',
    type: 'product',
    technologies: ['Next.js', 'TypeScript', 'AI', 'React', 'Tailwind'],
    repository: 'https://github.com/DeathSurfing/EssetAI',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'pre-mortem',
    name: 'pre-mortem',
    description:
      'Memory-backed reviewer for business decisions - cites your own past decisions by id, says no_precedent instead of guessing.',
    status: 'building',
    type: 'product',
    technologies: ['Python', 'Postgres', 'pgvector', 'FastAPI', 'Next.js'],
    repository: 'https://github.com/DeathSurfing/pre-mortem',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'kronos-vs-alphazerobeta',
    name: 'kronos-vs-alphazerobeta',
    description:
      'Leakage-free benchmark: a financial foundation model against a CNN-GRU recurrent-PPO portfolio agent on the S&P 500.',
    status: 'building',
    type: 'open-source',
    technologies: ['Python', 'Reinforcement Learning', 'Quant', 'Backtesting'],
    repository: 'https://github.com/DeathSurfing/kronos-vs-alphazerobeta',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'aiter-commerce',
    name: 'aiter-commerce',
    description:
      'Rust-first agentic commerce - makes any merchant catalog AI-buyable with spend caps, signed requests, and an audit log.',
    status: 'building',
    type: 'open-source',
    technologies: ['Rust', 'Axum', 'Ed25519', 'Razorpay'],
    repository: 'https://github.com/DeathSurfing/aiter-commerce',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'bare-metal-kubernetes-cluster',
    name: 'Bare-Metal Kubernetes Cluster',
    description:
      'High-availability compute cluster running K3s on Raspberry Pis and recycled hardware - MetalLB load balancing, Proxmox VMs, self-hosted services.',
    status: 'building',
    type: 'open-source',
    technologies: ['Kubernetes', 'K3s', 'Proxmox', 'MetalLB', 'Docker'],
    // No repository: the write-up is the published artifact.
    live: '/blog/k3s-bare-metal',
    image: '/card/kubernetes.png',
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'cnn-from-scratch',
    name: 'CNN From Scratch',
    description:
      'Convolutional neural network built entirely in Rust - no ML frameworks, just linear algebra and matrix operations from scratch.',
    status: 'building',
    type: 'open-source',
    technologies: ['Rust', 'Neural Networks', 'Deep Learning', 'Linear Algebra'],
    repository: 'https://github.com/DeathSurfing/CNN-From-Scratch',
    author: { name: profile.name, url: profile.url },
  },
]

export function getProject(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) || null
}
