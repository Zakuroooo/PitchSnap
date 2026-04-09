"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap, TrendingUp, Calendar, ArrowRight, Plus } from "lucide-react"

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

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function getDaysUntilReset() {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return Math.ceil((nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

const FREE_LIMIT = 5

const exampleChips = [
  "Win a web dev client",
  "Pitch a design project",
  "Follow up on a cold email",
]

// Circular progress SVG
function CircularProgress({ used, limit }: { used: number; limit: number }) {
  const pct = Math.min(used / limit, 1)
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - pct * circumference
  const isLow = limit - used <= 1
  const remaining = limit - used

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 88 88">
        {/* Track */}
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        {/* Progress */}
        <circle
          cx="44" cy="44" r={radius}
          fill="none"
          stroke={isLow ? "#F87171" : "#915EFF"}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.6s ease",
            filter: isLow ? "drop-shadow(0 0 4px #F87171)" : "drop-shadow(0 0 4px #915EFF)",
          }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span
          className="text-3xl font-bold leading-none"
          style={{ color: isLow ? "#F87171" : "#e5e2e1" }}
        >
          {remaining}
        </span>
        <span className="text-[10px] text-[#4a4455] mt-0.5 uppercase tracking-wider">left</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(getCurrentTime())

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user) })
      .finally(() => setLoading(false))

    const interval = setInterval(() => setTime(getCurrentTime()), 30000)
    return () => clearInterval(interval)
  }, [])

  const used = user?.generationsThisMonth ?? 0
  const limit = FREE_LIMIT
  const daysLeft = getDaysUntilReset()
  const firstName = user?.name?.split(" ")[0] ?? ""

  return (
    <div className="max-w-4xl w-full mx-auto pb-24 md:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#4a4455] mb-1">{time}</p>
          {loading ? (
            <div className="h-8 w-64 rounded-md bg-white/5 animate-pulse" />
          ) : (
            <h1 className="text-[28px] font-bold text-[#e5e2e1] tracking-tight leading-tight">
              {getGreeting()}{firstName ? `, ${firstName}` : ""}
            </h1>
          )}
        </div>
        <Link
          href="/dashboard/generate"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-150 hover:opacity-90 active:scale-95 shrink-0"
          style={{ background: "#915EFF", boxShadow: "0 0 20px rgba(145,94,255,0.3)" }}
        >
          <Plus className="w-4 h-4" />
          New Proposal
        </Link>
      </div>

      {/* Stats row — asymmetric layout */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Large card: generations */}
        <div
          className="rounded-2xl p-6 flex items-center gap-6 col-span-2 sm:col-span-1"
          style={{ background: "#111111" }}
        >
          <CircularProgress used={used} limit={limit} />
          <div>
            <p className="text-[13px] font-medium text-[#e5e2e1] mb-0.5">Generations Used</p>
            <p className="text-xs text-[#4a4455]">{used} of {limit} this month</p>
            <Link
              href="/dashboard/settings"
              className="inline-block text-[11px] text-[#915EFF] mt-3 cursor-pointer hover:underline"
            >
              View plan →
            </Link>
          </div>
        </div>

        {/* Smaller cards */}
        <div
          className="rounded-2xl p-5 flex flex-col justify-between"
          style={{ background: "#111111" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
            style={{ background: "rgba(0,222,255,0.08)" }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: "#00DEFF" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#e5e2e1]">0</p>
            <p className="text-xs text-[#4a4455] mt-0.5">Proposals Sent</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 flex flex-col justify-between"
          style={{ background: "#111111" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
            style={{ background: "rgba(52,211,153,0.08)" }}
          >
            <Calendar className="w-4 h-4" style={{ color: "#34D399" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#e5e2e1]">{daysLeft}</p>
            <p className="text-xs text-[#4a4455] mt-0.5">Days Until Reset</p>
          </div>
        </div>
      </div>

      {/* Empty state card — animated gradient border */}
      <div className="relative rounded-2xl p-px overflow-hidden">
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-2xl animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(145,94,255,0.3) 60deg, rgba(0,222,255,0.2) 120deg, transparent 180deg)",
            animationDuration: "8s",
          }}
        />
        <div className="relative rounded-2xl p-8 md:p-10 flex flex-col items-center text-center" style={{ background: "#0f0f0f" }}>
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(145,94,255,0.1)",
              boxShadow: "0 0 40px rgba(145,94,255,0.15)",
            }}
          >
            <Zap className="w-8 h-8" style={{ color: "#915EFF", fill: "#915EFF", filter: "drop-shadow(0 0 8px rgba(145,94,255,0.8))" }} />
          </div>

          <h2 className="text-xl font-bold text-[#e5e2e1] mb-2">
            Ready to generate your first proposal?
          </h2>
          <p className="text-sm text-[#4a4455] mb-6 max-w-sm leading-relaxed">
            Paste a job description and get a winning proposal in seconds.
            {" "}{limit - used} generation{limit - used !== 1 ? "s" : ""} remaining.
          </p>

          <Link
            href="/dashboard/generate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-150 hover:opacity-90 active:scale-95 mb-6"
            style={{ background: "#915EFF" }}
          >
            Generate a Proposal
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {exampleChips.map((chip) => (
              <Link
                key={chip}
                href={`/dashboard/generate?prompt=${encodeURIComponent(chip)}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 hover:border-[#915EFF]/40 hover:text-[#e5e2e1]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#958da0",
                }}
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
