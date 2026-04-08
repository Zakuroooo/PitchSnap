"use client"
import React, { useRef } from "react"
import { motion, useInView, useScroll } from "framer-motion"
import { AnimatedHeading } from "../ui/animated-heading"
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "center 40%"]
  })

  return (
    <section id="solution" className="relative py-24 sm:py-32 w-full bg-[#111111] overflow-hidden">
      {/* Subtle Violet Radial Glow centered behind Step 2 */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(145,94,255,0.12)_0%,transparent_60%)] blur-[100px] z-0 pointer-events-none" />
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
          
          <div className="flex flex-col gap-2 items-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-center w-full">
            <AnimatedHeading text="From blank page to winning proposal in" className="text-white m-0 p-0 text-center justify-center" />
            <AnimatedHeading text="under 10 seconds." gradient className="m-0 p-0 text-center justify-center font-serif italic" />
          </div>
        </div>

        {/* 3 Step Flow */}
        <div 
          ref={ref} 
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Connector Line & Particles (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[4px] z-0">
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/[0.05] rounded-full mx-6" />
            
            {/* Animated SVG Path using scrollYProgress */}
            <svg className="absolute inset-0 w-full h-full preserveAspectRatio-none px-6" viewBox="0 0 100 2" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 L 100,1"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                style={{ pathLength: scrollYProgress }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--violet)" />
                  <stop offset="100%" stopColor="var(--cyan)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Floating Particles overlay */}
            <motion.div
              style={{ opacity: scrollYProgress }}
              className="absolute inset-0"
            >
              <motion.div animate={{ opacity:[0,1,0], y:[-5, -15] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute -top-1 left-[20%] w-1.5 h-1.5 bg-[var(--cyan)] rounded-full blur-[1px]" />
              <motion.div animate={{ opacity:[0,1,0], y:[5, 15] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }} className="absolute flex -bottom-1 left-[40%] w-1 h-1 bg-[var(--violet)] rounded-full blur-[1px]" />
              <motion.div animate={{ opacity:[0,1,0], y:[-10, -20] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} className="absolute -top-2 left-[70%] w-2 h-2 bg-white rounded-full blur-[2px]" />
            </motion.div>
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
              <div className={`relative w-24 h-24 mb-8 flex items-center justify-center ${step.number === "02" ? "scale-110" : ""}`}>
                {/* Radar Ping rings */}
                <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                    className={`absolute w-full h-full rounded-full border ${step.number === "02" ? "border-[var(--cyan)]" : "border-[var(--violet)]"}`}
                  />
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.4 + 1.25 }}
                    className={`absolute w-full h-full rounded-full border ${step.number === "02" ? "border-[var(--cyan)]" : "border-[var(--violet)]"}`}
                  />
                </div>
                
                {/* Continuous pulsing ambient glow */}
                <motion.div 
                  animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }} 
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className={`absolute inset-0 rounded-full blur-xl z-0 ${step.number === "02" ? "bg-[var(--cyan)]/20" : "bg-[var(--violet)]/20"}`} 
                />
                
                {/* Background glow on hover */}
                <div className="absolute inset-0 rounded-full bg-[var(--violet)]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                
                {/* Inner circle */}
                <div className={`w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center relative z-10 transition-colors duration-500 border ${step.number === "02" ? "border-[var(--cyan)]/40 shadow-[0_0_30px_rgba(0,222,255,0.2)]" : "border-white/[0.08] shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-[var(--violet)]/30"}`}>
                  <span className="absolute -top-3 -right-2 text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] drop-shadow-sm">
                    {step.number}
                  </span>
                  <step.icon className={`w-8 h-8 transition-colors duration-500 ${step.number === "02" ? "text-[var(--cyan)] drop-shadow-[0_0_8px_#00DEFF]" : "text-white group-hover:text-[var(--violet)]"}`} />
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
