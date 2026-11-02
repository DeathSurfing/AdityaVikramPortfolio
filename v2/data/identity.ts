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
      text: ", a corporate law practice, and run a web agency on retainer-based pricing. I'm also DPO certified, which lets me work across privacy engineering and legal compliance.",
    },
  ],
  [
    { text: 'At Woxsen University I served as Technical Secretary of the Student Council' },
    {
      text: ', building platforms for 600+ core student users and reaching 2,000+ across 10+ organisations, while migrating campus infrastructure in-house. Previously I interned at the Woxsen AI Research Center, contributing to a production ERP platform used by 6,000+ users.',
    },
  ],
  [
    {
      text: "I was a Forward Deployed ML Intern at iGlobus, embedded with US client teams to turn DPDP duties into working product controls. My machine learning work runs on Python and PyTorch, with MLOps practices for training, evaluation, and deployment. I maintain ",
    },
    { text: 'featrs', href: 'https://github.com/featrs/featrs' },
    {
      text: ', a Polars-native feature engineering library for Rust. I also run a bare-metal K3s cluster on Raspberry Pis and recycled hardware. The through-line is systems I can operate end to end: the model, the service, and the machine it runs on.',
    },
  ],
];

export const ctaLine = "Got something to build? Let's make it happen.";

export const stackSummary =
  'Rust and Python for systems work. Next.js with TypeScript and Tailwind on the front, Convex or PostgreSQL on the back, Docker everywhere. For infrastructure: K3s on Proxmox. This is the stack I reach for most, not an exhaustive inventory.';

export const experiences: Experience[] = [
  {
    role: 'Forward Deployed ML Intern',
    company: 'iGlobus Corporate Consulting',
    duration: 'Aug 2026 - Nov 2026',
    startDate: '2026-08',
    endDate: '2026-11',
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
      'Campus-wide digital transformation - 6 projects and 4 internal tools. Platforms served 600+ core student users and reached 2,000+ across 10+ organisations. Cut hosting costs 55% (INR 20,000 to 9,000 per month) by moving vendor services in-house.',
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
      'Contributed to a production ERP platform used by 6,000+ users, owning the Flask APIs for leave, holiday, and outing workflows. Cut deployment time 50% (40s to 20s) by containerizing three microservices and streamlining CI/CD with GitHub Actions.',
  },
];

export interface MetricNote {
  label: string;
  detail: string;
}

// Keep the raw numbers beside every percentage. A percentage alone cannot be
// checked, and a wrong denominator turns a 55% cut into a nonsensical claim.
export const metricNotes: MetricNote[] = [
  {
    label: 'Deployment time',
    detail:
      'Measured from CI start to the ERP service being reachable. 40s before containerization, 20s after. The 50% reduction is (40 - 20) / 40.',
  },
  {
    label: 'Hosting cost',
    detail:
      'Monthly vendor invoice before and after the in-house migration: INR 20,000 to INR 9,000. The 55% reduction is (20,000 - 9,000) / 20,000.',
  },
  {
    label: 'User counts',
    detail:
      'ERP platform active users (6,000+) and student-council platform users (600+ core students; 2,000+ reached across 10+ organisations).',
  },
];

