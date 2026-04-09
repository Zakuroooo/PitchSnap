"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Zap, History, Settings, LogOut, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Generate", href: "/dashboard", icon: Zap },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface User {
  name: string
  email: string
  plan: string
  generationsThisMonth: number
}

const FREE_LIMIT = 5

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [hoveredLogout, setHoveredLogout] = useState(false)
  const [userHovered, setUserHovered] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => d.user && setUser(d.user))
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    toast.success("Logged out successfully")
    router.push("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  const used = user?.generationsThisMonth ?? 0
  const limit = FREE_LIMIT
  const usedPct = Math.min((used / limit) * 100, 100)
  const isLow = used >= limit - 1

  return (
    <aside
      className="hidden md:flex fixed top-0 left-0 h-screen w-[200px] flex-col z-30 select-none"
      style={{
        background: "#0f0f0f",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Logo */}
      <div className="px-4 pt-5 pb-4 relative">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105"
            style={{ background: "#915EFF", boxShadow: "0 0 12px rgba(145,94,255,0.4)" }}
          >
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight">
            <span className="text-white">Pitch</span>
            <span style={{ color: "#915EFF" }}>Snap</span>
          </span>
          {/* Online indicator */}
          <span
            className="w-1.5 h-1.5 rounded-full ml-auto"
            style={{ background: "#34D399", boxShadow: "0 0 6px #34D399" }}
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 relative">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150 group relative"
              style={{
                color: isActive ? "#e5e2e1" : "rgba(229,226,225,0.45)",
                background: isActive ? "rgba(145,94,255,0.08)" : "transparent",
                borderLeft: isActive ? "2.5px solid #915EFF" : "2.5px solid transparent",
              }}
            >
              <Icon
                className="w-[15px] h-[15px] shrink-0 transition-colors duration-150"
                style={{ color: isActive ? "#915EFF" : "inherit" }}
              />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />}
            </Link>
          )
        })}
      </nav>

      {/* Usage widget */}
      <div
        className="mx-3 mb-3 p-3 rounded-xl relative"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-[#958da0]">Generations</span>
          <span
            className="text-[11px] font-semibold"
            style={{ color: isLow ? "#F87171" : "#e5e2e1" }}
          >
            {used}/{limit}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${usedPct}%`,
              background: isLow ? "#F87171" : "#915EFF",
              boxShadow: isLow ? "0 0 6px #F87171" : "0 0 6px rgba(145,94,255,0.6)",
            }}
          />
        </div>
        <Link
          href="/dashboard/settings"
          className="block text-[11px] mt-2 cursor-pointer transition-colors duration-150 hover:text-[#915EFF]"
          style={{ color: "#4a4455" }}
        >
          Upgrade to Pro →
        </Link>
      </div>

      {/* User section */}
      <div
        className="px-3 pb-4 pt-3 border-t relative"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
        onMouseEnter={() => setUserHovered(true)}
        onMouseLeave={() => setUserHovered(false)}
      >
        <div className="flex items-center gap-2.5 px-1 cursor-pointer">
          <div
            className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: "rgba(145,94,255,0.35)" }}
          >
            {initials}
          </div>
          <span className="text-[13px] font-medium text-[#e5e2e1] truncate flex-1">
            {user?.name?.split(" ")[0] ?? "Loading"}
          </span>
        </div>

        {/* Hover-reveal logout */}
        <div
          className="overflow-hidden transition-all duration-200"
          style={{ maxHeight: userHovered ? "40px" : "0px", opacity: userHovered ? 1 : 0 }}
        >
          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoveredLogout(true)}
            onMouseLeave={() => setHoveredLogout(false)}
            className="w-full flex items-center gap-2 px-1 py-1.5 mt-2 rounded-lg text-[12px] font-medium cursor-pointer transition-all duration-150"
            style={{
              color: hoveredLogout ? "#f87171" : "rgba(229,226,225,0.4)",
              background: hoveredLogout ? "rgba(239,68,68,0.07)" : "transparent",
            }}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  )
}
