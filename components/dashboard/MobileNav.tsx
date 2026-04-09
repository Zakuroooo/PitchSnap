"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, History, Settings, Menu, X } from "lucide-react"

const navItems = [
  { label: "Generate", href: "/dashboard", icon: Zap },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top bar — mobile only */}
      <header
        className="md:hidden flex items-center justify-between px-4 h-14 shrink-0"
        style={{ background: "#111111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#915EFF" }}>
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Pitch<span className="text-[#915EFF]">Snap</span>
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="text-[#e5e2e1] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full w-64 flex flex-col"
            style={{ background: "#111111" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#915EFF" }}>
                  <Zap className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="text-white font-bold text-base">
                  Pitch<span className="text-[#915EFF]">Snap</span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-[#e5e2e1] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      background: isActive ? "rgba(145,94,255,0.15)" : "transparent",
                      color: isActive ? "#915EFF" : "rgba(229,226,225,0.6)",
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom tab bar — mobile only */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-4 h-16"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 text-xs font-medium transition-colors duration-150"
              style={{ color: isActive ? "#915EFF" : "rgba(229,226,225,0.5)" }}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
