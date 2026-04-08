"use client"

import Link from "next/link"
import { Zap } from "lucide-react"
import Container from "./Container"

/* ── Brand icon SVGs (Simple Icons — correct paths) ────────── */
const TwitterIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const GithubIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedinIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FOOTER_LINKS = {
  Product: [
    { label: "Features",     href: "#features"  },
    { label: "How It Works", href: "#solution"  },
    { label: "Pricing",      href: "#pricing"   },
    { label: "Changelog",    href: "/changelog" },
  ],
  Company: [
    { label: "About",        href: "/about"   },
    { label: "Blog",         href: "/blog"    },
    { label: "Careers",      href: "/careers" },
    { label: "Contact",      href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy"  },
    { label: "Terms of Service", href: "/terms"    },
    { label: "Cookie Policy",    href: "/cookies"  },
    { label: "Refund Policy",    href: "/refunds"  },
  ],
} as const

const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    href:  "https://twitter.com/pitchsnap",
    id:    "footer-twitter",
    Icon:  TwitterIcon,
  },
  {
    label: "GitHub",
    href:  "https://github.com/pitchsnap",
    id:    "footer-github",
    Icon:  GithubIcon,
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/company/pitchsnap",
    id:    "footer-linkedin",
    Icon:  LinkedinIcon,
  },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="border-t"
      style={{
        backgroundColor: "var(--background)",
        borderColor:     "rgba(255,255,255,0.06)",
      }}
    >
      <Container>

        {/* ── Top section ─────────────────────────────────── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column (spans 2 of 5 on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group w-fit"
              aria-label="PitchSnap home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                style={{ background: "var(--violet)", boxShadow: "var(--glow-violet)" }}
              >
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Pitch<span className="gradient-text">Snap</span>
              </span>
            </Link>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Generate winning freelance proposals and cold outreach messages
              in under 10 seconds using AI.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(({ label, href, id, Icon }) => (
                <Link
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{
                    color:       "var(--text-secondary)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color           = "#ffffff"
                    e.currentTarget.style.borderColor     = "var(--violet)"
                    e.currentTarget.style.backgroundColor = "var(--violet-dim)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color           = "var(--text-secondary)"
                    e.currentTarget.style.borderColor     = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(
            Object.entries(FOOTER_LINKS) as [
              string,
              readonly { label: string; href: string }[],
            ][]
          ).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h3
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-secondary)" }}
              >
                {section}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 cursor-pointer"
                      style={{ color: "var(--text-tertiary)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            © {currentYear} PitchSnap. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Built for freelancers who refuse to lose.
          </p>
        </div>

      </Container>
    </footer>
  )
}
