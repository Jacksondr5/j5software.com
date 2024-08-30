import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CSPostHogProvider } from "./providers";
import type { Metadata } from "next";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "J5 Software",
  description: "Jackson Miller's personal website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "bg-green-2 min-h-screen font-sans antialiased",
          GeistSans.variable,
        )}
      >
        <CSPostHogProvider>{children}</CSPostHogProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
