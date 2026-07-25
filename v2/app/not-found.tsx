import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 font-sans text-[#e5e5e5] selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="font-mono text-xs text-[#8a8a8a]">404</span>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          page not found
        </h1>

        <p className="max-w-sm text-sm leading-relaxed text-[#8a8a8a]">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-2 font-mono text-xs text-[#b0b0b0] underline decoration-[#3a3a3a] underline-offset-4 transition-colors hover:text-[#e5e5e5] hover:decoration-[#e5e5e5]"
        >
          &larr; home
        </Link>
      </div>
    </main>
  )
}
