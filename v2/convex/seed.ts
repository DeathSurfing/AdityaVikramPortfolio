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

const initialExperiences = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Woxsen AI Research Center",
    location: "Hyderabad, India",
    duration: "Jan 2025 - Jun 2025",
    type: "Internship",
    description: "Leading software development initiatives for enterprise systems, focusing on performance optimization, scalable architectures, and production-ready solutions for 6,000+ users.",
    achievements: [
      "Accelerated ERP deployment speed by 100% (from 40s to 20s) by containerizing 3 microservices using Docker with caching",
      "Architected backend for 6,000+ users via REST APIs for holidays, leaves, outing systems using Flask and PostgreSQL",
      "Implemented CI/CD with GitHub Actions for automated deployment and sharding support",
      "Delivered production ERP leave management system in collaboration with 6 team members",
    ],
    technologies: [
      "Python",
      "Flask",
      "Docker",
      "PostgreSQL",
      "GitHub Actions",
      "REST APIs",
      "CI/CD",
      "Microservices",
    ],
    highlights: [
      {
        title: "Performance Optimization",
        description: "Doubled deployment speed through containerization and caching strategies",
        iconName: "IconRocket",
      },
      {
        title: "Enterprise Scale",
        description: "Built systems handling 6,000+ users with production-grade reliability",
        iconName: "IconBuildingSkyscraper",
      },
      {
        title: "Team Leadership",
        description: "Collaborated with 6 team members to deliver critical ERP systems",
        iconName: "IconUsersGroup",
      },
      {
        title: "DevOps Integration",
        description: "Implemented automated CI/CD pipelines with deployment automation",
        iconName: "IconServer",
      },
    ],
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    title: "Technical Secretary",
    company: "Woxsen Student Council",
    location: "Hyderabad, India",
    duration: "2025 - 2026",
    type: "Leadership Role",
    description: "Leading campus-wide digital transformation initiatives, managing technical projects, and eliminating vendor dependencies through student-built solutions.",
    achievements: [
      "Led campus-wide digital transformation via 6 projects and 4 internal tools",
      "Eliminated vendor dependency by delivering student-built platforms",
      "Reduced hosting costs by 55% (INR 20,000 → INR 9,000) via in-house KVM migration",
      "Built platform for 600+ students with centralized payment system and responsive design",
      "Deployed 36 Google Forms to automate student organization operations",
    ],
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Google APIs",
      "KVM",
      "Payment Integration",
      "System Architecture",
    ],
    highlights: [
      {
        title: "Digital Transformation",
        description: "Led 6 major projects transforming campus digital infrastructure",
        iconName: "IconTransform",
      },
      {
        title: "Cost Optimization",
        description: "Achieved 55% reduction in hosting costs through strategic migration",
        iconName: "IconEyeDiscount",
      },
      {
        title: "Platform Development",
        description: "Built comprehensive platform serving 600+ students",
        iconName: "IconDevices",
      },
      {
        title: "Process Automation",
        description: "Deployed 36 automated systems for organizational efficiency",
        iconName: "IconRobot",
      },
    ],
    isActive: true,
    order: 2,
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

    // Seed experiences
    const existingExperiences = await ctx.db.query("experiences").collect();
    if (existingExperiences.length === 0) {
      for (const experience of initialExperiences) {
        await ctx.db.insert("experiences", experience);
      }
      console.log(`Seeded ${initialExperiences.length} experiences`);
    } else {
      console.log(`Experiences already exist (${existingExperiences.length}), skipping seed`);
    }

    return {
      projectsSeeded: existingProjects.length === 0 ? initialProjects.length : 0,
      testimonialsSeeded: existingTestimonials.length === 0 ? initialTestimonials.length : 0,
      experiencesSeeded: existingExperiences.length === 0 ? initialExperiences.length : 0,
    };
  },
});
