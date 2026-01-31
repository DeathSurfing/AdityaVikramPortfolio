export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  year: string;
  status: 'Live' | 'In Progress' | 'Archived';
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-COMMERCE REVOLUTION',
    category: 'Full Stack',
    description:
      'A brutal approach to online shopping. No unnecessary elements, just pure conversion-focused design with real-time inventory management.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    image: '/projects/ecommerce.jpg',
    link: 'https://example.com',
    year: '2024',
    status: 'Live',
  },
  {
    id: 2,
    title: 'TASK DOMINATION',
    category: 'SaaS Platform',
    description:
      "Project management that doesn't mess around. Built for teams who ship fast and break things intentionally.",
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    image: '/projects/taskmanager.jpg',
    link: 'https://example.com',
    year: '2024',
    status: 'Live',
  },
  {
    id: 3,
    title: 'PORTFOLIO SYSTEM',
    category: 'Web Design',
    description:
      'Dynamic portfolio generator for creatives who refuse to be templated. Each site is unique, loud, and unapologetically bold.',
    tags: ['TypeScript', 'Tailwind', 'Framer Motion', 'CMS'],
    image: '/projects/portfolio.jpg',
    link: 'https://example.com',
    year: '2023',
    status: 'Live',
  },
  {
    id: 4,
    title: 'SOCIAL DISRUPTOR',
    category: 'Mobile App',
    description:
      'Social media platform that prioritizes genuine connection over engagement metrics. Revolutionary UX patterns.',
    tags: ['React Native', 'Firebase', 'GraphQL', 'AWS'],
    image: '/projects/social.jpg',
    link: 'https://example.com',
    year: '2024',
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'DATA CRUSHER',
    category: 'Dashboard',
    description:
      "Analytics dashboard that makes data scream. Real-time visualizations that actually tell you what to do next.",
    tags: ['Vue.js', 'D3.js', 'FastAPI', 'Docker'],
    image: '/projects/analytics.jpg',
    link: 'https://example.com',
    year: '2023',
    status: 'Live',
  },
];
