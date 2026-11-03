import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  GlobeIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';

import { profile } from './profile';

export interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
  category: 'professional' | 'contact' | 'document';
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: LinkedInLogoIcon,
    url: profile.accounts.linkedin,
    color: 'bg-[#0A66C2]',
    category: 'professional',
  },
  {
    name: 'GitHub',
    icon: GitHubLogoIcon,
    url: profile.accounts.github,
    color: 'bg-[#24292e]',
    category: 'professional',
  },
  {
    name: 'Substack',
    icon: ReaderIcon,
    url: profile.accounts.substack,
    color: 'bg-[#FF6719]',
    category: 'professional',
  },
  {
    name: 'Hugging Face',
    icon: GlobeIcon,
    url: profile.accounts.huggingface,
    color: 'bg-[#FFD21E]',
    category: 'professional',
  },
  {
    name: 'Email',
    icon: EnvelopeClosedIcon,
    url: `mailto:${profile.email}`,
    color: 'bg-primary',
    category: 'contact',
  },
  {
    name: 'Resume',
    icon: FileTextIcon,
    url: '/resume',
    color: 'bg-secondary',
    category: 'document',
  },
];

// Filtered exports for different contexts
export const professionalLinks = socialLinks.filter(
  (link) => link.category === 'professional'
);

export const contactLinks = socialLinks.filter(
  (link) => link.category === 'contact' || link.category === 'professional'
);
