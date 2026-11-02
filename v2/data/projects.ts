// Canonical project records. Every representation derives from this array:
// the homepage listing, /projects, /projects/<slug>, JSON-LD, llms.txt,
// llms-full.txt, /api/projects, the sitemap, and markdown negotiation.
//
// To add a project: append one object here and commit. Nothing else.
//
// Descriptions and highlights are specific to the work. Do not add a claim
// here that the linked artifact or write-up does not support. The MLP project
// is the corrected record of a repository that was previously described as a
// CNN.

import { profile } from './profile'

export interface Project {
  slug: string
  name: string
  description: string
  status: 'live' | 'building' | 'complete' | 'archived'
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
    highlights: [
      'Published on crates.io with docs, examples, and integration tests.',
      'Polars-native scalers, encoders, imputers, and feature selectors that preserve column names.',
      'CI runs on every change; releases are semantically versioned.',
    ],
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'siela-bot',
    name: 'siela-bot',
    description:
      'Self-hosted Discord bot with music, a PostgreSQL coin economy, daily card auctions, Tambola, TTS, and a web dashboard - built on Bun, TypeScript, and Podman.',
    status: 'live',
    type: 'open-source',
    technologies: ['TypeScript', 'Bun', 'PostgreSQL', 'Valkey', 'discord.js', 'Podman'],
    repository: 'https://github.com/DeathSurfing/siela-bot',
    highlights: [
      '63 commands covering music, a coin economy with an immutable Postgres ledger, daily one-of-one card auctions, 90-ball Tambola, TTS, and community features.',
      'Streams from SoundCloud, YouTube, and Spotify through yt-dlp and mpv, with a persistent Valkey-backed queue and live filters.',
      'Ships as a rootless Podman stack with Postgres 17, Valkey 8, local llama.cpp and KittenTTS sidecars, an MCP control server, and a web dashboard.',
    ],
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
    highlights: [
      'Live at 69k.lol with WorkOS authentication, Stripe subscription billing, and a real-time Convex backend.',
      'Owned the stack 0 to 1: schema and API design, auth boundaries, billing webhooks, and production deployment.',
    ],
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
    highlights: [
      'Turns a Google Maps business link into a production-ready site blueprint with Next.js, TypeScript, and the AI SDK.',
      'Streams structured AI output with concurrent prompt editing, quality scoring, and live preview on a Convex pipeline.',
    ],
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
    highlights: [
      'Live at premortem.lexcontra.com; searches decision history and cites each precedent by id.',
      'Returns no_precedent instead of a verdict when no precedent exists.',
      'Routes chat, query, and decision classes before retrieval, so the review runs only when the message is a decision.',
    ],
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
    highlights: [
      'Rust workspace with a pure commerce core and a thin axum HTTP surface.',
      'Signs every mutating request with Ed25519 per RFC 9421 and reconciles Razorpay payment-link webhooks to paid orders.',
      'Enforces per-agent spend caps, receipts, and an append-only audit log.',
    ],
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'autofeat',
    name: 'AutoFeat',
    description:
      'Interactive AI-powered feature engineering CLI in Rust - proposes preprocessing pipelines, explains each step, and lets you inspect, edit, or reject every change.',
    status: 'building',
    type: 'open-source',
    technologies: ['Rust', 'CLI', 'LLM', 'Polars', 'featrs'],
    repository: 'https://github.com/DeathSurfing/autofeat',
    registry: 'https://crates.io/crates/autofeat',
    highlights: [
      'Published on crates.io as a Rust CLI.',
      'Proposes preprocessing pipelines, explains each step, and lets you inspect, edit, or reject every change.',
    ],
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
    highlights: [
      'Five-node K3s cluster on Raspberry Pi 5 and x86 hardware, hosting 10+ self-hosted services.',
      'MetalLB and Nginx ingress for service routing; Longhorn for storage; Prometheus and Grafana for monitoring.',
    ],
    author: { name: profile.name, url: profile.url },
  },
  {
    slug: 'mlp-from-scratch',
    name: 'MLP From Scratch',
    description:
      'A 784-128-64-10 multilayer perceptron written from scratch in Rust - manual forward and backward passes, trained to 97.46% on MNIST.',
    status: 'complete',
    type: 'open-source',
    technologies: ['Rust', 'Neural Networks', 'Linear Algebra', 'MNIST'],
    repository: 'https://github.com/DeathSurfing/MLP-From-Scratch',
    highlights: [
      'Implements dense layers, ReLU, softmax cross-entropy, and mini-batch SGD by hand with no ML crate.',
      'Trained on 60,000 MNIST images for 12 epochs; 97.46% accuracy on the 10,000-image test set.',
      'Ships the training command, committed weights, and evaluation command so the result is reproducible.',
    ],
    author: { name: profile.name, url: profile.url },
  },
]

export function getProject(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) || null
}
