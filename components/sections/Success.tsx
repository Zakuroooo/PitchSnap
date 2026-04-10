"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"

export default function Success() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 w-full bg-[#0c0c0c] text-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-start mb-24">
          <div className="flex flex-col max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] text-[#5e5e5e] uppercase font-bold mb-6"
            >
              The Impact
            </motion.div>
            
            <motion.h2 
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter"
            >
              METRICS OF
              <br/>
              MASTERY.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/3 text-[#A1A1A1] text-lg leading-relaxed pt-2"
          >
            In the Monolith ecosystem, performance isn't just measured by speed—it's measured by authority. We provide the structural integrity your pitches need to survive in high-pressure environments.
          </motion.div>
        </div>

        {/* Asymmetrical Metrics Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          
          {/* Main Huge Metric */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-16 flex flex-col justify-between min-h-[500px]"
          >
            <div className="text-sm font-bold tracking-widest text-[#5e5e5e] mb-6">WIN RATE</div>
            <div className="mt-auto">
              <h3 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-8">
                98<span className="text-[#353534]">%</span>
              </h3>
              <p className="text-[#A1A1A1] text-xl max-w-md leading-relaxed">
                Architected for conversion. Our high-fidelity proposal engine consistently outpaces industry standards by an order of magnitude.
              </p>
            </div>
          </motion.div>

          {/* Stacked Side Metrics */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-[#161616] hover:bg-[#1a1a1a] transition-colors p-10 md:p-12 flex flex-col justify-between"
            >
              <div className="text-sm font-bold tracking-widest text-[#5e5e5e] mb-6">TIME SAVED</div>
              <div className="mt-auto">
                <h3 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-6">
                  24<span className="text-[#454747]">h</span>
                </h3>
                <p className="text-[#c6c6c6] text-lg leading-relaxed">
                  Per proposal cycle. Automating the structural heavy lifting so you can focus on the closing strategy.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 bg-[#1a1c1c] hover:bg-[#1e2020] transition-colors p-10 md:p-12 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="text-sm font-bold tracking-widest text-[#5e5e5e] mb-6 relative z-10">RETURN ON PROPOSALS</div>
              <div className="mt-auto relative z-10">
                <h3 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-6">
                  12<span className="text-[#5d5f5f]">x</span>
                </h3>
                <p className="text-[#c6c6c6] text-lg leading-relaxed">
                  Direct correlation between PitchSnap mastery and net-new revenue realization across the enterprise.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </Container>
    </section>
  )
}
