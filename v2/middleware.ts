import { NextRequest, NextResponse } from "next/server"

import {
  blogIndexMarkdown,
  homeMarkdown,
  postMarkdown,
  resumeMarkdown,
} from "@/lib/markdown"

// Markdown for Agents: agents sending `Accept: text/markdown` get plain text
// instead of the styled React tree. Everything else falls through to HTML.
// https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
//
// pruned: no second copy of the copy. Markdown is rendered from the same data
// modules and raw .mdx bodies the HTML pages already use (see lib/markdown.ts).

// Node runtime is required because markdown rendering reads the .mdx files.
export const config = {
  runtime: "nodejs",
  matcher: ["/", "/blog", "/resume", "/blog/:slug"],
}

// ~4 chars per token, the usual rough estimate agents expect.
function approxTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

function markdownResponse(body: string): NextResponse {
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(approxTokens(body)),
      // Without this, an edge cache can key on URL alone and hand cached HTML
      // to an agent (or markdown to a browser).
      Vary: "Accept",
    },
  })
}

// HTML responses from Next already vary on rsc and Accept-Encoding but not on
// Accept, so add it there too and keep the cache key honest in both directions.
function passthrough(): NextResponse {
  const response = NextResponse.next()
  const vary = response.headers.get("Vary")
  response.headers.set("Vary", vary ? `${vary}, Accept` : "Accept")
  return response
}

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) return passthrough()

  const path = request.nextUrl.pathname

  if (path === "/") return markdownResponse(homeMarkdown())
  if (path === "/blog") return markdownResponse(blogIndexMarkdown())
  if (path === "/resume") return markdownResponse(resumeMarkdown())

  const body = postMarkdown(path.replace(/^\/blog\//, ""))
  if (body) return markdownResponse(body)

  return passthrough()
}
