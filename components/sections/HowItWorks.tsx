"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 w-full bg-[#0c0c0c] text-white">
      <Container>
        <div className="flex flex-col mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.2em] text-[#5e5e5e] uppercase font-bold mb-6"
          >
            Engineering Value
          </motion.div>
          
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter"
          >
            HOW IT WORKS.
          </motion.h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Step 1 - Large Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-8 bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-16 h-[400px] flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 text-[12rem] md:text-[20rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors">
              01
            </div>
            
            <div className="text-sm font-bold tracking-widest text-[#5e5e5e] mb-6">STEP 01</div>
            
            <div className="relative z-10 max-w-lg mt-auto">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">SYNC PORTFOLIO</h3>
              <p className="text-[#A1A1A1] text-lg leading-relaxed">
                Connect your existing high-ticket assets into our secure terminal. We aggregate your private data points into a single source of truth.
              </p>
            </div>
          </motion.div>

          {/* System Status - Small Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 bg-[#1a1c1c] p-10 md:p-12 h-[400px] flex flex-col justify-between"
          >
             <div className="flex items-center gap-3 text-xs tracking-widest text-white uppercase font-bold mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                SYSTEM STATUS: ACTIVE
              </div>
              <p className="text-[#A1A1A1] leading-relaxed">
                PitchSnap operates on a zero-latency protocol. Your data is encrypted, indexed, and transformed into professional capital in seconds.
              </p>
          </motion.div>

          {/* Step 2 - Medium Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-5 bg-[#141414] hover:bg-[#1A1A1A] transition-colors p-10 md:p-16 h-[460px] flex flex-col justify-between relative overflow-hidden group"
          >
             <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 text-[12rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors">
              02
            </div>
            <div className="text-sm font-bold tracking-widest text-[#5e5e5e] mb-6">STEP 02</div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-3xl font-extrabold mb-4 max-w-xs">AI LEDGER INDEXING</h3>
              <p className="text-[#A1A1A1] leading-relaxed">
                Our engine decodes and structures your value proposition with mathematical precision, identifying core leverage points.
              </p>
            </div>
          </motion.div>

          {/* Step 3 - Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-7 bg-[#1c1b1b] hover:bg-[#201f1f] transition-colors p-10 md:p-16 h-[460px] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent opacity-50" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className="text-sm font-bold tracking-widest text-white mb-6">STEP 03</div>
              <div className="text-5xl font-black text-white/10">03</div>
            </div>

            <div className="relative z-10 mt-auto max-w-lg">
              <h3 className="text-4xl font-extrabold mb-4">DEPLOY HIGH-FIDELITY PITCHES</h3>
              <p className="text-[#c6c6c6] text-lg leading-relaxed">
                Generate and send obsidian-grade proposals instantly. Output that commands attention and forces a decision.
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
