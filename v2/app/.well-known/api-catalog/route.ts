import { apiEndpoints, openApiUrl } from "@/data/api"
import { profile } from "@/data/profile"

export const dynamic = "force-static"

// RFC 9727 API catalog. Declares the site's HTTP APIs for automated discovery,
// with the registered link relations service-desc, service-doc, and status.
// https://www.rfc-editor.org/rfc/rfc9727
//
// pruned: "item" links. RFC 9727 section 5.1 defines them for catalogs that
// only list a set of API entry points; this document links the description,
// docs, and status for each API instead, which is the richer relation set.
export function GET() {
  const linkset = [
    // The catalog itself, and the documents an agent should read to find its
    // way around the site.
    {
      anchor: `${profile.url}/.well-known/api-catalog`,
      "service-desc": [{ href: openApiUrl, type: "application/json" }],
      "service-doc": [
        { href: `${profile.url}/llms.txt`, type: "text/plain" },
        { href: `${profile.url}/sitemap.xml`, type: "application/xml" },
        { href: `${profile.url}/feed.xml`, type: "application/rss+xml" },
      ],
    },
    // One entry per API, anchored at the endpoint itself.
    ...apiEndpoints.map((endpoint) => {
      const url = `${profile.url}${endpoint.path.replace("{slug}", "{slug}")}`
      return {
        anchor: url,
        "service-desc": [{ href: openApiUrl, type: "application/json" }],
        "service-doc": [{ href: `${profile.url}/llms.txt`, type: "text/plain" }],
        status: [{ href: url, type: "application/json" }],
      }
    }),
  ]

  return new Response(JSON.stringify({ linkset }, null, 2), {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  })
}
