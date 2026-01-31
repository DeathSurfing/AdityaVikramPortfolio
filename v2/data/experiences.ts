import {
  IconCode,
  IconAward,
  IconUsers,
  IconBulb,
  IconBuilding,
  IconMapPin,
  IconCalendar,
  IconBriefcase,
  IconRocket,
  IconBuildingSkyscraper,
  IconUsersGroup,
  IconServer,
  IconTransform,
IconEyeDiscount,
  IconDevices,
  IconRobot,
} from '@tabler/icons-react';
import React from 'react';

export interface ExperienceHighlight {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlights: ExperienceHighlight[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Woxsen AI Research Center',
    location: 'Hyderabad, India',
    duration: 'Jan 2025 - Jun 2025',
    type: 'Internship',
    description:
      'Leading software development initiatives for enterprise systems, focusing on performance optimization, scalable architectures, and production-ready solutions for 6,000+ users.',
    achievements: [
      'Accelerated ERP deployment speed by 100% (from 40s to 20s) by containerizing 3 microservices using Docker with caching',
      'Architected backend for 6,000+ users via REST APIs for holidays, leaves, outing systems using Flask and PostgreSQL',
      'Implemented CI/CD with GitHub Actions for automated deployment and sharding support',
      'Delivered production ERP leave management system in collaboration with 6 team members',
    ],
    technologies: [
      'Python',
      'Flask',
      'Docker',
      'PostgreSQL',
      'GitHub Actions',
      'REST APIs',
      'CI/CD',
      'Microservices',
    ],
    highlights: [
      {
        icon: IconRocket,
        title: 'Performance Optimization',
        description: 'Doubled deployment speed through containerization and caching strategies',
      },
      {
        icon: IconBuildingSkyscraper,
        title: 'Enterprise Scale',
        description: 'Built systems handling 6,000+ users with production-grade reliability',
      },
      {
        icon: IconUsersGroup,
        title: 'Team Leadership',
        description: 'Collaborated with 6 team members to deliver critical ERP systems',
      },
      {
        icon: IconServer,
        title: 'DevOps Integration',
        description: 'Implemented automated CI/CD pipelines with deployment automation',
      },
    ],
  },
  {
    id: 2,
    title: 'Technical Secretary',
    company: 'Woxsen Student Council',
    location: 'Hyderabad, India',
    duration: '2025 - 2026',
    type: 'Leadership Role',
    description:
      'Leading campus-wide digital transformation initiatives, managing technical projects, and eliminating vendor dependencies through student-built solutions.',
    achievements: [
      'Led campus-wide digital transformation via 6 projects and 4 internal tools',
      'Eliminated vendor dependency by delivering student-built platforms',
      'Reduced hosting costs by 55% (INR 20,000 → INR 9,000) via in-house KVM migration',
      'Built platform for 600+ students with centralized payment system and responsive design',
      'Deployed 36 Google Forms to automate student organization operations',
    ],
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Google APIs',
      'KVM',
      'Payment Integration',
      'System Architecture',
    ],
    highlights: [
      {
        icon: IconTransform,
        title: 'Digital Transformation',
        description: 'Led 6 major projects transforming campus digital infrastructure',
      },
      {
        icon: IconEyeDiscount,
        title: 'Cost Optimization',
        description: 'Achieved 55% reduction in hosting costs through strategic migration',
      },
      {
        icon: IconDevices,
        title: 'Platform Development',
        description: 'Built comprehensive platform serving 600+ students',
      },
      {
        icon: IconRobot,
        title: 'Process Automation',
        description: 'Deployed 36 automated systems for organizational efficiency',
      },
    ],
  },
];

export const experienceIcons = {
  company: IconBuilding,
  location: IconMapPin,
  duration: IconCalendar,
  type: IconBriefcase,
};
