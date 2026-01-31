export interface Metric {
  value: string;
  label: string;
  suffix?: string;
}

export interface TechMapping {
  tech: string;
  outcome: string;
}

export const metrics: Metric[] = [
  { value: '3200', label: 'REAL USERS', suffix: '+' },
  { value: '99.9', label: 'MEASURED UPTIME', suffix: '%' },
  { value: '1200', label: 'COMMITS DEPLOYED', suffix: '+' },
  { value: '0', label: 'PRODUCTION INCIDENTS', suffix: '' },
];

export const techMappings: TechMapping[] = [
  {
    tech: 'Next.js',
    outcome: 'Picked because SEO should work by default, not after rewrites',
  },
  {
    tech: 'Convex',
    outcome: 'Realtime without inventing a second backend career',
  },
  {
    tech: 'TypeScript',
    outcome: 'If it compiles, it survives prod',
  },
  {
    tech: 'TailwindCSS',
    outcome: 'Styling velocity matters more than theoretical elegance',
  },
  {
    tech: 'Docker',
    outcome: 'Runs the same on my laptop and at 3AM in production',
  },
  {
    tech: 'Nixpacks',
    outcome: 'Reproducibility beats tribal knowledge',
  },
  {
    tech: 'Proxmox',
    outcome: 'Cloud convenience is nice. Control is better',
  },
  {
    tech: 'WorkOS',
    outcome: 'Auth solutions are always better than rolling your own',
  },
];
