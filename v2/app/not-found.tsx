import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 font-sans text-foreground selection:bg-foreground selection:text-background">
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="font-mono text-xs text-muted-foreground">404</span>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          page not found
        </h1>

        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-2 font-mono text-xs text-ring underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
        >
          &larr; home
        </Link>
      </div>
    </main>
  )
}
