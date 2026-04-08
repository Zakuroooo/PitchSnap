"use client"

import React, { useState } from "react"
import { Check, X } from "lucide-react"
import Container from "../layout/Container"
import { AnimatedHeading } from "../ui/animated-heading"
import { motion } from "framer-motion"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="relative py-24 sm:py-32 w-full bg-[#0A0A0A] overflow-hidden flex flex-col items-center">
      
      {/* Ambient background glow behind Pro card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#915EFF] rounded-full blur-[150px] opacity-[0.06] pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading text="Simple, transparent pricing" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white justify-center" />
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Start closing more deals today. Upgrade when you need more power.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-[var(--text-tertiary)]'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full flex items-center px-1 transition-colors outline-none ${
                isAnnual ? 'bg-[#915EFF]' : 'bg-white/10'
              }`}
              aria-label="Toggle billing cycle"
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-sm"
                style={{ marginLeft: isAnnual ? 'auto' : '0' }}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 transition-colors ${isAnnual ? 'text-white' : 'text-[var(--text-tertiary)]'}`}>
              Annually <span className="text-[11px] font-bold text-[#00DEFF] bg-[#00DEFF]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">Save ~20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center">
          
          {/* Starter Plan */}
          <div className="flex flex-col p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] border-t-[rgba(255,255,255,0.12)]">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <p className="text-[var(--text-tertiary)] text-sm h-10">Perfect for freelancers just starting out.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-bold gradient-text pb-1">$0</span>
                <span className="text-[var(--text-tertiary)]">/ forever</span>
              </div>
            </div>
            
            <button className="w-full py-3 px-4 rounded-lg border border-white text-white hover:bg-white hover:text-black font-semibold transition-all mb-8">
              Get Started
            </button>

            <div className="flex flex-col divide-y divide-white/5 mt-auto">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2 pb-2">Features</p>
              {[
                "3 AI proposals per month",
                "Standard templates",
                "Basic analytics view",
                "Community support",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 py-4">
                  <Check className="w-5 h-5 text-[#915EFF] shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] mt-0.5">{feature}</span>
                </div>
              ))}
              <div className="flex items-start gap-4 py-4">
                <X className="w-5 h-5 shrink-0 text-[rgba(255,255,255,0.3)]" />
                <span className="text-sm text-[rgba(255,255,255,0.3)] mt-0.5">Custom branding</span>
              </div>
            </div>
          </div>

          {/* Pro Plan (Most Popular) */}
          <div className="relative rounded-2xl p-[1px] scale-100 md:scale-[1.04] z-10 shadow-[0_0_60px_rgba(145,94,255,0.2)] overflow-hidden flex flex-col group">
            {/* Animated Conic Gradient Border */}
            <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#915EFF_50%,transparent_100%)] opacity-80" />
            
            {/* Inner Card Content */}
            <div className="relative w-full h-full flex flex-col p-8 rounded-2xl bg-[rgba(145,94,255,0.08)] backdrop-blur-[12px] border-t border-[rgba(255,255,255,0.12)]">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#915EFF] to-[#00DEFF] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(145,94,255,0.4)] whitespace-nowrap">
                Most Popular
              </div>
              
              <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-[var(--text-tertiary)] text-sm h-10">Everything you need to scale your freelance business.</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-6xl sm:text-7xl font-bold gradient-text pb-1">${isAnnual ? '29' : '39'}</span>
                  <span className="text-[var(--text-tertiary)]">/ month</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-4 rounded-lg btn-gradient font-semibold mb-8 text-white">
                Upgrade to Pro
              </button>

              <div className="flex flex-col divide-y divide-white/5 mt-auto">
                <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2 pb-2">Everything in Starter, plus</p>
                {[
                  "Unlimited AI proposals",
                  "Advanced custom branding",
                  "CRM Integrations (Hubspot)",
                  "Priority email support",
                  "E-signatures & payment links",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 py-4">
                    <Check className="w-5 h-5 text-[#915EFF] shrink-0" />
                    <span className="text-sm text-white font-medium mt-0.5">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agency Plan */}
          <div className="flex flex-col p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] border-t-[rgba(255,255,255,0.12)]">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
              <p className="text-[var(--text-tertiary)] text-sm h-10">For teams sending high-volume pitches.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-bold gradient-text pb-1">${isAnnual ? '99' : '119'}</span>
                <span className="text-[var(--text-tertiary)]">/ month</span>
              </div>
            </div>
            
            <button className="w-full py-3 px-4 rounded-lg border border-white text-white hover:bg-white hover:text-black font-semibold transition-all mb-8">
              Contact Sales
            </button>

            <div className="flex flex-col divide-y divide-white/5 mt-auto">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2 pb-2">Everything in Pro, plus</p>
              {[
                "Up to 5 team members",
                "White-label domain",
                "API access for automation",
                "Dedicated success manager",
                "Custom MSA & Security forms",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 py-4">
                  <Check className="w-5 h-5 text-[#915EFF] shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] mt-0.5">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
