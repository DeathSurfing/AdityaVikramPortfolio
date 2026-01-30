"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function BrutalCodingProof() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-2xl font-black">Loading…</div>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const githubActivitySrc = isDark
    ? "https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-dark&hide_border=true&area=true"
    : "https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-compact&hide_border=true&area=true"

  const githubHeatmapSrc =
    "https://ghchart.rshah.org/39d353/deathSurfing"

  const leetcodeSrc = isDark
    ? "https://leetcard.jacoblin.cool/adityavikrammahendru?theme=dark&font=JetBrains%20Mono&border=2&radius=0"
    : "https://leetcard.jacoblin.cool/adityavikrammahendru?theme=light&font=JetBrains%20Mono&border=2&radius=0"

  return (
    <section className="min-h-screen flex items-center px-6 lg:px-20 py-20 relative bg-background">
      <div className="max-w-7xl mx-auto">

        {/* ================= TITLE ================= */}
        <div className="mb-16">
          <div className="inline-block bg-foreground p-1 mb-4 -rotate-1">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-background px-6 py-3 tracking-tight">
              PROOF OF WORK
            </h2>
          </div>

          <div className="bg-yellow-300 border-4 border-black p-4 md:p-6 rotate-[0.5deg] shadow-xl max-w-3xl">
            <p className="text-lg md:text-xl font-black text-black leading-relaxed">
              Not claims. Not vibes.{" "}
              <span className="bg-black text-yellow-300 px-2 py-1">
                Just shipped code
              </span>{" "}
              and{" "}
              <span className="bg-black text-yellow-300 px-2 py-1">
                solved problems.
              </span>
            </p>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">

          {/* ================= GITHUB ================= */}
          <div className="space-y-6">
            <div className="bg-card text-card-foreground border-4 border-black p-4 rotate-[-0.5deg] shadow-lg">
              <h3 className="text-3xl md:text-4xl font-black flex items-center gap-3">
                <span className="text-4xl">→</span> GITHUB
              </h3>
              <p className="mt-2 text-sm md:text-base font-bold text-muted-foreground">
                Commits, consistency, and real-world projects.
              </p>
            </div>

            {/* Activity Graph */}
            <div className="bg-card text-card-foreground border-4 border-black p-4 shadow-xl hover:shadow-2xl hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <div className="bg-muted border-2 border-black p-2 mb-3">
                <p className="text-xs font-black uppercase tracking-wider">
                  Activity Graph
                </p>
              </div>
              <img
                src={githubActivitySrc}
                alt="GitHub Activity Graph"
                className="w-full border-2 border-black bg-background"
                loading="lazy"
              />
            </div>

            {/* Heatmap */}
            <div className="bg-card text-card-foreground border-4 border-black p-4 shadow-xl hover:shadow-2xl hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <div className="bg-green-400 border-2 border-black p-2 mb-3">
                <p className="text-xs font-black uppercase tracking-wider text-black">
                  Contribution Streak
                </p>
              </div>
              <img
                src={githubHeatmapSrc}
                alt="GitHub Contribution Heatmap"
                className="w-full border-2 border-black bg-background"
                loading="lazy"
              />
            </div>
          </div>

          {/* ================= LEETCODE ================= */}
          <div className="space-y-6">
            <div className="bg-accent text-accent-foreground border-4 border-black p-4 rotate-[0.5deg] shadow-lg">
              <h3 className="text-3xl md:text-4xl font-black flex items-center gap-3">
                <span className="text-4xl">→</span> LEETCODE
              </h3>
              <p className="mt-2 text-sm md:text-base font-bold text-muted-foreground">
                Pattern recognition, speed, and algorithmic discipline.
              </p>
            </div>

            {/* LeetCode Card */}
            <div className="bg-card text-card-foreground border-4 border-black p-4 shadow-xl hover:shadow-2xl hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all">
              <div className="bg-orange-400 border-2 border-black p-2 mb-3">
                <p className="text-xs font-black uppercase tracking-wider text-black">
                  Problem Solving Stats
                </p>
              </div>
              <img
                src={leetcodeSrc}
                alt="LeetCode Stats"
                className="w-full border-2 border-black bg-background"
                loading="lazy"
              />
            </div>

            {/* Extra Stats */}
            <div className="bg-pink-400 border-4 border-black p-6 rotate-[-0.5deg] shadow-lg">
              <div className="space-y-3">
                {[
                  ["RUST", "LEARNING"],
                  ["PYTHON", "INTERMEDIATE"],
                  ["JAVASCRIPT", "INTERMEDIATE"],
                  ["C++", "INTERMEDIATE"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b-2 border-black pb-2 last:border-none"
                  >
                    <span className="font-black text-black text-sm">
                      {label}
                    </span>
                    <span className="bg-black text-pink-400 px-3 py-1 font-black text-xs">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM STATEMENT ================= */}
        <div className="relative">
          <div className="bg-primary text-primary-foreground border-4 border-black p-6 md:p-8 shadow-2xl rotate-[0.5deg]">
            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-center leading-tight">
              CONSISTENCY BEATS TALENT.{" "}
              <span className="bg-accent text-accent-foreground px-3 py-1 inline-block -rotate-1">
                These charts update themselves.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
