"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to sign in")
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(145,94,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,222,255,0.1),transparent_50%)] pointer-events-none" />

      <Link href="/" className="flex items-center gap-2 cursor-pointer group mb-8 z-10" aria-label="PitchSnap home">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-[0_0_20px_rgba(145,94,255,0.3)]"
          style={{ background: "var(--violet)" }}
        >
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-white font-bold text-2xl tracking-tight">
          Pitch<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#915EFF] to-[#00DEFF]">Snap</span>
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-2xl z-10"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome back</h1>
          <p className="text-[var(--text-secondary)] text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 h-12 focus-visible:ring-[var(--violet)] focus-visible:ring-offset-0 focus-visible:border-[var(--violet)] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-black/20 border-white/10 text-white placeholder:text-white/30 h-12 pr-10 focus-visible:ring-[var(--violet)] focus-visible:ring-offset-0 focus-visible:border-[var(--violet)] transition-colors"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white font-semibold shadow-[0_0_15px_rgba(145,94,255,0.4)] hover:shadow-[0_0_25px_rgba(0,222,255,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[var(--cyan)] hover:text-white font-medium transition-colors">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
