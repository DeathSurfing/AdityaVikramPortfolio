import {
  CubeIcon,
  BarChartIcon,
  QuestionMarkCircledIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';

export interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#project', icon: CubeIcon, label: 'Projects' },
  { href: '#opinions', icon: BarChartIcon, label: 'Opinions' },
  { href: '#about', icon: QuestionMarkCircledIcon, label: 'WhoAmI?' },
  { href: '#contact', icon: EnvelopeClosedIcon, label: 'Contact' },
];

export const quickLinks = [
  { href: '#', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#project', label: 'Projects' },
  { href: '#opinions', label: 'Opinions' },
  { href: '#contact', label: 'Contact' },
];
