"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "./Container"

const NAV_LINKS = [
  { label: "Features",     href: "#features"  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing"   },
] as const

const mobileItemVariants: Variants = {
  hidden:  { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.18, ease: "easeOut" },
  }),
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ── Scroll detection (50px threshold per spec) ──────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ── Close mobile menu on Escape ────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /* ── Lock body scroll when mobile menu is open ────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled && "border-b"
        )}
        style={{
          backgroundColor: scrolled
            ? "rgba(12, 12, 12, 0.80)"
            : "transparent",
          backdropFilter:       scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderColor: "var(--color-border)",
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* ── Logo: 'Pitch' white + 'Snap' white ── */}
            <Link
              href="/"
              className="flex items-center gap-0 cursor-pointer tracking-tight"
              style={{ fontFamily: "var(--font-inter)", fontSize: "20px" }}
              aria-label="PitchSnap home"
            >
              <span style={{ color: "var(--color-text-primary)", fontWeight: 400 }}>Pitch</span>
              <span style={{ color: "#FFFFFF", fontWeight: 700 }}>Snap</span>
            </Link>

            {/* ── Desktop nav links ── */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Page sections">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-150 cursor-pointer"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                id="nav-login-btn"
                className="text-sm font-medium transition-colors duration-150 cursor-pointer"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                id="nav-signup-btn"
                className="btn-white text-sm"
              >
                Get Started Free
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-md transition-colors duration-150 cursor-pointer"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {mobileOpen
                    ? <X    className="w-5 h-5" />
                    : <Menu className="w-5 h-5" />
                  }
                </motion.div>
              </AnimatePresence>
            </button>

          </div>
        </Container>
      </motion.nav>

      {/* ── Mobile slide drawer ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{
              backgroundColor: "rgba(12, 12, 12, 0.96)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderColor: "var(--color-border)",
            }}
          >
            <Container>
              <div className="py-4 flex flex-col gap-1">

                {/* Nav links */}
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3.5 text-base font-medium transition-colors duration-150 cursor-pointer border-b"
                      style={{
                        color: "var(--color-text-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth CTAs */}
                <motion.div
                  custom={NAV_LINKS.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-4 flex flex-col gap-2"
                >
                  <Link
                    href="/login"
                    id="mobile-login-btn"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-3 text-sm font-medium rounded-full border transition-colors duration-150 cursor-pointer"
                    style={{
                      color: "var(--color-text-secondary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    id="mobile-signup-btn"
                    onClick={() => setMobileOpen(false)}
                    className="btn-white text-center py-3 text-sm rounded-full cursor-pointer"
                  >
                    Get Started Free
                  </Link>
                </motion.div>

              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
