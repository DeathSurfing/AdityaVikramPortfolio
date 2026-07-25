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
  role: 'Full Stack Developer',
  status: 'Open to opportunities',
};

export const bioParagraphs: BioSegment[][] = [
  [
    {
      text: "I'm a full stack developer who likes building things end-to-end — from the database schema to the last pixel. I care about software that doesn't just work, but feels considered: fast, honest, and built with purpose.",
    },
  ],
  [
    { text: 'Right now I study at Woxsen University, where I serve as ' },
    {
      text: 'Technical Secretary of the Student Council',
      href: 'https://studentcouncil.woxsen.edu.in/',
    },
    {
      text: ' — shipping platforms used by 600+ students and moving campus infrastructure in-house. Previously, I interned at the Woxsen AI Research Center, building ERP systems for 6,000+ users.',
    },
  ],
  [
    {
      text: 'Outside of coursework I run a bare-metal Kubernetes cluster on Raspberry Pis and recycled hardware, because the best way to learn infrastructure is to break your own. Lately I’ve been going deeper into ',
    },
    { text: 'Rust', href: 'https://github.com/DeathSurfing/CNN-From-Scratch' },
    { text: ' — currently a CNN built from scratch, no frameworks.' },
  ],
];

export const ctaLine = "Got a project in mind? Let's bring it to life.";

export const stackSummary =
  'My main stack is Next.js with TypeScript and Tailwind CSS on the front, Convex or PostgreSQL on the back, and Docker everywhere. For infrastructure I reach for Kubernetes (K3s) on Proxmox; for lower-level work, Rust and Python.';

export const experiences: Experience[] = [
  {
    role: 'Technical Secretary',
    company: 'Woxsen Student Council',
    duration: '2025 — 2026',
    location: 'Hyderabad, India',
    type: 'Leadership',
    summary:
      'Leading campus-wide digital transformation — 6 projects, 4 internal tools, and a 55% cut in hosting costs via in-house infrastructure.',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Woxsen AI Research Center',
    duration: 'Jan 2025 — Jun 2025',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Built production ERP systems for 6,000+ users — Flask, PostgreSQL, Docker, and CI/CD with GitHub Actions.',
  },
];

export const selectedProjects: SelectedProject[] = [
  {
    name: '69k.lol',
    status: 'live',
    description:
      'End-to-end digital product platform with secure auth, subscription billing, and a real-time backend.',
    tags: ['Next.js', 'Convex', 'Stripe', 'TypeScript'],
    live: 'https://69k.lol',
    image: '/card/69k.lol.png',
  },
  {
    name: 'Woxsen Student Council',
    status: 'live',
    description:
      'Full-stack platform serving 600+ students with a CRM dashboard and real-time analytics.',
    tags: ['Next.js', 'MongoDB', 'Redis', 'Tailwind CSS'],
    live: 'https://studentcouncil.woxsen.edu.in/',
    image: '/card/woxsenstudentcouncil.png',
  },
  {
    name: 'Bare-Metal K8s Cluster',
    status: 'building',
    description:
      'High-availability compute cluster on Raspberry Pis and recycled hardware, orchestrated with K3s.',
    tags: ['Kubernetes', 'K3s', 'Proxmox', 'MetalLB'],
    image: '/card/kubernetes.png',
  },
  {
    name: 'CNN From Scratch',
    status: 'building',
    description:
      'A convolutional neural network built from scratch in Rust — no ML frameworks, just linear algebra.',
    tags: ['Rust', 'Neural Networks', 'Deep Learning'],
    github: 'https://github.com/DeathSurfing/CNN-From-Scratch',
  },
];
