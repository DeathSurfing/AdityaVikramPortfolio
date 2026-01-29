"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function BrutalCodingProof() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Wait for theme to be resolved
  if (!mounted) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="h-96 animate-pulse bg-muted rounded-lg" />
        </div>
      </section>
    )
  }

  const isDark = resolvedTheme === "dark"

  const githubActivitySrc = isDark
    ? "https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-dark&hide_border=true&area=true&custom_title=Contribution%20Graph"
    : "https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-compact&hide_border=true&area=true&custom_title=Contribution%20Graph"

  // Using GitHub's default green color scheme
  const githubHeatmapSrc = isDark
    ? "https://ghchart.rshah.org/39d353/deathSurfing"
    : "https://ghchart.rshah.org/39d353/deathSurfing"

  const leetcodeSrc = isDark
    ? "https://leetcard.jacoblin.cool/adityavikrammahendru?theme=dark&font=JetBrains%20Mono&border=2&radius=0"
    : "https://leetcard.jacoblin.cool/adityavikrammahendru?theme=light&font=JetBrains%20Mono&border=2&radius=0"

  return (
    <section className="relative min-h-screen bg-background py-20 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12 md:mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            PROOF OF WORK
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium">
            Not claims. Not vibes. Just shipped code and solved problems.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* ================= GITHUB COLUMN ================= */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
                <span className="text-primary">→</span>
                GITHUB
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Commits, consistency, and real-world projects.
              </p>
            </div>

            <div className="space-y-6">
              {/* Activity Graph */}
              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={githubActivitySrc}
                  alt="GitHub Activity Graph"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Contribution Heatmap */}
              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow p-6">
                <img
                  src={githubHeatmapSrc}
                  alt="GitHub Contribution Heatmap"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ================= LEETCODE COLUMN ================= */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
                <span className="text-primary">→</span>
                LEETCODE
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Pattern recognition, speed, and algorithmic discipline.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <img
                src={leetcodeSrc}
                alt="LeetCode Stats"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-border">
          <p className="text-sm md:text-base font-mono text-muted-foreground tracking-wide">
            <span className="font-bold text-foreground">CONSISTENCY BEATS TALENT.</span>{" "}
            These charts update themselves.
          </p>
        </div>
      </div>
    </section>
  )
}