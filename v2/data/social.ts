import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
} from '@radix-ui/react-icons';

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
    url: 'https://www.linkedin.com/in/aditya-vikram-mahendru/',
    color: 'bg-[#0A66C2]',
    category: 'professional',
  },
  {
    name: 'GitHub',
    icon: GitHubLogoIcon,
    url: 'https://github.com/deathSurfing',
    color: 'bg-[#24292e]',
    category: 'professional',
  },
  {
    name: 'Email',
    icon: EnvelopeClosedIcon,
    url: 'mailto:jobs.aditya.vikram.mahendru@gmail.com',
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
