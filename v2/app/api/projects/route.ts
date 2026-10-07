import { profile } from "@/data/profile"
import { projects } from "@/data/projects"

export const dynamic = "force-static"

export function GET() {
  return Response.json({
    count: projects.length,
    url: `${profile.url}/projects`,
    projects: projects.map((project) => ({
      ...project,
      url: `${profile.url}/projects/${project.slug}`,
    })),
  })
}
