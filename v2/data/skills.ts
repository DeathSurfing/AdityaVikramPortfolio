export interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'DEVOPS & INFRASTRUCTURE',
    skills: ['Kubernetes', 'K3s', 'Docker', 'Proxmox', 'Nginx', 'MetalLB', 'Raspberry Pi'],
    color: 'bg-green-400',
  },
  {
    name: 'WEB DEVELOPMENT',
    skills: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Redis', 'Umami Analytics'],
    color: 'bg-blue-400',
  },
  {
    name: 'AI & MACHINE LEARNING',
    skills: ['Python', 'LLaMA 3.1', 'Neural Networks', 'Deep Learning', 'NLP', 'Machine Learning'],
    color: 'bg-purple-400',
  },
  {
    name: 'SYSTEMS PROGRAMMING',
    skills: ['Rust', 'C++', 'Linear Algebra'],
    color: 'bg-orange-400',
  },
  {
    name: 'DATA & ANALYTICS',
    skills: ['Pandas', 'Data Analysis', 'Text Processing', 'Data Cleaning'],
    color: 'bg-pink-400',
  },
];

// Legacy export for backward compatibility
export interface ProgrammingSkill {
  language: string;
  level: string;
}

export const programmingSkills: ProgrammingSkill[] = [
  { language: 'RUST', level: 'LEARNING' },
  { language: 'PYTHON', level: 'INTERMEDIATE' },
  { language: 'JAVASCRIPT', level: 'INTERMEDIATE' },
  { language: 'C++', level: 'INTERMEDIATE' },
];
