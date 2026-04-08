"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"
import { Clock, MessageSquareOff, FileWarning } from "lucide-react"

const PAIN_POINTS = [
  {
    title: "Hours Wasted on Pitches",
    description: "Writing custom proposals from scratch takes 45+ minutes per client, eating into your billable hours.",
    icon: Clock,
  },
  {
    title: "The Silent Treatment",
    description: "Sending 50 cold emails and getting zero replies because your generic templates are triggering spam filters.",
    icon: MessageSquareOff,
  },
  {
    title: "Lost High-Ticket Deals",
    description: "Losing premium $5,000+ contracts to competitors who respond faster with better-formatted, persuasive proposals.",
    icon: FileWarning,
  },
]

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="problem" className="relative py-24 sm:py-32 w-full bg-[var(--background)] border-t border-white/[0.05]">
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 rounded-full border border-[var(--violet)]/20 bg-[var(--violet)]/10 text-[var(--violet)] text-xs font-semibold tracking-wide uppercase"
          >
            The Problem
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            You are losing clients to freelancers who are{" "}
            <span className="text-[var(--violet)] font-serif italic pr-1">pitching faster</span>
            than you.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl"
          >
            In the freelance world, speed and quality win. If you're spending hours staring at a blank screen trying to write the perfect proposal, you've already lost the deal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
              className="group relative flex flex-col items-start p-8 rounded-2xl bg-[#111111] border border-white/[0.05] hover:border-[var(--violet)]/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[rgba(145,94,255,0.15)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[rgba(145,94,255,0.25)] transition-all duration-300">
                <point.icon className="w-6 h-6 text-[#915EFF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{point.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
