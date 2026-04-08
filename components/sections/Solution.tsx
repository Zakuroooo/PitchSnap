"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"
import { User, Sparkles, Send } from "lucide-react"

const STEPS = [
  {
    number: "01",
    title: "Enter client details",
    description: "Input their business name, industry, and the services you're pitching.",
    icon: User,
  },
  {
    number: "02",
    title: "AI generates in 10s",
    description: "Our engine crafts a personalized, high-converting proposal instantly.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Copy, send, win",
    description: "Review, copy to clipboard, and hit send. Watch your reply rate soar.",
    icon: Send,
  },
]

export default function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="solution" className="relative py-24 sm:py-32 w-full bg-[#111111] overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 rounded-full border border-[var(--cyan)]/20 bg-[var(--cyan)]/10 text-[var(--cyan)] text-xs font-semibold tracking-wide uppercase"
          >
            How it works
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            From blank page to winning proposal in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)]">
              under 10 seconds.
            </span>
          </motion.h2>
        </div>

        {/* 3 Step Flow */}
        <div 
          ref={ref} 
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-white/[0.05] z-0">
            <motion.div
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-[var(--violet)] via-[var(--cyan)] to-transparent"
            />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.3) }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon / Number Container */}
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                {/* Background glow on hover */}
                <div className="absolute inset-0 rounded-full bg-[var(--violet)]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Inner circle */}
                <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-white/[0.08] shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center relative z-10 group-hover:border-[var(--violet)]/30 transition-colors duration-500">
                  <span className="absolute -top-3 -right-2 text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] drop-shadow-sm">
                    {step.number}
                  </span>
                  <step.icon className="w-8 h-8 text-white group-hover:text-[var(--cyan)] transition-colors duration-500" />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
      
      {/* Subtle bottom separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  )
}
