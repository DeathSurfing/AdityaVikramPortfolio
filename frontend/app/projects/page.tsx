'use client'

import { useState, useMemo } from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
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
    id: 6,
    name: "Self-Hosted Bare-Metal Kubernetes Cluster",
    description: "High-availability compute cluster using Raspberry Pi's and recycled hardware with K3s orchestration",
    image: "/card/kubernetes.png",
    category: "DevOps & Infrastructure Engineering",
    technologies: ["Kubernetes", "K3s", "MetalLB", "Docker", "Raspberry Pi", "Proxmox", "Nginx"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          Built a production-grade high-availability compute cluster using sustainable hardware 
          with automated GitOps workflows and optimized for low-power operations.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Achievements:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Increased deployment reliability via multi-node K3s orchestration</li>
            <li>Reduced deployment overhead by 60% with GitOps-driven CI/CD pipelines</li>
            <li>Improved routing performance with MetalLB + Nginx for load balancing and SSL termination</li>
            <li>Enabled 15+ microservices on low-power hardware through optimized resource limits and autoscaling</li>
            <li>Built sustainable infrastructure using Raspberry Pi's and recycled hardware</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Woxsen Student Council Website",
    description: "Full-stack platform serving 600+ students with CRM dashboard and real-time analytics",
    image: "/card/woxsenstudentcouncil.png",
    link: "https://woxsenstudentcouncil.com",
    category: "Software & Web Development",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Redis", "Umami Analytics"],
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400">
          Enterprise-grade student platform with admin dashboard consolidating payments, forms, 
          and operational insights. Achieved massive cost savings through technical optimization.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Achievements:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Cut hosting and development expenses by 225% (INR 40k → 9k) via self-hosted KVM stack</li>
            <li>Improved API performance by 40% using MongoDB + Redis caching</li>
            <li>Built comprehensive admin CRM for payments, forms, and content management</li>
            <li>Deployed Umami analytics tracking 10k+ monthly interactions</li>
            <li>Real-time updates for 600+ students with optimized data pipeline</li>
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
    category: "AI & Machine Learning",
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
    id: 3,
    name: "Slang Translator",
    description: "AI-powered slang translator using LLaMA 3.1",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Slang-Translator",
    link: "https://github.com/DeathSurfing/Slang-Translator",
    category: "AI & Machine Learning",
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
    id: 2,
    name: "CNN From Scratch",
    description: "A convolutional neural network built from scratch in Rust",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/CNN-From-Scratch",
    link: "https://github.com/DeathSurfing/CNN-From-Scratch",
    category: "AI & Machine Learning",
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
    id: 1,
    name: "NoteRefactor",
    description: "Interactive notebook tool for cleaning and refactoring text data",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/NoteRefactor",
    link: "https://github.com/DeathSurfing/NoteRefactor",
    category: "Software & Web Development",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTech, setSelectedTech] = useState<string[]>([])

  // Extract unique categories and technologies
  const categories = ["All", ...new Set(projects.map(p => p.category))]
  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies || []))]

  // Filter projects based on selected category and technologies
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const categoryMatch = selectedCategory === "All" || project.category === selectedCategory
      const techMatch = selectedTech.length === 0 || 
        (project.technologies && selectedTech.every(tech => project.technologies?.includes(tech)))
      return categoryMatch && techMatch
    })
  }, [selectedCategory, selectedTech])

  const toggleTechnology = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedTech([])
  }

  // Prepare card items for the Apple Cards Carousel
  const cardItems = filteredProjects.map((project, index) => (
    <Card 
      key={project.id} 
      card={{
        src: project.image,
        title: project.name,
        category: project.category,
        content: project.content,
        link: project.link
      }}
      index={index}
      layout={true}
    />
  ))


  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Technology</h3>
          <div className="flex flex-wrap gap-2">
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => toggleTechnology(tech)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTech.includes(tech)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters & Clear */}
        {(selectedCategory !== "All" || selectedTech.length > 0) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:bg-secondary-foreground/10 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTech.map(tech => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button
                  onClick={() => toggleTechnology(tech)}
                  className="hover:bg-secondary-foreground/10 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <Carousel items={cardItems} />
    </div>
  )
}

