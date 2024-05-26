import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, href }) => (
      <a className="underline" href={href}>
        {children}
      </a>
    ),
    h1: ({ children }) => (
      <h1 className="mb-4 text-2xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 text-xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 text-lg font-semibold">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-2">{children}</p>,
    ul: ({ children }) => <ul className="ml-4 list-disc">{children}</ul>,
    ...components,
  };
}
