import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "J5 Software | Blog",
};

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="ml-2">{children}</div>;
}
