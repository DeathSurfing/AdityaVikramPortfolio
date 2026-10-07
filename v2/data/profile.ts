// Canonical person record. Everything machine-readable about Aditya Vikram
// derives from this object: metadata, JSON-LD, llms.txt, /api/profile,
// sitemap, and the on-page copy that imports it. Edit here, not downstream.

export interface ProfileLink {
  label: string;
  url: string;
}

export const profile = {
  name: 'Aditya Vikram Mahendru',
  // Shorter forms the site and search engines use.
  alternateNames: ['Aditya Vikram', 'Aditya Mahendru', 'Vikk'],

  headline: 'Aditya Vikram - Full Stack Developer and ML Engineer',
  title: 'Full Stack Developer and ML Engineer',
  shortBio:
    'Full stack developer and machine learning engineer. Next.js, TypeScript, and Rust on the web; Python, PyTorch, and MLOps for ML systems.',

  url: 'https://adityavikram.dev',
  image: '/AdityaVikram.webp',
  email: 'jobs.aditya.vikram.mahendru@gmail.com',

  location: {
    city: 'Hyderabad',
    region: 'Telangana',
    country: 'India',
    countryCode: 'IN',
  },

  // Roles used for schema.org Person.jobTitle.
  jobTitles: ['Full Stack Developer', 'Machine Learning Engineer'],

  // schema.org Person.knowsAbout, in priority order.
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Machine Learning',
    'MLOps',
    'Python',
    'PyTorch',
    'Rust',
  ],

  // Profiles that describe the same person. Drives schema.org Person.sameAs,
  // which is how search engines and LLMs link the site to known entities.
  sameAs: [
    'https://github.com/deathSurfing',
    'https://www.linkedin.com/in/aditya-vikram-mahendru/',
  ],

  // Employer / project entities the person is tied to.
  affiliations: [
    { name: 'LexContra', url: 'https://tech.lexcontra.com/' },
    { name: 'featrs', url: 'https://github.com/featrs/featrs' },
  ],
} as const;

export const profileLinks: ProfileLink[] = [
  { label: 'GitHub', url: 'https://github.com/deathSurfing' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-vikram-mahendru/' },
  { label: 'Email', url: `mailto:${profile.email}` },
  { label: 'Resume', url: '/resume' },
];
