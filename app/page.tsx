import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Problem from "@/components/sections/Problem"
import Solution from "@/components/sections/Solution"
import Features from "@/components/sections/Features"
import Testimonials from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing"
import { FloatingBlobs } from "@/components/ui/floating-blobs"

import { FloatingCTA } from "@/components/layout/FloatingCTA"

/**
 * Full Landing Page Component
 */
export default function Page() {
  return (
    <>
      <Navbar />
      <FloatingCTA />

      <main className="flex flex-col min-h-dvh relative z-10 bg-transparent">
        <FloatingBlobs />
        <Hero />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Problem />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Solution />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Features />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Testimonials />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Pricing />
      </main>

      <Footer />
    </>
  )
}
