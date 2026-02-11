import {
  IconRocket,
  IconBuildingSkyscraper,
  IconUsersGroup,
  IconServer,
  IconTransform,
  IconEyeDiscount,
  IconDevices,
  IconRobot,
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconBriefcase,
} from '@tabler/icons-react';
import React from 'react';

// Icon mapping from database iconName to actual icon component
export const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  IconRocket,
  IconBuildingSkyscraper,
  IconUsersGroup,
  IconServer,
  IconTransform,
  IconEyeDiscount,
  IconDevices,
  IconRobot,
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconBriefcase,
};

// Experience icons for the UI
export const experienceIcons = {
  company: IconBuilding,
  location: IconMapPin,
  duration: IconCalendar,
  type: IconBriefcase,
};

// DB Experience type (from Convex)
export interface DBExperience {
  _id: string;
  _creationTime: number;
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlights: {
    title: string;
    description: string;
    iconName: string;
  }[];
  isActive: boolean;
  order: number;
}

// Helper to get icon component from name
export function getIconByName(iconName: string): React.ComponentType<{ className?: string; strokeWidth?: number }> {
  return iconMap[iconName] || IconRocket; // Default fallback
}
