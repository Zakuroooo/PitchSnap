"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, Zap, ArrowLeft, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const testimonials = [
  { initials: "MR", name: "Marcus R.", role: "Freelance Dev", stars: 5 },
  { initials: "AB", name: "Aisha B.", role: "UX Designer", stars: 5 },
  { initials: "TK", name: "Tyler K.", role: "Copywriter", stars: 5 },
]

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" })
  }

  const validate = () => {
    const errors = { email: "", password: "" }
    let isValid = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { errors.email = "Please enter a valid email address"; isValid = false }
    if (!formData.password) { errors.password = "Password is required"; isValid = false }
    setFieldErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to sign in")
      toast.success("Login successful! Redirecting...", {
        style: { background: "#10B981", color: "white", border: "none" }
      })
      window.location.href = "/dashboard"
    } catch (err: any) {
      toast.error(err.message, { style: { background: "#EF4444", color: "white", border: "none" } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* Left decorative panel — 60% */}
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: "#0d0d0d" }}>
        {/* Animated gradient orb */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(145,94,255,0.12) 0%, transparent 65%)",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,222,255,0.07) 0%, transparent 65%)",
            animation: "pulse 8s ease-in-out infinite 2s",
          }}
        />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group w-fit">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#915EFF", boxShadow: "0 0 16px rgba(145,94,255,0.4)" }}>
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Pitch<span style={{ color: "#915EFF" }}>Snap</span>
          </span>
        </Link>

        {/* Quote */}
        <div className="relative z-10 max-w-md">
          <p className="text-4xl font-bold text-[#e5e2e1] leading-tight mb-6 tracking-tight">
            "Win clients before they open<br />your email."
          </p>
          <p className="text-[#4a4455] text-sm leading-relaxed mb-10">
            PitchSnap generates proposals that get replies in minutes, not days.
          </p>

          {/* Testimonial avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {testimonials.map((t) => (
                <div key={t.initials}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "rgba(145,94,255,0.28)", borderColor: "#0d0d0d" }}
                >
                  {t.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
              <p className="text-xs text-[#4a4455]">
                Trusted by 500+ freelancers
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#2a2a2a] relative z-10">
          © 2026 PitchSnap, Inc.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 lg:w-[40%] flex flex-col px-4 sm:px-8 lg:px-12 relative"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/"
          className="flex items-center gap-2 text-xs text-[#4a4455] hover:text-[#958da0] transition-colors cursor-pointer group mt-6 mb-auto w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Back to PitchSnap.com
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto py-12"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden mb-8 cursor-pointer w-fit">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#915EFF" }}>
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Pitch<span style={{ color: "#915EFF" }}>Snap</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-[#e5e2e1] tracking-tight mb-1">Welcome back</h1>
          <p className="text-sm text-[#4a4455] mb-8">Sign in to your account.</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-[#958da0] uppercase tracking-wider">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com"
                value={formData.email} onChange={handleChange} disabled={loading}
                className={`h-11 bg-white/[0.03] text-[#e5e2e1] placeholder:text-[#2a2a2a] border transition-colors ${fieldErrors.email ? "border-red-500/60" : "border-white/[0.07] focus-visible:border-[#915EFF]/50"}`}
              />
              {fieldErrors.email && <p className="text-red-400/80 text-xs">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-[#958da0] uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Your password"
                  value={formData.password} onChange={handleChange} disabled={loading}
                  className={`h-11 bg-white/[0.03] text-[#e5e2e1] placeholder:text-[#2a2a2a] border pr-10 transition-colors ${fieldErrors.password ? "border-red-500/60" : "border-white/[0.07] focus-visible:border-[#915EFF]/50"}`}
                />
                <button type="button" disabled={loading} onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4455] hover:text-[#958da0] transition-colors cursor-pointer">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-400/80 text-xs">{fieldErrors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: "#915EFF", boxShadow: "0 0 20px rgba(145,94,255,0.25)" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#4a4455]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#915EFF] hover:text-[#a370ff] transition-colors cursor-pointer font-medium">
              Sign up free
            </Link>
          </p>
        </motion.div>

        <div className="mb-6" />
      </div>
    </div>
  )
}
