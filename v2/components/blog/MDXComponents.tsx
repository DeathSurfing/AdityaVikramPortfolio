import { isValidElement, type ComponentProps, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import type { MDXComponents as MDXComponentsType } from "mdx/types"

import CodeBlock from "./CodeBlock"
import MermaidDiagram from "./MermaidDiagram"

// rehype-highlight turns code into nested spans, so the plain text has to be
// collected from the React tree for the copy button.
function textFromNode(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textFromNode).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children)
  }
  return ""
}

export const mdxComponents: MDXComponentsType = {
  img: (props: ComponentProps<"img">) => (
    <Image
      src={typeof props.src === "string" ? props.src : ""}
      alt={props.alt || ""}
      width={800}
      height={450}
      className="my-6 w-full h-auto rounded-sm border border-primary object-cover"
    />
  ),
  a: (props: ComponentProps<"a">) => (
    <Link
      href={props.href || ""}
      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </Link>
  ),
  pre: (props: ComponentProps<"pre">) => {
    const child = Array.isArray(props.children) ? props.children[0] : props.children
    const childProps = isValidElement<{
      className?: string
      children?: ReactNode
    }>(child)
      ? child.props
      : null

    const className =
      typeof childProps?.className === "string" ? childProps.className : undefined
    const language = /language-([\w-]+)/.exec(className ?? "")?.[1]
    const code = textFromNode(childProps?.children ?? props.children).replace(/\n$/, "")

    if (language === "mermaid") {
      return <MermaidDiagram chart={code} />
    }

    return (
      <CodeBlock code={code} language={language} className={className}>
        {childProps?.children ?? props.children}
      </CodeBlock>
    )
  },
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mt-12 mb-4 border-b border-border pb-2 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-2 text-xl font-medium tracking-tight text-foreground lg:text-2xl"
      {...props}
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      className="mt-6 mb-2 text-lg font-medium text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-4 text-base leading-relaxed text-ring" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5 marker:text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-base leading-relaxed text-ring" {...props} />
  ),
  hr: () => <hr className="my-10 border-t border-border" />,
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-sm border border-primary">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="border-b border-primary bg-card" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="px-4 py-2 text-left font-medium text-foreground" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-t border-border px-4 py-2 text-ring" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: ComponentProps<"em">) => <em className="italic" {...props} />,
}
