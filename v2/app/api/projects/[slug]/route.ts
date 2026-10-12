import { getProject, projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { projectJsonLd } from "@/lib/schema"

export const dynamic = "force-static"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) {
    return Response.json({ error: "Not found", slug }, { status: 404 })
  }

  return Response.json({
    ...project,
    url: `${profile.url}/projects/${project.slug}`,
    markdownUrl: `${profile.url}/projects/${project.slug}.md`,
    jsonLd: projectJsonLd(project),
  })
}
