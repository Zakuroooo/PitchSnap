import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Container from "@/components/layout/Container"

/**
 * Temporary placeholder — will be replaced with the full
 * landing page in Phase 2 (Tasks 5–11).
 */
export default function Page() {
  return (
    <>
      <Navbar />

      <main className="min-h-dvh hero-ambient">
        {/* Padding-top accounts for fixed 64px navbar */}
        <Container className="pt-24 pb-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
              style={{
                borderColor: "var(--border-accent)",
                backgroundColor: "var(--violet-dim)",
                color: "var(--violet)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Foundation ready — Building landing page next
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-2xl">
              Win more clients with{" "}
              <span className="gradient-text">AI proposals</span>
            </h1>

            <p className="text-base sm:text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
              PitchSnap generates cold emails, LinkedIn messages, and full project
              proposals in under 10 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="/signup"
                id="hero-cta-primary"
                className="btn-gradient px-7 py-3 rounded-xl text-sm font-semibold cursor-pointer"
              >
                Get Started Free
              </a>
              <a
                href="#features"
                id="hero-cta-secondary"
                className="btn-ghost-accent px-7 py-3 rounded-xl text-sm cursor-pointer"
              >
                See Features
              </a>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  )
}
