import {
  IconBox,
  IconChartBar,
  IconHelpSquare,
  IconMail,
  IconBriefcase,
  IconTools,
} from '@tabler/icons-react';

export interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#project', icon: IconBox, label: 'Projects' },
  { href: '#experience', icon: IconBriefcase, label: 'Experience' },
  { href: '#opinions', icon: IconChartBar, label: 'Opinions' },
  { href: '#skillset', icon: IconTools, label: 'Skillset' },
  { href: '#about', icon: IconHelpSquare, label: 'WhoAmI?' },
  { href: '#contact', icon: IconMail, label: 'Contact' },
];

export const quickLinks = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#project', label: 'Projects' },
  { href: '#opinions', label: 'Opinions' },
  { href: '#skillset', label: 'Skillset' },
  { href: '#contact', label: 'Contact' },
];
