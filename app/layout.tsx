import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ScrollProgressIndicator } from "@/components/layout/ScrollProgressIndicator"
import { SmoothCursor } from "@/components/ui/SmoothCursor"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "PitchSnap — Win Clients in 10 Seconds",
    template: "%s | PitchSnap",
  },
  description:
    "AI-powered proposal generator for freelancers. Generate cold emails, LinkedIn outreach, and full proposals instantly.",
  keywords: [
    "freelance proposal generator",
    "AI proposal tool",
    "cold email generator",
    "freelancer SaaS",
    "outreach tool",
    "client proposal AI",
  ],
  authors: [{ name: "PitchSnap" }],
  creator: "PitchSnap",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pitchsnap.app",
    siteName: "PitchSnap",
    title: "PitchSnap — Win Clients in 10 Seconds",
    description:
      "AI-powered proposal generator for freelancers. Generate cold emails, LinkedIn outreach, and full proposals instantly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchSnap — Win Clients in 10 Seconds",
    description:
      "AI-powered proposal generator for freelancers. Generate cold emails, LinkedIn outreach, and full proposals instantly.",
    creator: "@pitchsnap",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("dark antialiased", inter.variable)}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="bg-[var(--color-bg)] text-[var(--color-text-primary)] min-h-dvh overflow-x-hidden w-full"
      >
        <SmoothCursor />
        <ScrollProgressIndicator />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
