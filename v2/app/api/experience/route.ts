import { experiences } from "@/data/identity"
import { profile } from "@/data/profile"

export const dynamic = "force-static"

export function GET() {
  return Response.json({
    url: `${profile.url}`,
    count: experiences.length,
    experience: experiences.map((exp) => ({
      ...exp,
      organization: exp.company,
    })),
  })
}
