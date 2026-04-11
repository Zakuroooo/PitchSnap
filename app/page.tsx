import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import LogoMarquee from "@/components/sections/LogoMarquee"
import Benefits from "@/components/sections/Benefits"
import Journey from "@/components/sections/Journey"
import HowItWorks from "@/components/sections/HowItWorks"
import Features from "@/components/sections/Features"
import Success from "@/components/sections/Success"
import Testimonials from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing"
import FAQ from "@/components/sections/FAQ"
import FinalCTA from "@/components/sections/FinalCTA"
import { FloatingBlobs } from "@/components/ui/floating-blobs"


/**
 * Full Landing Page Component
 */
export default function Page() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col min-h-dvh relative z-10 bg-transparent">
        <FloatingBlobs />
        <Hero />
        <LogoMarquee />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Benefits />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Journey />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <HowItWorks />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Features />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Success />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Testimonials />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Pricing />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <FAQ />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
