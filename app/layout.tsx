import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "PitchSnap — AI Proposal Generator for Freelancers",
    template: "%s | PitchSnap",
  },
  description:
    "Generate winning freelance proposals and cold outreach messages in under 10 seconds using AI. Crafted for freelancers, agency owners, and indie developers.",
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
    title: "PitchSnap — AI Proposal Generator for Freelancers",
    description:
      "Generate winning freelance proposals and cold outreach messages in under 10 seconds using AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchSnap — AI Proposal Generator for Freelancers",
    description:
      "Generate winning freelance proposals in seconds. Built for freelancers who want to win more clients.",
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
      suppressHydrationWarning
      className={cn("antialiased", inter.variable)}
    >
      <body className="bg-background text-foreground min-h-dvh overflow-x-hidden">
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
