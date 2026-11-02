export interface SkillEvidence {
  label: string;
  href: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
  // One shipped artifact per group, so a reader can check depth instead of
  // taking the label at face value.
  evidence: SkillEvidence[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'DEVOPS & INFRASTRUCTURE',
    skills: ['Kubernetes', 'K3s', 'Docker', 'Proxmox', 'Nginx', 'MetalLB', 'Raspberry Pi'],
    color: 'bg-green-400',
    evidence: [
      { label: 'five-node K3s cluster', href: '/projects/bare-metal-kubernetes-cluster' },
      { label: 'siela-bot stack', href: '/projects/siela-bot' },
    ],
  },
  {
    name: 'WEB DEVELOPMENT',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Convex'],
    color: 'bg-blue-400',
    evidence: [
      { label: '69k.lol', href: '/projects/69k-lol' },
      { label: 'EssetAI', href: '/projects/essetai' },
    ],
  },
  {
    name: 'MLOPS, MACHINE LEARNING & AI',
    skills: ['PyTorch', 'Python', 'MLOps', 'Model Evaluation', 'Neural Networks', 'RAG', 'NLP'],
    color: 'bg-purple-400',
    evidence: [
      { label: 'featrs', href: '/projects/featrs' },
      { label: 'pre-mortem', href: '/projects/pre-mortem' },
      { label: 'MLP from scratch', href: '/projects/mlp-from-scratch' },
    ],
  },
  {
    name: 'SYSTEMS PROGRAMMING',
    skills: ['Rust', 'Linear Algebra'],
    color: 'bg-orange-400',
    evidence: [
      { label: 'featrs', href: '/projects/featrs' },
      { label: 'aiter-commerce', href: '/projects/aiter-commerce' },
      { label: 'MLP from scratch', href: '/projects/mlp-from-scratch' },
    ],
  },
  {
    name: 'DATA & ANALYTICS',
    skills: ['Polars', 'Pandas', 'Data Analysis', 'Data Cleaning'],
    color: 'bg-pink-400',
    evidence: [
      { label: 'AutoFeat', href: '/projects/autofeat' },
      { label: 'featrs', href: '/projects/featrs' },
    ],
  },
];
