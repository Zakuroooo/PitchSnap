"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, Zap, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear the specific field error when typing
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" })
  }

  const validate = () => {
    let isValid = true
    const errors = { name: "", email: "", password: "" }

    if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long"
      isValid = false
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      toast.success("Account created! Welcome to PitchSnap", {
        style: { background: "#10B981", color: "white", border: "none" }
      })
      
      // Redirect to dashboard on success
      window.location.href = "/dashboard"
    } catch (err: any) {
      toast.error(err.message, {
        style: { background: "#EF4444", color: "white", border: "none" }
      })
    } finally {
      if (typeof window !== "undefined") {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(145,94,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,222,255,0.1),transparent_50%)] pointer-events-none" />

      {/* Back to home */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to PitchSnap.com
      </Link>

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
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl z-10"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Create your account</h1>
          <p className="text-[var(--text-secondary)] text-sm">Start winning clients today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={`bg-black/20 text-white placeholder:text-white/30 h-12 transition-colors ${fieldErrors.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/10 focus-visible:ring-[var(--violet)]'}`}
            />
            {fieldErrors.name && (
              <p className="text-red-400 text-xs mt-1 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={`bg-black/20 text-white placeholder:text-white/30 h-12 transition-colors ${fieldErrors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/10 focus-visible:ring-[var(--violet)]'}`}
            />
            {fieldErrors.email && (
              <p className="text-red-400 text-xs mt-1 font-medium">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`bg-black/20 text-white placeholder:text-white/30 h-12 pr-10 transition-colors ${fieldErrors.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/10 focus-visible:ring-[var(--violet)]'}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-red-400 text-xs mt-1 font-medium">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white font-semibold shadow-[0_0_15px_rgba(145,94,255,0.4)] hover:shadow-[0_0_25px_rgba(0,222,255,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--cyan)] hover:text-white font-medium transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
