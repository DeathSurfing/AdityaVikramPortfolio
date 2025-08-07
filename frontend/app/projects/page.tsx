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
        content: project.content
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

