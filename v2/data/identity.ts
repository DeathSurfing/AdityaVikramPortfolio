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
      text: "I build open source tools and digital products — from Rust libraries to full-stack web platforms. I run a small web agency on retainer-based pricing and ship open source projects that solve real problems.",
    },
  ],
  [
    { text: 'At Woxsen University I serve as ' },
    {
      text: 'Technical Secretary of the Student Council',
      href: 'https://studentcouncil.woxsen.edu.in/',
    },
    {
      text: ', building platforms for 600+ students and migrating campus infrastructure in-house. Previously I interned at the Woxsen AI Research Center, shipping ERP systems for 6,000+ users.',
    },
  ],
  [
    {
      text: "Outside college I'm an AI Engineering Intern working on Kubernetes infrastructure, and maintaining ",
    },
    { text: 'featrs', href: 'https://github.com/DeathSurfing/featrs' },
    {
      text: ', a Polars-native feature engineering library for Rust. I also run a bare-metal K3s cluster on Raspberry Pis and recycled hardware — best way to learn infra is to break your own.',
    },
  ],
];

export const ctaLine = "Got something to build? Let's make it happen.";

export const stackSummary =
  'Rust and Python for systems work. Next.js with TypeScript and Tailwind on the front, Convex or PostgreSQL on the back, Docker everywhere. For infrastructure: K3s on Proxmox.';

export const experiences: Experience[] = [
  {
    role: 'AI Engineering Intern',
    company: 'Stealth Startup',
    duration: 'Apr 2026 — Present',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Infrastructure automation, Kubernetes orchestration, and scalable deployment systems for AI workloads — CI/CD pipelines, containerization, and cluster management.',
  },
  {
    role: 'Technical Secretary',
    company: 'Woxsen Student Council',
    duration: '2025 — 2026',
    location: 'Hyderabad, India',
    type: 'Leadership',
    summary:
      'Campus-wide digital transformation — 6 projects, 4 internal tools, and a 55% cut in hosting costs by moving vendor services in-house.',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Woxsen AI Research Center',
    duration: 'Jan 2025 — Jun 2025',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Production ERP systems for 6,000+ users — Flask REST APIs, PostgreSQL, Docker containers, and CI/CD with GitHub Actions.',
  },
];

export const selectedProjects: SelectedProject[] = [
  {
    name: 'featrs',
    status: 'building',
    description:
      'A Polars-native feature engineering library for Rust — scikit-learn inspired transforms, built for performance and composability.',
    tags: ['Rust', 'Polars', 'Data Engineering', 'Machine Learning'],
    github: 'https://github.com/DeathSurfing/featrs',
  },
  {
    name: '69k.lol',
    status: 'live',
    description:
      'End-to-end digital product platform — secure auth via WorkOS, subscription billing with Stripe, and a real-time Convex backend.',
    tags: ['Next.js', 'Convex', 'Stripe', 'WorkOS', 'TypeScript'],
    live: 'https://69k.lol',
    image: '/card/69k.lol.png',
  },
  {
    name: 'EssetAI',
    status: 'building',
    description:
      'AI website builder that generates complete sites from Google Maps business links — Next.js 16, React 19, and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'AI', 'React', 'Tailwind'],
    github: 'https://github.com/DeathSurfing/EssetAI',
  },
  {
    name: 'Woxsen Student Council Portal',
    status: 'live',
    description:
      'Full-stack platform for 600+ students — CRM dashboard, real-time analytics, centralised payments, and role-based access.',
    tags: ['Next.js', 'MongoDB', 'Redis', 'Tailwind CSS', 'Umami'],
    live: 'https://studentcouncil.woxsen.edu.in/',
    image: '/card/woxsenstudentcouncil.png',
  },
  {
    name: 'Bare-Metal Kubernetes Cluster',
    status: 'building',
    description:
      'High-availability compute cluster running K3s on Raspberry Pis and recycled hardware — MetalLB load balancing, Proxmox VMs, self-hosted services.',
    tags: ['Kubernetes', 'K3s', 'Proxmox', 'MetalLB', 'Docker'],
    image: '/card/kubernetes.png',
  },
  {
    name: 'CNN From Scratch',
    status: 'building',
    description:
      'Convolutional neural network built entirely in Rust — no ML frameworks, just linear algebra and matrix operations from scratch.',
    tags: ['Rust', 'Neural Networks', 'Deep Learning', 'Linear Algebra'],
    github: 'https://github.com/DeathSurfing/CNN-From-Scratch',
  },
  {
    name: 'Slang Translator',
    status: 'building',
    description:
      'AI-powered slang translator using LLaMA 3.1 — converts informal language and internet slang into standard English.',
    tags: ['LLaMA 3.1', 'NLP', 'Python', 'AI'],
    github: 'https://github.com/DeathSurfing/Slang-Translator',
  },
];
