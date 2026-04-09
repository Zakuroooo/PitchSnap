"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap, History, Calendar, ArrowRight } from "lucide-react"

interface User {
  name: string
  email: string
  plan: string
  generationsThisMonth: number
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function getDaysUntilReset() {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const diff = nextMonth.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const FREE_LIMIT = 5
const PRO_LIMIT = 50

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user)
      })
      .finally(() => setLoading(false))
  }, [])

  const limit = user?.plan === "pro" || user?.plan === "agency" ? PRO_LIMIT : FREE_LIMIT
  const used = user?.generationsThisMonth ?? 0
  const daysLeft = getDaysUntilReset()
  const firstName = user?.name?.split(" ")[0] ?? ""

  const stats = [
    {
      label: "Generations Used",
      value: loading ? "—" : `${used}/${limit}`,
      subLabel: "this month",
      icon: Zap,
      color: "#915EFF",
      bg: "rgba(145,94,255,0.08)",
    },
    {
      label: "Proposals Sent",
      value: "0",
      subLabel: "total",
      icon: History,
      color: "#00DEFF",
      bg: "rgba(0,222,255,0.06)",
    },
    {
      label: "Days Until Reset",
      value: String(daysLeft),
      subLabel: "days remaining",
      icon: Calendar,
      color: "#34D399",
      bg: "rgba(52,211,153,0.06)",
    },
  ]

  return (
    <div className="max-w-5xl w-full mx-auto pb-20 md:pb-0">
      {/* Welcome header */}
      <div className="mb-8">
        {loading ? (
          <div className="h-9 w-72 rounded-lg bg-white/5 animate-pulse mb-2" />
        ) : (
          <h1 className="text-3xl font-bold text-[#e5e2e1] tracking-tight">
            {getGreeting()}{firstName ? `, ${firstName}` : ""} 👋
          </h1>
        )}
        <p className="text-[#958da0] text-sm mt-1">Here's your workspace overview.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, subLabel, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-xl p-5 flex items-start gap-4"
            style={{ background: "#111111" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: bg }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#e5e2e1] leading-tight">{value}</p>
              <p className="text-xs text-[#958da0] mt-0.5">{label}</p>
              <p className="text-xs text-[#4a4455]">{subLabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state / CTA */}
      <div
        className="rounded-2xl p-8 md:p-12 flex flex-col items-center text-center"
        style={{ background: "#111111" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: "rgba(145,94,255,0.12)" }}
        >
          <Zap className="w-8 h-8 text-[#915EFF] fill-[#915EFF]" />
        </div>
        <h2 className="text-xl font-bold text-[#e5e2e1] mb-2">
          Ready to generate your first proposal?
        </h2>
        <p className="text-[#958da0] text-sm mb-6 max-w-sm leading-relaxed">
          Paste a job description and let PitchSnap write a winning proposal in seconds. 
          {user?.plan === "free" && ` You have ${limit - used} generation${limit - used !== 1 ? "s" : ""} remaining this month.`}
        </p>
        <Link
          href="/dashboard/generate"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
          style={{ background: "#915EFF" }}
        >
          Generate a Proposal
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
