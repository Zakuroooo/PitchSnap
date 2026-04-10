"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"

export default function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 w-full bg-[#0c0c0c] text-white overflow-hidden border-t border-white/[0.05]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: The Monolith Headline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6">
                  THE<br />ARCHITECTURE<br />OF PERSUASION.
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[#A1A1A1] text-lg max-w-md"
              >
                The era of manual proposal crafting is over. We have replaced fragmentation with a single, high-fidelity ledger of intent.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block mt-24"
            >
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-bold tracking-tight mb-1">94%</div>
                  <div className="text-xs tracking-widest text-[#A1A1A1] uppercase font-semibold">Avg. Resonance</div>
                </div>
                <div>
                  <div className="text-4xl font-bold tracking-tight mb-1">12x</div>
                  <div className="text-xs tracking-widest text-[#A1A1A1] uppercase font-semibold">Faster Drafting</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contrast Grid */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8 lg:gap-16">
            
            {/* The Old Way */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#131313] p-10 lg:p-12 hover:bg-[#1C1B1B] transition-colors duration-500 group"
            >
              <div className="text-xs tracking-[0.1em] text-[#474747] uppercase font-semibold mb-8 group-hover:text-[#A1A1A1] transition-colors">Manual Proposals</div>
              
              <div className="mb-10 last:mb-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#A1A1A1] mb-3">The Velocity Gap</h3>
                <p className="text-[#5E5E5E] leading-relaxed">Hours lost in static documents. By the time it's sent, the momentum is dead. Fragmented workflows lead to critical drop-offs.</p>
              </div>

              <div className="mb-10 last:mb-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#A1A1A1] mb-3">Zero Insight</h3>
                <p className="text-[#5E5E5E] leading-relaxed">Sending a PDF is a shot in the dark. You have no data on resonance, no heatmaps of intent, and no way to course-correct.</p>
              </div>
            </motion.div>

            {/* The PitchSnap Way */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1c1b1b] p-10 lg:p-12 relative overflow-hidden"
            >
              {/* Active glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px]" />

              <div className="text-xs tracking-[0.1em] text-white uppercase font-semibold mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                AI-ORCHESTRATED PRECISION
              </div>
              
              <div className="mb-10 last:mb-0">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Intent Telemetry</h3>
                <p className="text-[#A1A1A1] leading-relaxed">Know exactly where they linger. Our ledger tracks dwell-time at the pixel level, giving you the leverage to close with surgical precision.</p>
              </div>

              <div className="mb-10 last:mb-0">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Neural Aesthetics</h3>
                <p className="text-[#A1A1A1] leading-relaxed">Every element is visually optimized by our design-engine for professional gravitas. Instant deployment across all devices.</p>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  )
}
