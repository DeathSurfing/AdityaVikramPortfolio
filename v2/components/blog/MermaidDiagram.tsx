"use client"

import { useEffect, useState } from "react"

// The module is only imported in the browser and shared by every diagram on
// the page, so the ~large Mermaid bundle loads once and only on posts that
// actually contain a diagram.
let mermaidPromise: Promise<typeof import("mermaid").default> | null = null
let renderCount = 0

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: "var(--font-mono)",
        fontSize: 14,
        themeVariables: {
          darkMode: true,
          background: "transparent",
          fontFamily: "var(--font-mono)",
          primaryColor: "#1f1f1f",
          primaryTextColor: "#f5f5f5",
          primaryBorderColor: "#6b6b6b",
          secondaryColor: "#292929",
          secondaryTextColor: "#f5f5f5",
          secondaryBorderColor: "#6b6b6b",
          tertiaryColor: "#171717",
          tertiaryTextColor: "#f5f5f5",
          tertiaryBorderColor: "#6b6b6b",
          lineColor: "#8b949e",
          textColor: "#e5e5e5",
          mainBkg: "#1f1f1f",
          nodeBorder: "#6b6b6b",
          clusterBkg: "#171717",
          clusterBorder: "#3f3f3f",
          edgeLabelBackground: "#171717",
          noteBkgColor: "#262626",
          noteTextColor: "#f5f5f5",
          noteBorderColor: "#6b6b6b",
          actorBkg: "#1f1f1f",
          actorBorder: "#6b6b6b",
          actorTextColor: "#f5f5f5",
          actorLineColor: "#3f3f3f",
          signalColor: "#a3a3a3",
          signalTextColor: "#e5e5e5",
          labelBoxBkgColor: "#1f1f1f",
          labelBoxBorderColor: "#6b6b6b",
          labelTextColor: "#f5f5f5",
          loopTextColor: "#e5e5e5",
          activationBkgColor: "#292929",
          activationBorderColor: "#6b6b6b",
          sequenceNumberColor: "#171717",
        },
        flowchart: {
          curve: "linear",
          htmlLabels: true,
          padding: 12,
          nodeSpacing: 32,
          rankSpacing: 40,
          useMaxWidth: true,
        },
      })

      return mermaid
    })
  }

  return mermaidPromise
}

export default function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("")
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const source = chart.trim()

    async function render() {
      try {
        const mermaid = await loadMermaid()
        // Render with the real webfont metrics; otherwise Mermaid measures a
        // fallback font and clips labels when the font swaps in.
        await document.fonts?.ready
        const result = await mermaid.render(`mermaid-${++renderCount}`, source)
        if (!cancelled) setSvg(result.svg)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [chart])

  return (
    <figure className="my-6 overflow-hidden rounded-sm border border-primary bg-card">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border bg-muted px-4 py-2">
        <span className="font-mono text-label uppercase tracking-heading text-muted-foreground">
          diagram
        </span>
      </figcaption>

      <div className="overflow-x-auto bg-background p-4 sm:p-6">
        {failed ? (
          <pre className="m-0 overflow-x-auto font-mono text-sm leading-relaxed text-foreground">
            <code>{chart.trim()}</code>
          </pre>
        ) : svg ? (
          <div
            data-mermaid
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div
            className="flex min-h-32 items-center justify-center font-mono text-label uppercase tracking-heading text-muted-foreground"
            aria-busy="true"
          >
            rendering diagram
          </div>
        )}
      </div>
    </figure>
  )
}
