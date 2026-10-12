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
  // ISO 8601, for schema.org. `endDate` is omitted while the role is current.
  // `duration` stays the human-readable form the UI renders.
  startDate: string;
  endDate?: string;
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
    startDate: '2026-08',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'DPDP compliance across 5 client engagements with US teams - 2 readiness assessments and 3 PII ML discovery projects. Found personal data clients did not know they held by running rules plus ML classification over databases, logs, tickets, and backups.',
  },
  {
    role: 'Founder',
    company: 'LexContra',
    duration: '2025 - Present',
    startDate: '2025-01',
    location: 'Hyderabad, India',
    type: 'Founder',
    summary:
      'Corporate law practice with the content and review tooling built in-house - a human-verified legal fact pack pipeline, a POI compliance portal, and a security-audited research stack.',
  },
  {
    role: 'AI Engineering Intern',
    company: 'Symboynt',
    duration: 'May 2026 - Jul 2026',
    startDate: '2026-05',
    endDate: '2026-07',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Python backend services, REST APIs, and RAG pipelines integrating LLMs, SQL, and cloud infrastructure. Built multi-agent systems with LangGraph and LangChain, plus Kubernetes orchestration and CI/CD for AI workloads.',
  },
  {
    role: 'Technical Secretary',
    company: 'Woxsen Student Council',
    duration: 'Mar 2025 - Mar 2026',
    startDate: '2025-03',
    endDate: '2026-03',
    location: 'Hyderabad, India',
    type: 'Leadership',
    summary:
      'Campus-wide digital transformation - 6 projects, 4 internal tools, and a 55% cut in hosting costs by moving vendor services in-house. Platforms served 600+ students.',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Woxsen AI Research Centre, Woxsen University',
    duration: 'Jan 2025 - Aug 2025',
    startDate: '2025-01',
    endDate: '2025-08',
    location: 'Hyderabad, India',
    type: 'Internship',
    summary:
      'Production ERP systems for 6,000+ users - Flask REST APIs, PostgreSQL, and a 50% cut in deployment time by containerizing three microservices and streamlining CI/CD with GitHub Actions.',
  },
];

