import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Affhan Sourcing | Global Trade B2B Platform",
  description: "A modern logistics and global sourcing website by Affhan Group.",
  icons: {
    icon: "/logo-affhan.svg",
    shortcut: "/logo-affhan.svg",
    apple: "/logo-affhan.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body className="font-[family-name:var(--font-geist-sans)]">{children}</body>
    </html>
  );
}
