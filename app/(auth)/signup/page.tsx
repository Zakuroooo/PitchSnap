"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  // Step 1 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2 state
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Countdown timer for resend
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSocialSignIn = (provider: 'google' | 'github') => {
    toast.loading(`Connecting to ${provider === 'google' ? 'Google' : 'GitHub'}...`, {
      description: "Securing your connection layer."
    });
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  /** Step 1: send OTP */
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const loadToast = toast.loading("Generating Secure OTP...");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send verification email.");
        toast.error("Transmission failed", { id: loadToast, description: data.error || "Please verify your email format." });
      } else {
        setStep(2);
        setResendCooldown(60);
        toast.success("Identity Challenge Sent", { id: loadToast, description: "Please check your inbox for the 6-digit code." });
      }
    } catch {
      setError("Network error. Please try again.");
      toast.error("Network exception", { id: loadToast, description: "Check your internet connection." });
    } finally {
      setLoading(false);
    }
  };

  /** Step 2: verify OTP and auto sign-in */
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const loadToast = toast.loading("Verifying Identity Signature...");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid verification code.");
        toast.error("Verification Refused", { id: loadToast, description: "The code entered is invalid or expired." });
      } else {
        // Auto sign-in with credentials
        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/dashboard",
        });
        if (loginRes?.error) {
          setError("Account created! Please sign in manually.");
          toast.success("Account Created", { id: loadToast, description: "Please log in with your new credentials." });
        } else {
          toast.success("Access Granted", { id: loadToast, description: "Protocol initialization complete. Heading to dashboard." });
          router.push("/dashboard");
        }
      }
    } catch {
      setError("Network error. Please try again.");
      toast.error("Network exception", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0C0C0C] font-inter text-white">
      {/* Left Panel (60%) */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden flex-col items-center justify-end">
        {/* Floating elements backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[20%] right-[30%] w-3 h-3 rounded-full bg-white/60 animate-pulse" style={{animationDuration: '2s'}} />
           <div className="absolute top-[35%] left-[25%] w-8 h-8 rounded-full border-2 border-white/40 animate-bounce" style={{animationDuration: '4s'}} />
           <div className="absolute bottom-[30%] right-[35%] w-6 h-6 rounded-[2px] border-2 border-white/40 animate-pulse" style={{animationDuration: '3s'}} />
           <div className="absolute top-[60%] left-[20%] w-2 h-2 rounded-full bg-white/80 animate-ping" style={{animationDuration: '5s'}} />
        </div>

        {/* Tagline */}
        <div className="absolute top-24 left-16 z-10">
          <h1 className="text-[48px] lg:text-[64px] leading-[1.1] font-bold tracking-tight">
            START PITCHING.<br />
            LIKE A<br />
            MACHINE.
          </h1>
          <p className="mt-6 text-[14px] text-zinc-500 max-w-sm">
            "The only platform that matches your hustle."
          </p>
        </div>

        {/* Character Image */}
        <div className="relative z-10 w-full h-[70vh] flex items-end justify-center">
          <div className="relative w-full h-full max-w-[500px]">
             <Image 
               src="/auth/register-transparent.png" 
               alt="PitchSnap Recruitment Buddy" 
               fill
               className="object-contain object-bottom"
               priority
             />
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:block w-[1px] bg-white/[0.06] h-screen" />

      {/* Right Panel (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 lg:px-16 relative">
        <div className="absolute top-12 left-8 lg:left-16">
          <Link href="/" className="text-[14px] font-bold tracking-widest text-white uppercase">
            PITCHSNAP.
          </Link>
        </div>

        <div className="w-full max-w-[400px] mx-auto mt-12">

          {step === 1 ? (
            <>
              <h2 className="text-[36px] font-bold tracking-tight text-white mb-2">
                Create your account.
              </h2>
              <p className="text-[14px] text-zinc-500 mb-8">
                Join 2,400+ top-tier freelancers.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => handleSocialSignIn('google')}
                  className="w-full h-[44px] flex items-center justify-center gap-3 bg-[#141414] border border-white/15 rounded-[2px] text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>

                <button
                  onClick={() => handleSocialSignIn('github')}
                  className="w-full h-[44px] flex items-center justify-center gap-3 bg-[#141414] border border-white/15 rounded-[2px] text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 1C5.92 1 1 5.92 1 12c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53v-1.89c-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.19 3.19.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.29 3 1.11.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.08-1.4 3-1.11 3-1.11.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.15-5.03 5.43.39.34.74 1.01.74 2.03v3.01c0 .29.2.64.76.53C20.85 20.98 24 16.86 24 12c0-6.08-4.92-11-11-11z" />
                  </svg>
                  Sign up with GitHub
                </button>
              </div>

              <div className="flex items-center my-8 text-zinc-500 text-[10px] uppercase font-bold tracking-widest text-center">
                <div className="flex-1 h-[1px] bg-white/[0.06]"></div>
                <span className="px-4">Or Use Email</span>
                <div className="flex-1 h-[1px] bg-white/[0.06]"></div>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe"
                    className="w-full h-[44px] bg-[#141414] border border-white/5 rounded-[2px] px-4 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                    className="w-full h-[44px] bg-[#141414] border border-white/5 rounded-[2px] px-4 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700" />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters" autoComplete="new-password"
                      className="w-full h-[44px] bg-[#141414] border border-white/5 rounded-[2px] px-4 text-sm focus:outline-none focus:border-white/30 transition-colors pr-10 placeholder:text-zinc-700" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs pt-1">{error}</p>}
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} disabled={loading} type="submit"
                  className="w-full h-[44px] mt-6 bg-white text-black rounded-[2px] text-sm font-bold tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center disabled:opacity-50">
                  {loading ? "SENDING CODE..." : "CONTINUE WITH EMAIL"}
                </motion.button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-[30px] font-bold tracking-tight text-white mb-2">
                Check your inbox.
              </h2>
              <p className="text-[14px] text-zinc-500 mb-8">
                We sent a 6-digit code to <span className="text-white font-bold">{email}</span>. Enter it below.
              </p>

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Verification Code</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required maxLength={6} placeholder="000000" inputMode="numeric"
                    className="w-full h-[56px] bg-[#141414] border border-white/5 rounded-[2px] px-4 text-[28px] font-bold text-center tracking-[0.5em] focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700" />
                </div>
                {error && <p className="text-red-500 text-xs pt-1">{error}</p>}
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} disabled={loading || otp.length < 6} type="submit"
                  className="w-full h-[44px] mt-4 bg-white text-black rounded-[2px] text-sm font-bold tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center disabled:opacity-50">
                  {loading ? "VERIFYING..." : "VERIFY & CREATE ACCOUNT"}
                </motion.button>

                <div className="flex items-center justify-between pt-2">
                  <button type="button" onClick={() => { setStep(1); setError(""); setOtp(""); }}
                    className="text-[12px] text-zinc-500 hover:text-white transition-colors">
                    ← Change email
                  </button>
                  <button type="button" disabled={resendCooldown > 0} onClick={() => { handleSendOTP({ preventDefault: () => {} } as React.FormEvent); }}
                    className="text-[12px] text-zinc-500 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-8 text-center">
            <Link href="/login" className="text-[13px] text-zinc-500 hover:text-white transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
