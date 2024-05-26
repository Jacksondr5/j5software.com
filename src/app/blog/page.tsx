import Link from "next/link";
import type { ReactNode } from "react";

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold">Blogs</h1>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">Weekend Blogs</h2>
        <div className="mb-4 ml-4">
          <Link className="underline" href="/blog/weekends/2024-05-26">
            2024-05-26
          </Link>
        </div>
        <h2>Projects</h2>
        <div className="mb-4 ml-4">
          <BlogLink href="/blog/projects/homelab-hardware">
            Homelab Hardware
          </BlogLink>
          <BlogLink href="/blog/projects/homelab-iac">Homelab IaC</BlogLink>
        </div>
      </div>
    </>
  );
}

const BlogLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <div className="underline">
    <Link href={href}>{children}</Link>
  </div>
);
