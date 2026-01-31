import {
  IconBox,
  IconChartBar,
  IconHelpSquare,
  IconMail,
} from '@tabler/icons-react';

export interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#project', icon: IconBox, label: 'Projects' },
  { href: '#opinions', icon: IconChartBar, label: 'Opinions' },
  { href: '#about', icon: IconHelpSquare, label: 'WhoAmI?' },
  { href: '#contact', icon: IconMail, label: 'Contact' },
];

export const quickLinks = [
  { href: '#', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#project', label: 'Projects' },
  { href: '#opinions', label: 'Opinions' },
  { href: '#contact', label: 'Contact' },
];
