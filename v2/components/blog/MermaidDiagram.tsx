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
          primaryColor: "#121210",
          primaryTextColor: "#f4f1e8",
          primaryBorderColor: "#3d3932",
          secondaryColor: "#181815",
          secondaryTextColor: "#f4f1e8",
          secondaryBorderColor: "#3d3932",
          tertiaryColor: "#0a0a09",
          tertiaryTextColor: "#f4f1e8",
          tertiaryBorderColor: "#3d3932",
          lineColor: "#a8a49a",
          textColor: "#f4f1e8",
          mainBkg: "#121210",
          nodeBorder: "#3d3932",
          clusterBkg: "#0a0a09",
          clusterBorder: "#2a2823",
          edgeLabelBackground: "#0a0a09",
          noteBkgColor: "#1e1c18",
          noteTextColor: "#f4f1e8",
          noteBorderColor: "#ffcc00",
          actorBkg: "#121210",
          actorBorder: "#3d3932",
          actorTextColor: "#f4f1e8",
          actorLineColor: "#2a2823",
          signalColor: "#a8a49a",
          signalTextColor: "#f4f1e8",
          labelBoxBkgColor: "#121210",
          labelBoxBorderColor: "#3d3932",
          labelTextColor: "#f4f1e8",
          loopTextColor: "#f4f1e8",
          activationBkgColor: "#1e1c18",
          activationBorderColor: "#ffcc00",
          sequenceNumberColor: "#0a0a09",
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
    <figure className="my-8 overflow-hidden border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-4 py-2">
        <span className="font-mono text-label uppercase tracking-heading text-muted-foreground">
          diagram
        </span>
      </figcaption>

      <div className="overflow-x-auto bg-background p-4 sm:p-6" tabIndex={0}>
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
