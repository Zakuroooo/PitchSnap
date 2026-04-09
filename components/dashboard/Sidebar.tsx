"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Zap, History, Settings, LogOut } from "lucide-react"
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
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

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
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  return (
    <aside
      className="hidden md:flex fixed top-0 left-0 h-screen w-60 flex-col z-30"
      style={{
        background: "#111111",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 group-hover:scale-105"
            style={{ background: "#915EFF" }}
          >
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Pitch<span className="text-[#915EFF]">Snap</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group"
              style={{
                background: isActive ? "rgba(145, 94, 255, 0.15)" : "transparent",
                color: isActive ? "#915EFF" : "rgba(229,226,225,0.6)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.color = "#e5e2e1"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "rgba(229,226,225,0.6)"
                }
              }}
            >
              <Icon
                className="w-4 h-4 shrink-0 transition-colors duration-150"
                style={{ color: isActive ? "#915EFF" : "inherit" }}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 px-2 mb-3">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "rgba(145,94,255,0.3)" }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#e5e2e1] truncate">{user?.name ?? "Loading..."}</p>
            <p className="text-xs text-[#958da0] truncate">{user?.email ?? ""}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: "rgba(229,226,225,0.5)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.08)"
            e.currentTarget.style.color = "#f87171"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "rgba(229,226,225,0.5)"
          }}
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}
