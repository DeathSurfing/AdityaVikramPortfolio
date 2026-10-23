"use client"

import { useEffect, useRef, useState } from "react"

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can be denied (insecure origin, permissions).
      // The code stays selectable, so there is nothing else to do here.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
        className="inline-flex shrink-0 items-center border border-border bg-background px-2 py-1 font-mono text-label uppercase tracking-heading text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {copied ? "copied" : "copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  )
}
