import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Problem from "@/components/sections/Problem"
import Solution from "@/components/sections/Solution"
import Features from "@/components/sections/Features"

/**
 * Temporary placeholder — will be replaced with the full
 * landing page in Phase 2 (Tasks 5–11).
 */
export default function Page() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col min-h-dvh">
        <Hero />
        <Problem />
        <Solution />
        <Features />
      </main>

      <Footer />
    </>
  )
}
