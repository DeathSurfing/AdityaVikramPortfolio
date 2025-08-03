'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import HoverExpand from "@/components/ui/hover-expand"

import { Badge } from "@/components/ui/badge"
import { SparklesIcon } from "lucide-react"

type Project = {
  name: string
  description: string
  image: string
  link?: string
}

const projects: Project[] = [
  {
    name: "Woxsen Student Council",
    description: "Woxsen Student Council website with ShadCN components and Next.js",
    image: "/card/woxsenstudentcouncil.png",
    link: "https://woxsenstudentcouncil.com"
  },
  {
    name: "MUN Registration",
    description: "Multi-step registration app using ShadCN components",
    image: "/card/munreg.png",
    link: "https://mun.woxsenstudentcouncil.com"
  },
  {
    name: "Laundry System",
    description: "Woxsen laundry management with QR-based bag drop",
    image: "/card/laundry.png",
    link: "https://laundry.woxsen.in"
  },
  {
    name: "Spotify Top 100 Analysis",
    description: "Segmenting Spotify music data to predict song hit potential",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Spotify-Top-100-Analysis",
    link: "https://github.com/DeathSurfing/Spotify-Top-100-Analysis"
  },
  {
    name: "Slang Translator",
    description: "AI-powered slang translator using LLaMA 3.1",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/Slang-Translator",
    link: "https://github.com/DeathSurfing/Slang-Translator"
  },
  {
    name: "CNN From Scratch",
    description: "A convolutional neural network built from scratch in Rust",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/CNN-From-Scratch",
    link: "https://github.com/DeathSurfing/CNN-From-Scratch"
  },
  {
    name: "NoteRefactor",
    description: "Interactive notebook tool for cleaning and refactoring text data",
    image: "https://opengraph.githubassets.com/1/DeathSurfing/NoteRefactor",
    link: "https://github.com/DeathSurfing/NoteRefactor"
  }
]

export default function ProjectsPage() {
  const [view, setView] = useState<"hover" | "table">("hover")

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(val) => val && setView(val as "hover" | "table")}
        >
          <ToggleGroupItem value="hover">Hover View</ToggleGroupItem>
          <ToggleGroupItem value="table">Table View</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {view === "hover" ? (
        <section className="mx-auto w-full rounded-[24px] border border-black/5 p-2 shadow-sm">
          <div className="relative mx-auto flex w-full flex-col items-center justify-center rounded-[24px] border border-black/5 bg-neutral-800/5 shadow-sm md:gap-8">
            <article className="relative z-50 mt-8 flex flex-col items-center justify-center">
              <Badge
                variant="outline"
                className="mb-3 rounded-[14px] border border-black/10 bg-white text-base"
              >
                <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />
                Interactive Preview
              </Badge>
              <h1 className="max-w-2xl text-center text-3xl font-semibold tracking-tight">
                Hover over project images to expand
              </h1>
            </article>

            <div className="w-full p-4">
              <HoverExpand
                images={projects.map(p => p.image)}
                initialSelectedIndex={0}
                thumbnailHeight={200}
                modalImageSize={500}
                maxThumbnails={projects.length}
                renderThumbnail={(image, index) => (
                  <div className="p-2">
                    <div className="text-lg font-medium">{projects[index].name}</div>
                    <div className="text-sm text-gray-500">{projects[index].description}</div>
                  </div>
                )}
                renderModalContent={(image, index) => (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{projects[index].name}</h2>
                    <p className="text-gray-600 mb-4">{projects[index].description}</p>
                    {projects[index].link && (
                      <a
                        href={projects[index].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Visit Project
                      </a>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {project.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
