"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-48 w-full bg-[#0c0c0c] text-white overflow-hidden">
      {/* Background Shift */}
      <div className="absolute inset-0 bg-[#0e0e0e] bottom-1/2 rounded-b-[100%] scale-150 blur-3xl opacity-50" />
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] text-[#5e5e5e] uppercase font-bold mb-8"
          >
            The Zenith
          </motion.div>

          <motion.h2 
             ref={ref}
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
             transition={{ duration: 0.7, delay: 0.1 }}
             className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] mb-12"
          >
            END THE
            <br />
            SCRAMBLE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1A1] text-lg md:text-xl max-w-2xl mb-16 leading-relaxed"
          >
            Stop competing on price. Start commanding authority. 
            Deploy the PitchSnap Monolith directly into your workflow today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <button className="px-10 py-5 bg-white text-black font-extrabold tracking-widest uppercase text-sm hover:scale-[1.02] transition-transform">
              CLAIM YOUR VAULT
            </button>
            <button className="px-10 py-5 bg-[#1C1B1B] text-white font-extrabold tracking-widest uppercase text-sm hover:bg-[#2a2a2a] transition-colors shadow-2xl">
              VIEW THE MANIFESTO
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
