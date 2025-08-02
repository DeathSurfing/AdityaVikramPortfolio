'use client'

import { useState } from "react"
import { CardSwipe } from "@/components/ui/card-swipe"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
    link: "https://woxsenstudetcouncil.com"
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
  }
]

export default function ProjectsPage() {
  const [view, setView] = useState<"cards" | "table">("cards")

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
        <CardSwipe
          images={projects.map(p => ({ src: p.image, alt: p.name }))}
          autoplayDelay={2000}
          slideShadows={false}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-24 h-16 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

