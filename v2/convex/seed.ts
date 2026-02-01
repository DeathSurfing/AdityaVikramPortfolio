import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

// Helper to create timestamp (newest first = higher timestamp)
const now = Date.now();
const day = 24 * 60 * 60 * 1000; // milliseconds in a day

const initialProjects = [
  {
    name: "69k.lol",
    description: "End-to-end digital product platform for selling and managing game enhancements, featuring secure authentication, subscription billing, and real-time backend updates.",
    image: "/card/69k.lol.png",
    category: "Software & Web Development",
    technologies: ["Next.js", "Convex", "WorkOS", "Stripe", "TypeScript", "Tailwind CSS", "Real-time Backend"],
    link: "https://69k.lol",
    isActive: true,
    createdAt: now + day, // Most recent (1 day in future to ensure it's first)
  },
  {
    name: "Self-Hosted Bare-Metal Kubernetes Cluster",
    description: "High-availability compute cluster using Raspberry Pi's and recycled hardware with K3s orchestration",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    category: "DevOps & Infrastructure Engineering",
    technologies: ["Kubernetes", "K3s", "MetalLB", "Docker", "Raspberry Pi", "Proxmox", "Nginx"],
    isActive: true,
    createdAt: now, // 2nd most recent
  },
  {
    name: "Woxsen Student Council Website",
    description: "Full-stack platform serving 600+ students with CRM dashboard and real-time analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    link: "https://studentcouncil.woxsen.edu.in/",
    category: "Software & Web Development",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Redis", "Umami Analytics"],
    isActive: true,
    createdAt: now - day * 30, // 1 month ago
  },
  {
    name: "Spotify Top 100 Analysis",
    description: "Segmenting Spotify music data to predict song hit potential",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Spotify-Top-100-Analysis",
    link: "https://github.com/DeathSurfing/Spotify-Top-100-Analysis",
    category: "AI & Machine Learning",
    technologies: ["Python", "Pandas", "Machine Learning", "Data Analysis", "Spotify API"],
    isActive: true,
    createdAt: now - day * 60, // 2 months ago
  },
  {
    name: "Slang Translator",
    description: "AI-powered slang translator using LLaMA 3.1",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Slang-Translator",
    link: "https://github.com/DeathSurfing/Slang-Translator",
    category: "AI & Machine Learning",
    technologies: ["LLaMA 3.1", "Natural Language Processing", "Python", "AI"],
    isActive: true,
    createdAt: now - day * 90, // 3 months ago
  },
  {
    name: "CNN From Scratch",
    description: "A convolutional neural network built from scratch in Rust",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/CNN-From-Scratch",
    link: "https://github.com/DeathSurfing/CNN-From-Scratch",
    category: "AI & Machine Learning",
    technologies: ["Rust", "Neural Networks", "Deep Learning", "Linear Algebra"],
    isActive: true,
    createdAt: now - day * 120, // 4 months ago
  },
  {
    name: "NoteRefactor",
    description: "Interactive notebook tool for cleaning and refactoring text data",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/NoteRefactor",
    link: "https://github.com/DeathSurfing/NoteRefactor",
    category: "Software & Web Development",
    technologies: ["Text Processing", "Data Cleaning", "Interactive UI", "Python"],
    isActive: true,
    createdAt: now - day * 150, // 5 months ago (oldest)
  },
];

const initialTestimonials = [
  {
    quote: "Aditya is one of the most creative individuals I've worked with.",
    name: "G. Lohith Reddy",
    designation: "General Secretary at Woxsen University Student Council",
    src: "/testimonials/Lohith.webp",
    order: 1,
    isActive: true,
  },
  {
    quote: "His problem-solving skills and UI sense are top-notch.",
    name: "Melvin Johnson",
    designation: "Intern at AI Research Center Woxsen University",
    src: "/testimonials/melvin.webp",
    order: 2,
    isActive: true,
  },
  {
    quote: "He blends design and code like an artist.",
    name: "Mitansh Seghal",
    designation: "Software Engineer",
    src: "/testimonials/mitansh.webp",
    order: 3,
    isActive: true,
  },
];

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Seed projects
    const existingProjects = await ctx.db.query("projects").collect();
    if (existingProjects.length === 0) {
      for (const project of initialProjects) {
        await ctx.db.insert("projects", project);
      }
      console.log(`Seeded ${initialProjects.length} projects`);
    } else {
      console.log(`Projects already exist (${existingProjects.length}), skipping seed`);
    }

    // Seed testimonials
    const existingTestimonials = await ctx.db.query("testimonials").collect();
    if (existingTestimonials.length === 0) {
      for (const testimonial of initialTestimonials) {
        await ctx.db.insert("testimonials", testimonial);
      }
      console.log(`Seeded ${initialTestimonials.length} testimonials`);
    } else {
      console.log(`Testimonials already exist (${existingTestimonials.length}), skipping seed`);
    }

    return {
      projectsSeeded: existingProjects.length === 0 ? initialProjects.length : 0,
      testimonialsSeeded: existingTestimonials.length === 0 ? initialTestimonials.length : 0,
    };
  },
});
