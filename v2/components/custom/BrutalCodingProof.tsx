"use client"

export default function BrutalCodingProof() {
  return (
    <section className="relative bg-background py-24 px-6 md:px-12">
      {/* Section Title */}
      <div className="mb-16 max-w-5xl">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight">
          PROOF <span className="underline decoration-4">OF WORK</span>
        </h2>
        <p className="mt-4 text-lg max-w-xl">
          Not claims. Not vibes. Just shipped code and solved problems.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-7xl">
        {/* ================= GITHUB ================= */}
        <div className="relative border-4 border-black bg-card p-6 shadow-[10px_10px_0px_#000]">
          <div className="absolute -top-6 left-6 bg-black text-white px-4 py-1 text-sm font-bold">
            GITHUB
          </div>

          <p className="mb-6 font-semibold text-lg">
            Commits, consistency, and real-world projects.
          </p>

          <div className="space-y-6">
            {/* ========= ACTIVITY GRAPH ========= */}
            {/* Light */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-compact&hide_border=true"
              alt="GitHub activity graph"
              className="block dark:hidden w-full border-2 border-black bg-white"
            />
            {/* Dark */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=deathSurfing&theme=github-dark&hide_border=true"
              alt="GitHub activity graph dark"
              className="hidden dark:block w-full border-2 border-black bg-white"
            />

            {/* ========= CONTRIBUTION HEATMAP ========= */}
            {/* Light */}
            <img
              src="https://ghchart.rshah.org/000000/deathSurfing"
              alt="GitHub contributions heatmap"
              className="block dark:hidden w-full border-2 border-black bg-white p-2"
            />
            {/* Dark */}
            <img
              src="https://ghchart.rshah.org/ffffff/deathSurfing"
              alt="GitHub contributions heatmap dark"
              className="hidden dark:block w-full border-2 border-black bg-black p-2"
            />
          </div>
        </div>

        {/* ================= LEETCODE ================= */}
        <div className="relative border-4 border-black bg-card p-6 shadow-[-10px_10px_0px_#000]">
          <div className="absolute -top-6 left-6 bg-black text-white px-4 py-1 text-sm font-bold">
            LEETCODE
          </div>

          <p className="mb-6 font-semibold text-lg">
            Pattern recognition, speed, and algorithmic discipline.
          </p>

          <div className="space-y-6">
            {/* ========= LEETCODE CARD ========= */}
            {/* Light */}
            <img
              src="https://leetcard.jacoblin.cool/adityavikrammahendru?theme=light&font=JetBrains%20Mono&border=2&radius=0"
              alt="LeetCode stats"
              className="block dark:hidden w-full border-2 border-black bg-white"
            />
            {/* Dark */}
            <img
              src="https://leetcard.jacoblin.cool/adityavikrammahendru?theme=dark&font=JetBrains%20Mono&border=2&radius=0"
              alt="LeetCode stats dark"
              className="hidden dark:block w-full border-2 border-black bg-black"
            />

          </div>
        </div>
      </div>

      {/* Bottom Statement */}
      <div className="mt-20 border-4 border-black bg-muted px-8 py-10 max-w-5xl shadow-[8px_8px_0px_#000]">
        <p className="text-2xl md:text-3xl font-extrabold">
          CONSISTENCY BEATS TALENT.
          <br />
          <span className="text-base font-medium">
            These charts update themselves. I don’t.
          </span>
        </p>
      </div>
    </section>
  )
}
