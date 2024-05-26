import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { TRPCReactProvider } from "~/trpc/react";
import { CSPostHogProvider } from "./providers";
import type { Metadata } from "next";

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
      <body>
        <TRPCReactProvider>
          <CSPostHogProvider>
            <div className="ml-2">{children}</div>
          </CSPostHogProvider>
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
