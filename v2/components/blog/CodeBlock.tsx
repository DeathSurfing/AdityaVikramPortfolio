import type { ReactNode } from "react"

import CopyButton from "./CopyButton"

interface CodeBlockProps {
  children: ReactNode
  /** Raw text of the block, used by the copy button. */
  code: string
  language?: string
  className?: string
}

export default function CodeBlock({
  children,
  code,
  language = "text",
  className,
}: CodeBlockProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-sm border border-primary bg-card">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border bg-muted px-4 py-2">
        <span className="font-mono text-label uppercase tracking-heading text-muted-foreground">
          {language}
        </span>
        <CopyButton code={code} />
      </figcaption>
      <pre className="m-0 overflow-x-auto bg-background p-4 font-mono text-sm leading-relaxed text-foreground">
        <code className={className}>{children}</code>
      </pre>
    </figure>
  )
}
