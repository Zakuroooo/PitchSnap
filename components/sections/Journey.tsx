"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Container from "../layout/Container"
import { CardContainer, CardBody, CardItem } from "../ui/3d-card"

const JOURNEY_STEPS = [
  {
    id: "01",
    title: "The Scramble",
    description: "Survival mode. Chasing low-tier gigs on marketplaces. Competing on price rather than value. The noise is deafening, and the rewards are marginal."
  },
  {
    id: "02",
    title: "The Spark",
    description: "Discovery of PitchSnap. The realization that the medium is the message. Shifting from generic templates to curated, obsidian-grade storytelling."
  },
  {
    id: "03",
    title: "The Ascent",
    description: "Deploying high-fidelity proposals that stop the scroll. Authority is established before the first call. Clients no longer ask \"How much?\", they ask \"When?\"."
  },
  {
    id: "04",
    title: "The Zenith",
    description: "Closing high-ticket deals with absolute confidence. The Monolith aesthetic has become your signature. You are no longer a vendor; you are an architect.",
    isHighlight: true
  }
]

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section className="relative py-32 md:py-48 w-full bg-[#0c0c0c] text-white">
      <Container>
        
        {/* Header */}
        <div className="max-w-3xl mb-32 md:mb-48">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6"
          >
            THE FREELANCE<br/>CHRONICLES.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#A1A1A1] text-lg md:text-xl max-w-xl"
          >
            A narrative of growth from the chaos of volume to the precision of value. This is the path to the high-ticket zenith.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto flex flex-col gap-24 md:gap-40">
          
          {/* Track background */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[#1C1B1B]" />
          
          {/* Scroll Progress Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-white origin-top"
            style={{ height: lineHeight }}
          />

          {JOURNEY_STEPS.map((step, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-0">
                
                {/* Visual Node */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#0c0c0c] border border-white rounded-full flex items-center justify-center">
                  {step.isHighlight && (
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-full h-full bg-white rounded-full blur-[4px]"
                    />
                  )}
                  {step.isHighlight && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>

                {/* Card Side */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:order-2 md:pl-24'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}
                  >
                    <span className="text-[#353534] text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 md:-mb-6 opacity-50 pointer-events-none select-none">
                      {step.id}
                    </span>

                    {/* 3D Card wrapping each journey card — containerClassName = outer perspective div */}
                    <CardContainer containerClassName="w-full" className="inter-var w-full">
                      <CardBody className={`bg-[#111111] p-8 md:p-12 hover:bg-[#161616] transition-colors relative w-full ${step.isHighlight ? 'shadow-[0_0_60px_rgba(255,255,255,0.05)]' : ''}`}>
                        <CardItem
                          translateZ={20}
                          className={`text-2xl md:text-3xl font-extrabold mb-4 ${step.isHighlight ? 'text-white' : 'text-[#c6c6c6]'}`}
                        >
                          {step.title}
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ={10}
                          className="text-[#A1A1A1] leading-relaxed text-base md:text-lg"
                        >
                          {step.description}
                        </CardItem>
                      </CardBody>
                    </CardContainer>

                  </motion.div>
                </div>

                {/* Desktop Spacer */}
                <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : ''}`} />

              </div>
            )
          })}
        </div>

      </Container>
    </section>
  )
}
