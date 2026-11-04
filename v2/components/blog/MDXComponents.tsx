import { isValidElement, type ComponentProps, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import type { MDXComponents as MDXComponentsType } from "mdx/types"

import CodeBlock from "./CodeBlock"
import MermaidDiagram from "./MermaidDiagram"
import { slugifyHeading } from "@/lib/slug"

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
      className="my-8 h-auto w-full border border-line object-cover"
    />
  ),
  a: (props: ComponentProps<"a">) => (
    <Link
      href={props.href || ""}
      className="link-underline text-foreground"
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
      className="mt-14 mb-4 border-b border-line pb-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      id={props.id ?? slugifyHeading(textFromNode(props.children))}
      className="mt-12 mb-4 border-t border-line pt-6 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-2 text-xl font-medium tracking-tight text-foreground"
      {...props}
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="mt-6 mb-2 text-lg font-medium text-foreground" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-5 text-base leading-body text-ring" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-signal bg-surface px-5 py-4 text-body leading-relaxed italic text-ring"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="my-5 list-disc space-y-2 pl-5 marker:text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-5 list-decimal space-y-2 pl-5 marker:text-muted-foreground" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="text-base leading-body text-ring" {...props} />
  ),
  hr: () => <hr className="my-12 border-t border-line" />,
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 overflow-x-auto border border-line">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="border-b border-line bg-surface" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="px-4 py-2.5 text-left font-medium text-foreground" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-t border-line px-4 py-2.5 text-ring" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: ComponentProps<"em">) => <em className="italic text-ring" {...props} />,
}
