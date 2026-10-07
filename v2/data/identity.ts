// Static content for the minimal identity landing page (/)

export interface BioSegment {
  text: string;
  href?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  summary: string;
}

export interface SelectedProject {
  name: string;
  status: 'live' | 'building';
  description: string;
  tags: string[];
  live?: string;
  github?: string;
  image?: string;
}

export const heroCopy = {
  greeting: "Hi, I'm Aditya Vikram",
  role: 'Engineer and Open Source Creator',
  status: 'Building Open Source Sauce',
};

export const bioParagraphs: BioSegment[][] = [
  [
    {
      text: "I'm a full stack developer and machine learning engineer. I build open source tools and digital products, from Rust libraries to web platforms with Next.js and TypeScript. I'm also the founder of ",
    },
    { text: 'LexContra', href: 'https://tech.lexcontra.com/' },
    {
      text: ", a corporate law firm, and run a web agency on retainer-based pricing. I'm also DPO certified, the rare mix of law and engineering that makes me the perfect fit for a Data Protection Officer role.",
    },
  ],
  [
    { text: 'At Woxsen University I served as Technical Secretary of the Student Council' },
    {
      text: ', building platforms for 600+ students and migrating campus infrastructure in-house. Previously I interned at the Woxsen AI Research Center, shipping ML-backed ERP systems for 6,000+ users.',
    },
  ],
  [
    {
      text: "I'm a Forward Deployed ML Intern at iGlobus, embedded with US client teams to turn DPDP duties into working product controls. My machine learning work runs on Python and PyTorch, with MLOps practices for training, evaluation, and deployment. I maintain ",
    },
    { text: 'featrs', href: 'https://github.com/featrs/featrs' },
    {
      text: ', a Polars-native feature engineering library for Rust. I also run a bare-metal K3s cluster on Raspberry Pis and recycled hardware.',
    },
  ],
];

export const ctaLine = "Got something to build? Let's make it happen.";

export const stackSummary =
  'Rust and Python for systems work. Next.js with TypeScript and Tailwind on the front, Convex or PostgreSQL on the back, Docker everywhere. For infrastructure: K3s on Proxmox.';

export const experiences: Experience[] = [
  {
    role: 'Forward Deployed ML Intern',
    company: 'iGlobus Corporate Consulting',
    duration: 'Aug 2026 - Present',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'DPDP compliance across 5 client engagements with US teams - 2 readiness assessments and 3 PII ML discovery projects. Found personal data clients did not know they held by running rules plus ML classification over databases, logs, tickets, and backups.',
  },
  {
    role: 'Founder',
    company: 'LexContra',
    duration: '2025 - Present',
    location: 'Hyderabad, India',
    type: 'Founder',
    summary:
      'Corporate law practice with the content and review tooling built in-house - a human-verified legal fact pack pipeline, a POI compliance portal, and a security-audited research stack.',
  },
  {
    role: 'AI Engineering Intern',
    company: 'Symboynt',
    duration: 'May 2026 - Jul 2026',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Python backend services, REST APIs, and RAG pipelines integrating LLMs, SQL, and cloud infrastructure. Built multi-agent systems with LangGraph and LangChain, plus Kubernetes orchestration and CI/CD for AI workloads.',
  },
  {
    role: 'Technical Secretary',
    company: 'Woxsen Student Council',
    duration: 'Mar 2025 - Mar 2026',
    location: 'Hyderabad, India',
    type: 'Leadership',
    summary:
      'Campus-wide digital transformation - 6 projects, 4 internal tools, and a 55% cut in hosting costs by moving vendor services in-house. Platforms served 600+ students.',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Woxsen AI Research Centre, Woxsen University',
    duration: 'Jan 2025 - Aug 2025',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Production ERP systems for 6,000+ users - Flask REST APIs, PostgreSQL, and a 50% cut in deployment time by containerizing three microservices and streamlining CI/CD with GitHub Actions.',
  },
];

export const selectedProjects: SelectedProject[] = [
  {
    name: 'featrs',
    status: 'building',
    description:
      'A Polars-native feature engineering library for Rust - scikit-learn inspired transforms, built for performance and composability.',
    tags: ['Rust', 'Polars', 'Data Engineering', 'Machine Learning'],
    github: 'https://github.com/featrs/featrs',
  },
  {
    name: '69k.lol',
    status: 'live',
    description:
      'End-to-end digital product platform - secure auth via WorkOS, subscription billing with Stripe, and a real-time Convex backend.',
    tags: ['Next.js', 'Convex', 'Stripe', 'WorkOS', 'TypeScript'],
    live: 'https://69k.lol',
    image: '/card/69k.lol.png',
  },
  {
    name: 'EssetAI',
    status: 'building',
    description:
      'AI website builder that generates complete sites from Google Maps business links - Next.js 16, React 19, and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'AI', 'React', 'Tailwind'],
    github: 'https://github.com/DeathSurfing/EssetAI',
  },
  {
    name: 'pre-mortem',
    status: 'building',
    description:
      'Memory-backed reviewer for business decisions - cites your own past decisions by id, says no_precedent instead of guessing.',
    tags: ['Python', 'Postgres', 'pgvector', 'FastAPI', 'Next.js'],
    github: 'https://github.com/DeathSurfing/pre-mortem',
  },
  {
    name: 'kronos-vs-alphazerobeta',
    status: 'building',
    description:
      'Leakage-free benchmark: a financial foundation model against a CNN-GRU recurrent-PPO portfolio agent on the S&P 500.',
    tags: ['Python', 'Reinforcement Learning', 'Quant', 'Backtesting'],
    github: 'https://github.com/DeathSurfing/kronos-vs-alphazerobeta',
  },
  {
    name: 'aiter-commerce',
    status: 'building',
    description:
      'Rust-first agentic commerce - makes any merchant catalog AI-buyable with spend caps, signed requests, and an audit log.',
    tags: ['Rust', 'Axum', 'Ed25519', 'Razorpay'],
    github: 'https://github.com/DeathSurfing/aiter-commerce',
  },
  {
    name: 'Bare-Metal Kubernetes Cluster',
    status: 'building',
    description:
      'High-availability compute cluster running K3s on Raspberry Pis and recycled hardware - MetalLB load balancing, Proxmox VMs, self-hosted services.',
    tags: ['Kubernetes', 'K3s', 'Proxmox', 'MetalLB', 'Docker'],
    image: '/card/kubernetes.png',
    live: '/blog/bare-metal-kubernetes-cluster',
  },
  {
    name: 'CNN From Scratch',
    status: 'building',
    description:
      'Convolutional neural network built entirely in Rust - no ML frameworks, just linear algebra and matrix operations from scratch.',
    tags: ['Rust', 'Neural Networks', 'Deep Learning', 'Linear Algebra'],
    github: 'https://github.com/DeathSurfing/CNN-From-Scratch',
  },
];
