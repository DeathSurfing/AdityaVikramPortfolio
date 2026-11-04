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
    <figure className="my-8 overflow-hidden border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-4 py-2">
        <span className="font-mono text-label uppercase tracking-heading text-muted-foreground">
          {language}
        </span>
        <CopyButton code={code} />
      </figcaption>
      <pre className="m-0 overflow-x-auto bg-background p-4 font-mono text-body-sm leading-relaxed text-ring sm:p-5" tabIndex={0}>
        <code className={className}>{children}</code>
      </pre>
    </figure>
  )
}
