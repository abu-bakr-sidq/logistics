import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Affhan Sourcing | Global Trade B2B Platform",
  description: "A modern logistics and global sourcing website by Affhan Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`} data-scroll-behavior="smooth">
      <body className="font-[family-name:var(--font-geist-sans)] overflow-x-hidden w-full relative">{children}</body>
    </html>
  );
}
