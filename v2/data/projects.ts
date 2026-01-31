import React from 'react';

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  content?: React.ReactNode;
}

export const projects: Project[] = [
  {
    id: 6,
    name: "Self-Hosted Bare-Metal Kubernetes Cluster",
    description: "High-availability compute cluster using Raspberry Pi's and recycled hardware with K3s orchestration",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "DevOps & Infrastructure Engineering",
    technologies: ["Kubernetes", "K3s", "MetalLB", "Docker", "Raspberry Pi", "Proxmox", "Nginx"],
  },
  {
    id: 5,
    name: "Woxsen Student Council Website",
    description: "Full-stack platform serving 600+ students with CRM dashboard and real-time analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    link: "https://studentcouncil.woxsen.edu.in/",
    category: "Software & Web Development",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Redis", "Umami Analytics"],
  },
  {
    id: 4,
    name: "Spotify Top 100 Analysis",
    description: "Segmenting Spotify music data to predict song hit potential",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Spotify-Top-100-Analysis",
    link: "https://github.com/DeathSurfing/Spotify-Top-100-Analysis",
    category: "AI & Machine Learning",
    technologies: ["Python", "Pandas", "Machine Learning", "Data Analysis", "Spotify API"],
  },
  {
    id: 3,
    name: "Slang Translator",
    description: "AI-powered slang translator using LLaMA 3.1",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Slang-Translator",
    link: "https://github.com/DeathSurfing/Slang-Translator",
    category: "AI & Machine Learning",
    technologies: ["LLaMA 3.1", "Natural Language Processing", "Python", "AI"],
  },
  {
    id: 2,
    name: "CNN From Scratch",
    description: "A convolutional neural network built from scratch in Rust",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/CNN-From-Scratch",
    link: "https://github.com/DeathSurfing/CNN-From-Scratch",
    category: "AI & Machine Learning",
    technologies: ["Rust", "Neural Networks", "Deep Learning", "Linear Algebra"],
  },
  {
    id: 1,
    name: "NoteRefactor",
    description: "Interactive notebook tool for cleaning and refactoring text data",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/NoteRefactor",
    link: "https://github.com/DeathSurfing/NoteRefactor",
    category: "Software & Web Development",
    technologies: ["Text Processing", "Data Cleaning", "Interactive UI", "Python"],
  },
];
