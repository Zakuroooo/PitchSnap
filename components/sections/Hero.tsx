"use client"
import React from "react"
import { motion } from "framer-motion"
import { Spotlight } from "../aceternity/spotlight"
import { BackgroundBeams } from "../aceternity/background-beams"
import { AnimatedHeading } from "../ui/animated-heading"
import { TextGenerateEffect } from "../aceternity/text-generate-effect"
import { HoverBorderGradient } from "../aceternity/hover-border-gradient"
import { CardContainer, CardBody, CardItem } from "../aceternity/3d-card"
import Container from "../layout/Container"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-x-clip pt-20">
      {/* Background Mesh & Spotlight */}
      <Spotlight />
      <BackgroundBeams />
      
      {/* CSS Animated Dots Replacement */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 bg-[var(--cyan)] rounded-full animate-[ping_4s_linear_infinite] opacity-30" />
        <div className="absolute top-[60%] left-[80%] w-2 h-2 bg-[var(--violet)] rounded-full animate-[ping_5s_ease-in-out_infinite] opacity-20" />
        <div className="absolute top-[80%] left-[20%] w-1.5 h-1.5 bg-white/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] right-[25%] w-1 h-1 bg-[var(--cyan)] rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* The main container centered vertically */}
      <Container className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-16 md:mt-0">
        
        {/* Left Content: Copy & CTAs */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-2xl w-full">
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
          <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-left w-full flex flex-col items-start gap-1">
            <AnimatedHeading text="Win more clients with" className="text-white m-0 p-0 text-left justify-start" />
            <AnimatedHeading text="AI proposals" gradient className="m-0 p-0 text-left justify-start" />
          </div>

          {/* Subtitle via TextGenerateEffect */}
          <div className="min-h-[5rem] mb-10 w-full max-w-xl text-[var(--text-secondary)]">
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
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            {/* Upgraded Gradient CTA */}
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(145,94,255,0.3)] hover:shadow-[0_0_50px_rgba(0,222,255,0.6)] transition-all duration-500 hover:scale-[1.02] active:scale-95 group relative overflow-hidden"
              as="button"
              className="bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-[inherit] min-w-[200px]"
            >
              <span className="relative z-10 flex items-center group-hover:font-black transition-all">
                Get Started Free <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-white/20 scale-0 rounded-full group-active:animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1]" />
            </HoverBorderGradient>
            
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-[var(--text-secondary)] flex items-center justify-center min-w-[160px] hover:scale-[1.02] active:scale-[0.98]">
              See Features
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8"
          >
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-9 h-9 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center text-[10px] font-bold text-white shadow-sm z-[${5-i}] relative`} style={{ opacity: 1 - (i * 0.1) }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start text-left">
              <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
                <span className="flex text-[#FFD700]">
                  ★★★★★
                </span> 
                4.9/5
              </div>
              <p className="text-sm text-[var(--text-tertiary)] mt-0.5">Join 2,400+ freelancers winning clients</p>
            </div>
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
            {/* Enlarged card and glowing border */}
            <CardBody className="bg-[#111111] relative group/card border-white/[0.08] w-full sm:w-[32rem] h-auto rounded-xl p-8 border shadow-[0_0_30px_rgba(145,94,255,0.15)] hover:shadow-[0_0_40px_rgba(145,94,255,0.3)] transition-shadow duration-500">
              
              {/* Proposal Mock Header */}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white mb-2 tracking-tight"
              >
                Subject: Re: Your Web App Project
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-[var(--text-secondary)] text-sm mb-6"
              >
                To: <span className="text-white font-medium">client@acmecorp.com</span>
              </CardItem>
              
              {/* Actual Email Text Area */}
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="w-full rounded-lg bg-[#1A1A1A] border border-white/5 p-6 relative overflow-hidden text-[var(--text-secondary)] text-sm font-normal leading-relaxed text-left">
                   <p className="mb-4 text-white">Hi Team,</p>
                   <p className="mb-4">
                     I noticed you're looking to scale your frontend infrastructure. I specialize in building high-performance Next.js and React applications that drive conversions.
                   </p>
                   <p className="mb-6">
                     Based on your description, I can implement a complete design system and responsive dashboard in under 4 weeks. Can we schedule a quick chat to discuss the architecture?
                   </p>
                   
                   <div className="flex items-center gap-2 mt-2 text-[var(--cyan)] font-medium text-xs border border-[var(--cyan)]/20 bg-[var(--cyan)]/10 w-fit px-3 py-1.5 rounded-md">
                     <CheckCircle2 className="w-3.5 h-3.5" /> High Conversion Tone
                   </div>
                   
                   {/* Purple glow behind lines */}
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--violet)]/20 blur-3xl pointer-events-none transition-all duration-500 group-hover/card:bg-[var(--cyan)]/30" />
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
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--violet)] to-[#7C40FF] text-white text-sm font-semibold shadow-[0_4px_14px_rgba(145,94,255,0.39)] hover:shadow-[0_6px_20px_rgba(145,94,255,0.4)] transition-all flex flex-row gap-2 items-center"
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
