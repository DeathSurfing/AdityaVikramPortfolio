import { SunIcon, MoonIcon, LaptopIcon } from '@radix-ui/react-icons';

export type ThemeOption = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  value: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconColor: string;
}

export const themes: ThemeConfig[] = [
  {
    value: 'light',
    label: 'LIGHT',
    icon: SunIcon,
    color: 'bg-primary',
    iconColor: 'text-primary-foreground',
  },
  {
    value: 'dark',
    label: 'DARK',
    icon: MoonIcon,
    color: 'bg-foreground',
    iconColor: 'text-background',
  },
  {
    value: 'system',
    label: 'SYSTEM',
    icon: LaptopIcon,
    color: 'bg-secondary',
    iconColor: 'text-secondary-foreground',
  },
];
