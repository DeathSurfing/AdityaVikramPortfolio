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
      className="my-6 w-full h-auto rounded-sm border border-[#262626] object-cover"
    />
  ),
  a: (props: any) => (
    <Link
      href={props.href || ""}
      className="text-[#e5e5e5] underline decoration-[#3a3a3a] underline-offset-4 transition-colors hover:decoration-[#e5e5e5]"
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
        <div className="my-6 overflow-hidden rounded-sm border border-[#262626]">
          <pre className="!m-0 overflow-x-auto bg-[#141414] p-4 font-mono text-sm text-[#c9d1d9]">
            <code className={children.props.className}>{children.props.children}</code>
          </pre>
        </div>
      )
    }
    return (
      <pre className="my-6 overflow-x-auto rounded-sm border border-[#262626] bg-[#141414] p-4 font-mono text-sm text-[#c9d1d9]">
        {children}
      </pre>
    )
  },
  h1: (props: any) => (
    <h1
      className="mt-12 mb-4 border-b border-[#1f1f1f] pb-2 text-3xl font-semibold tracking-tight text-[#e5e5e5] lg:text-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-[#e5e5e5] lg:text-3xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 mb-2 text-xl font-medium tracking-tight text-[#e5e5e5] lg:text-2xl"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="mt-6 mb-2 text-lg font-medium text-[#e5e5e5]"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="mb-4 text-base leading-relaxed text-[#b0b0b0]" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="my-6 border-l-2 border-[#3a3a3a] pl-4 italic text-[#8a8a8a]"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5 marker:text-[#666]" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5 marker:text-[#666]" {...props} />
  ),
  li: (props: any) => (
    <li className="text-base leading-relaxed text-[#b0b0b0]" {...props} />
  ),
  hr: () => <hr className="my-10 border-t border-[#1f1f1f]" />,
  table: (props: any) => (
    <div className="my-6 overflow-x-auto rounded-sm border border-[#262626]">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="border-b border-[#262626] bg-[#141414]" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-2 text-left font-medium text-[#e5e5e5]" {...props} />
  ),
  td: (props: any) => (
    <td className="border-t border-[#1f1f1f] px-4 py-2 text-[#b0b0b0]" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-[#e5e5e5]" {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,
}
