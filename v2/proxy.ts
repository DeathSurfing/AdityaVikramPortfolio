import { NextRequest, NextResponse } from "next/server"

import {
  blogIndexMarkdown,
  experiencePageMarkdown,
  homeMarkdown,
  llmsFullTxt,
  llmsTxt,
  postMarkdown,
  projectMarkdown,
  projectsIndexMarkdown,
  resumeMarkdown,
} from "@/lib/markdown"

// Markdown for Agents: agents sending `Accept: text/markdown` get plain text
// instead of the styled React tree. Everything else falls through to HTML.
// https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
//
// pruned: no second copy of the copy. Markdown is rendered from the same data
// modules and raw .mdx bodies the HTML pages already use (see lib/markdown.ts).
//
// Proxy runs on the Node.js runtime by default, which is required here because
// markdown rendering reads the .mdx files from disk. Do not add a `runtime`
// option: it is not supported in proxy files and throws.
export const config = {
  matcher: [
    "/",
    "/blog",
    "/blog/:slug",
    "/resume",
    "/projects",
    "/projects/:slug",
    "/experience",
    "/llms.txt",
    "/llms-full.txt",
  ],
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

function textResponse(body: string): NextResponse {
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
  })
}

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  const wantsMarkdown = accept.includes("text/markdown")
  const path = request.nextUrl.pathname

  // llms.txt is plain text by convention, served regardless of Accept.
  if (path === "/llms.txt") return textResponse(llmsTxt())
  if (path === "/llms-full.txt") return textResponse(llmsFullTxt())

  if (!wantsMarkdown) return NextResponse.next()

  if (path === "/") return markdownResponse(homeMarkdown())
  if (path === "/blog") return markdownResponse(blogIndexMarkdown())
  if (path === "/resume") return markdownResponse(resumeMarkdown())
  if (path === "/projects") return markdownResponse(projectsIndexMarkdown())
  if (path === "/experience") return markdownResponse(experiencePageMarkdown())

  const projectPrefix = "/projects/"
  if (path.startsWith(projectPrefix)) {
    const body = projectMarkdown(path.slice(projectPrefix.length))
    if (body) return markdownResponse(body)
  }

  const postPrefix = "/blog/"
  if (path.startsWith(postPrefix)) {
    const body = postMarkdown(path.slice(postPrefix.length))
    if (body) return markdownResponse(body)
  }

  return NextResponse.next()
}
