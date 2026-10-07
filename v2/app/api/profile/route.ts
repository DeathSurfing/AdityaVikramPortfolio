import { profile } from "@/data/profile"
import { skillCategories } from "@/data/skills"
import { experiences } from "@/data/identity"
import { projects } from "@/data/projects"
import { getAllPosts } from "@/lib/blog"

export const dynamic = "force-static"

export function GET() {
  return Response.json({
    name: profile.name,
    alternateNames: profile.alternateNames,
    headline: profile.headline,
    title: profile.title,
    description: profile.shortBio,
    url: profile.url,
    image: `${profile.url}${profile.image}`,
    email: profile.email,
    location: profile.location,
    jobTitles: profile.jobTitles,
    knowsAbout: profile.knowsAbout,
    sameAs: profile.sameAs,
    affiliations: profile.affiliations,
    experience: experiences,
    skills: skillCategories,
    projects: projects.map((p) => ({
      slug: p.slug,
      name: p.name,
      status: p.status,
      url: `${profile.url}/projects/${p.slug}`,
    })),
    writing: getAllPosts().map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      url: `${profile.url}/blog/${p.slug}`,
    })),
  })
}
