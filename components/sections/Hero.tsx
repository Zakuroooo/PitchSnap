"use client"
import React from "react"
import { motion } from "framer-motion"
import { Spotlight } from "../aceternity/spotlight"
import { BackgroundBeams } from "../aceternity/background-beams"
import { TextGenerateEffect } from "../aceternity/text-generate-effect"
import { HoverBorderGradient } from "../aceternity/hover-border-gradient"
import { CardContainer, CardBody, CardItem } from "../aceternity/3d-card"
import Container from "../layout/Container"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Mesh & Spotlight */}
      <Spotlight />
      <BackgroundBeams />
      
      <Container className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Content: Copy & CTAs */}
        <div className="flex-1 flex flex-col items-start justify-center pt-10 lg:pt-0 max-w-2xl w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 backdrop-blur-sm"
            style={{ 
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.03)"
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--violet)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--violet)] shadow-[0_0_8px_var(--violet)]"></span>
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)]">PitchSnap AI is now available</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white"
          >
            Win more clients with <br className="hidden lg:block" />
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)]">
              AI proposals
            </span>
          </motion.h1>

          {/* Subtitle via TextGenerateEffect */}
          <div className="h-28 sm:h-20 mb-10 w-full max-w-xl text-[var(--text-secondary)]">
            <TextGenerateEffect 
              words="PitchSnap generates tailored cold emails, LinkedIn messages, and full project proposals in under 10 seconds. Focus on the work, let AI handle the pitch." 
              className="text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)]" 
            />
          </div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto"
              as="button"
              className="bg-[var(--background)] text-white w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-[inherit] min-w-[200px]"
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
            </HoverBorderGradient>
            
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold border border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all text-[var(--text-secondary)] flex items-center justify-center min-w-[160px]">
              See Features
            </button>
          </motion.div>

        </div>

        {/* Right Content: 3D Floater Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 w-full flex items-center justify-center lg:justify-end"
        >
          <CardContainer className="inter-var">
            <CardBody className="bg-[#111111] relative group/card border-white/[0.08] w-full sm:w-[30rem] h-auto rounded-xl p-6 border shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              
              {/* Proposal Mock Header */}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white mb-2 tracking-tight"
              >
                Full Stack Web App Proposal
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-[var(--text-secondary)] text-sm mb-6"
              >
                Prepared exclusively for <span className="text-white font-medium">Acme Corp</span>
              </CardItem>
              
              {/* Fake Content Area */}
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="w-full rounded-lg bg-[#1A1A1A] border border-white/5 p-5 relative overflow-hidden">
                   <div className="font-semibold text-white/90 text-sm mb-3">Project Scope</div>
                   {/* Fake skeleton lines */}
                   <div className="w-full h-2.5 bg-white/10 rounded mb-3"></div>
                   <div className="w-[90%] h-2.5 bg-white/10 rounded mb-3"></div>
                   <div className="w-[95%] h-2.5 bg-white/10 rounded mb-3"></div>
                   <div className="w-3/4 h-2.5 bg-white/10 rounded mb-5"></div>
                   
                   <div className="flex items-center gap-2 mt-4 text-[var(--cyan)] font-medium text-xs border border-[var(--cyan)]/20 bg-[var(--cyan)]/10 w-fit px-3 py-1.5 rounded-md">
                     <CheckCircle2 className="w-3.5 h-3.5" /> High Conversion Tone
                   </div>
                   
                   {/* Purple glow behind lines */}
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--violet)]/20 blur-3xl pointer-events-none" />
                </div>
              </CardItem>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-lg text-xs font-medium text-[var(--text-tertiary)] hover:text-white transition-colors"
                >
                  Regenerate ⟳
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--violet)] to-[#7C40FF] text-white text-xs font-semibold shadow-[0_4px_14px_rgba(145,94,255,0.39)] hover:shadow-[0_6px_20px_rgba(145,94,255,0.4)] transition-all"
                >
                  Copy Pitch
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </motion.div>

      </Container>
    </section>
  )
}
