"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Menu, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "./Container"

const NAV_LINKS = [
  { label: "Features",     href: "#features"  },
  { label: "How It Works", href: "#solution"  },
  { label: "Pricing",      href: "#pricing"   },
] as const

const mobileItemVariants: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.2, ease: "easeInOut" },
  }),
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  /* ── Scroll detection ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ── Close mobile menu on Escape ─────────────────────── */
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
      {/* ── Main nav bar ───────────────────────────────────── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          scrolled && "border-b",
        )}
        style={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group"
              aria-label="PitchSnap home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                style={{
                  background: "var(--violet)",
                  boxShadow: "var(--glow-violet)",
                }}
              >
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Pitch<span className="gradient-text">Snap</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Page sections">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                id="nav-login-btn"
                className="text-sm px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                id="nav-signup-btn"
                className="btn-gradient text-sm px-5 py-2 rounded-lg cursor-pointer font-semibold"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-md transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
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

      {/* ── Mobile menu drawer ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.96)",
              backdropFilter: "blur(20px) saturate(200%)",
              WebkitBackdropFilter: "blur(20px) saturate(200%)",
              borderColor: "rgba(255,255,255,0.06)",
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
                      className="block py-3.5 text-base transition-colors duration-200 cursor-pointer border-b"
                      style={{
                        color: "var(--text-secondary)",
                        borderColor: "rgba(255,255,255,0.04)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
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
                    className="text-center py-3 text-sm rounded-lg border transition-all duration-200 cursor-pointer"
                    style={{
                      color: "var(--text-secondary)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    id="mobile-signup-btn"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-3 text-sm btn-gradient rounded-lg cursor-pointer font-semibold"
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
