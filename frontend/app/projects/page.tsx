'use client'

import { useState } from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { ExpandableCardDemo } from "@/components/ui/expandable-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import React from "react"

type Project = {
  id: number
  name: string
  description: string
  image: string
  link?: string
  technologies?: string[]
  category: string
  content: React.ReactNode
}

const projects: Project[] = [
  {
    id: 1,
    name: "Woxsen Student Council Website",
    description: "Platform for 600+ students with centralized payment system and responsive design",
    image: "/card/woxsenstudentcouncil.png",
    link: "https://woxsenstudentcouncil.com",
    category: "Web Development",
    technologies: ["Next.js", "Tailwind CSS", "Google APIs"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          Built platform for 600+ students with centralized payment system and responsive design.
          Achieved significant cost optimization and operational efficiency.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Achievements:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Reduced hosting costs by 55% (INR 20,000 → INR 9,000) via in-house KVM migration</li>
            <li>Built platform for 600+ students with centralized payment system</li>
            <li>Deployed 36 Google Forms to automate student org operations</li>
            <li>Eliminated vendor dependency with student-built solutions</li>
            <li>Responsive design with modern UI/UX principles</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Woxsen MUN Website",
    description: "Event platform handling 300+ registrations with 100% uptime and payment gateway integration",
    image: "/card/munreg.png",
    link: "https://mun.woxsenstudentcouncil.com",
    category: "Event Management",
    technologies: ["FastAPI", "Next.js", "Tailwind CSS", "PostgreSQL", "ShadCN UI"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          Comprehensive event management platform for Model United Nations with scalable backend 
          and integrated payment processing.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Achievements:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Handled 300+ registrations with 100% uptime via scalable backend</li>
            <li>Saved 21% in payment processing fees by switching to Cashfree</li>
            <li>Deployed platform for end-to-end event ops within INR 9,000 budget</li>
            <li>Delivered complete solution in under 2 months</li>
            <li>UPI gateway integration for seamless payments</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Laundry System",
    description: "Woxsen laundry management with QR-based bag drop",
    image: "/card/laundry.png",
    link: "https://laundry.woxsen.in",
    category: "IoT Solution",
    technologies: ["QR Codes", "Management System", "Real-time Tracking"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          An innovative laundry management system for Woxsen University using QR codes 
          for efficient bag tracking and management.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Innovation:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>QR code-based bag identification</li>
            <li>Real-time status tracking</li>
            <li>Automated notifications</li>
            <li>Efficient workflow management</li>
            <li>Student-friendly interface</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Spotify Top 100 Analysis",
    description: "Segmenting Spotify music data to predict song hit potential",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Spotify-Top-100-Analysis",
    link: "https://github.com/DeathSurfing/Spotify-Top-100-Analysis",
    category: "Data Science",
    technologies: ["Python", "Pandas", "Machine Learning", "Data Analysis", "Spotify API"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          A comprehensive data science project analyzing Spotify's top 100 tracks to identify 
          patterns and predict song hit potential using machine learning techniques.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Analysis Highlights:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Feature extraction from audio characteristics</li>
            <li>Clustering analysis for song segmentation</li>
            <li>Predictive modeling for hit potential</li>
            <li>Data visualization and insights</li>
            <li>Statistical analysis of music trends</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Slang Translator",
    description: "AI-powered slang translator using LLaMA 3.1",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Slang-Translator",
    link: "https://github.com/DeathSurfing/Slang-Translator",
    category: "AI/ML Project",
    technologies: ["LLaMA 3.1", "Natural Language Processing", "Python", "AI"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          An innovative AI-powered tool that translates modern slang and colloquialisms 
          using the advanced LLaMA 3.1 language model.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">AI Innovation:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Advanced language model integration</li>
            <li>Context-aware translation</li>
            <li>Real-time slang processing</li>
            <li>Cultural context understanding</li>
            <li>Continuous learning capabilities</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 6,
    name: "CNN From Scratch",
    description: "A convolutional neural network built from scratch in Rust",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/CNN-From-Scratch",
    link: "https://github.com/DeathSurfing/CNN-From-Scratch",
    category: "Deep Learning",
    technologies: ["Rust", "Neural Networks", "Deep Learning", "Linear Algebra"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          A complete implementation of a Convolutional Neural Network built from scratch 
          in Rust, demonstrating deep understanding of neural network fundamentals.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Technical Achievement:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Built entirely from scratch in Rust</li>
            <li>Custom backpropagation implementation</li>
            <li>Optimized matrix operations</li>
            <li>Memory-safe neural network architecture</li>
            <li>Performance-focused design</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 7,
    name: "NoteRefactor",
    description: "Interactive notebook tool for cleaning and refactoring text data",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/NoteRefactor",
    link: "https://github.com/DeathSurfing/NoteRefactor",
    category: "Development Tool",
    technologies: ["Text Processing", "Data Cleaning", "Interactive UI", "Python"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          An interactive notebook tool designed to help developers and researchers 
          clean and refactor text data efficiently with automated suggestions.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Tool Features:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Interactive text processing interface</li>
            <li>Automated cleaning suggestions</li>
            <li>Pattern recognition and replacement</li>
            <li>Batch processing capabilities</li>
            <li>Export and integration features</li>
          </ul>
        </div>
      </div>
    )
  }

]

export default function ProjectsPage() {
  const [view, setView] = useState<"cards" | "table">("cards")

  // Prepare card items for the Apple Cards Carousel
  const cardItems = projects.map((project, index) => (
    <Card 
      key={project.id} 
      card={{
        src: project.image,
        title: project.name,
        category: project.category,
        content: project.content
      }}
      index={index}
      layout={true}
    />
  ))

  // Prepare items for the expandable card list
  const expandableCardItems = projects.map(project => ({
    id: project.id,
    name: project.name,
    designation: project.description,
    image: project.image,
    link: project.link,
    technologies: project.technologies
  }))

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(val) => val && setView(val as "cards" | "table")}
        >
          <ToggleGroupItem value="cards">Card View</ToggleGroupItem>
          <ToggleGroupItem value="table">Table View</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {view === "cards" ? (
        <Carousel items={cardItems} />
      ) : (
        <ExpandableCardDemo cards={expandableCardItems} />
      )}
    </div>
  )
}

