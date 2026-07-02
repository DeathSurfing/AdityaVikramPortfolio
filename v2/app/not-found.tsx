import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block px-6 py-3 bg-primary text-primary-foreground border-2 border-border shadow-md -rotate-1 mb-6">
          <span className="text-xs font-black uppercase tracking-widest">
            Error 404
          </span>
        </div>

        <h1 className="font-head text-6xl lg:text-8xl font-bold mb-4">
          PAGE NOT FOUND
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved to another
          dimension.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-border bg-primary text-primary-foreground px-6 py-3 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            &larr; Back Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-border bg-background px-6 py-3 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
