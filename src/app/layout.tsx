import { IBM_Plex_Mono } from "next/font/google";

// eslint-disable-next-line import/order
import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "next-themes";

import QueryProvider from "@/providers/QueryProvider";
import SidebarProvider from "@/providers/SidebarProvider";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GlyphBase - HTML Entity & Symbol Vault",
  description:
    "Easily search, find, and copy HTML entities and symbols with GlyphBase. A simple tool for developers and designers to access a vast collection of glyphs and their codes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.className} antialiased`}>
        <ThemeProvider attribute="class">
          <QueryProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
