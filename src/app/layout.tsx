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
  title: "MaxAI Writer — Professional AI Writing Tools",
  description:
    "Free AI-powered writing tools for professionals. Generate resumes, cover letters, emails, LinkedIn bios, and more in seconds.",
  keywords: [
    "AI writing tools",
    "AI resume builder",
    "AI cover letter generator",
    "AI email writer",
    "free AI tools",
  ],
  openGraph: {
    title: "MaxAI Writer — Professional AI Writing Tools",
    description:
      "Free AI-powered writing tools. Generate resumes, cover letters, emails & more in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxAI Writer — Professional AI Writing Tools",
    description:
      "Free AI-powered writing tools. Generate resumes, cover letters, emails & more in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
