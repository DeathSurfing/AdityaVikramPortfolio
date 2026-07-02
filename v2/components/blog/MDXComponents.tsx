import Image from "next/image"
import Link from "next/link"
import type { MDXComponents as MDXComponentsType } from "mdx/types"

export const mdxComponents: MDXComponentsType = {
  img: (props: any) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={800}
      height={450}
      className="border-2 border-border shadow-md rounded my-6 w-full h-auto object-cover"
    />
  ),
  a: (props: any) => (
    <Link
      href={props.href || ""}
      className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors font-semibold"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </Link>
  ),
  pre: (props: any) => {
    const children = props.children
    if (children?.props?.className) {
      return (
        <div className="my-6 border-2 border-border rounded shadow-md overflow-hidden">
          <div className="h-2 bg-border flex">
            <div className="flex-1 bg-primary" />
            <div className="flex-1 bg-background" />
            <div className="flex-1 bg-foreground" />
          </div>
          <pre className="!m-0 !border-0 !shadow-none !bg-foreground !text-background !p-4 !font-mono !text-sm !overflow-x-auto">
            <code className={children.props.className}>{children.props.children}</code>
          </pre>
        </div>
      )
    }
    return (
      <pre className="my-6 border-2 border-border rounded shadow-md bg-foreground text-background p-4 font-mono text-sm overflow-x-auto">
        {children}
      </pre>
    )
  },
  h1: (props: any) => (
    <h1
      className="text-3xl lg:text-4xl font-bold font-head mt-12 mb-4 pb-2 border-b-2 border-border"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-2xl lg:text-3xl font-semibold font-head mt-10 mb-3"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-xl lg:text-2xl font-medium font-head mt-8 mb-2"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-medium font-head mt-6 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-base leading-relaxed mb-4 text-foreground/90" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground bg-muted/50 rounded-r"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-1.5 my-4" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-1.5 my-4" {...props} />
  ),
  li: (props: any) => <li className="text-base leading-relaxed" {...props} />,
  hr: () => <hr className="border-t-2 border-border my-10" />,
  table: (props: any) => (
    <div className="my-6 border-2 border-border rounded shadow-md overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-muted border-b-2 border-border" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-2 text-left font-bold font-head" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-2 border-t border-border/50" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-bold text-foreground" {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,
}
