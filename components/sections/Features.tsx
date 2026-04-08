"use client"
import React from "react"
import { motion } from "framer-motion"
import { Mail, FileText, Briefcase, Clock, DollarSign, History } from "lucide-react"
import Container from "../layout/Container"
import { GlowCard } from "../ui/glow-card"

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 w-full bg-[#0A0A0A] overflow-hidden">
      {/* Subtle Cyan Radial Glow */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(0,222,255,0.12)_0%,transparent_60%)] blur-[100px] z-0 pointer-events-none" />
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 rounded-full border border-[var(--violet)]/20 bg-[var(--violet)]/10 text-[var(--violet)] text-xs font-semibold tracking-wide uppercase"
          >
            Features
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)]">
              win the client.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
          
          {/* Large Card 1: Cold Email Generator */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            glowColor="rgba(145, 94, 255, 0.15)"
            className="group md:col-span-2 row-span-1 flex flex-col justify-between p-0"
          >
            <div className="relative z-10 p-8 sm:p-10 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[var(--violet)]/10 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-[var(--violet)] drop-shadow-[0_0_8px_#915EFF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Cold Email Generator</h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-sm">
                Instantly draft highly personalized cold emails that bypass spam filters and command a response.
              </p>
            </div>
            
            {/* Mock Email Preview Animation */}
            <div className="relative z-10 mx-8 mb-8 sm:mx-10 sm:-mb-4 h-48 rounded-xl bg-black/50 border border-white/5 p-5 overflow-hidden">
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full skew-x-12 opacity-50 pointer-events-none" />
              
              <div className="flex text-xs text-[var(--text-secondary)] mb-4 pb-2 border-b border-white/5 relative z-10">
                <span className="w-16">To:</span> <span className="text-white">founder@stellar.io</span>
              </div>
              <div className="flex text-xs text-[var(--text-secondary)] mb-4 relative z-10">
                <span className="w-16">Subject:</span> <span className="text-white font-medium">Re: Frontend Dev needs</span>
              </div>
              
              <div className="space-y-3 relative z-10">
                <div className="w-[80%] h-2 rounded bg-white/10 group-hover:bg-[var(--violet)]/20 transition-colors duration-500" />
                <div className="w-[90%] h-2 rounded bg-white/10 group-hover:bg-[var(--violet)]/20 transition-colors duration-500 delay-75" />
                <div className="w-[60%] h-2 rounded bg-white/10 group-hover:bg-[var(--violet)]/20 transition-colors duration-500 delay-150" />
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--cyan)]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </GlowCard>

          {/* Small Card 1: LinkedIn Outreach */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            glowColor="rgba(0, 222, 255, 0.15)"
            className="group md:col-span-1 p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[var(--cyan)]/10 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-[var(--cyan)] drop-shadow-[0_0_8px_#00DEFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">LinkedIn Outreach</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Generate connection notes perfectly formatted for LinkedIn's algorithm.
              </p>
            </div>
            
            {/* Mock LinkedIn Msg */}
            <div className="relative z-10 w-full rounded-lg bg-black/40 border border-white/5 p-4 overflow-hidden mt-auto">
               <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }} className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-[var(--cyan)]/10 to-transparent w-full h-full skew-x-12 opacity-50 pointer-events-none" />
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--cyan)]/20 flex items-center justify-center text-[8px]">In</div>
                  <div className="text-[10px] text-[var(--text-secondary)]">To: Tech Recruiter</div>
               </div>
               <div className="space-y-2">
                 <div className="w-full h-1.5 rounded bg-white/10" />
                 <div className="w-[80%] h-1.5 rounded bg-white/10" />
                 <div className="w-[60%] h-1.5 rounded bg-white/10" />
               </div>
            </div>
          </GlowCard>

          {/* Small Card 2: Follow-up Sequences */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            glowColor="rgba(145, 94, 255, 0.15)"
            className="group md:col-span-1 p-8"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[var(--violet)]/10 flex items-center justify-center mb-5">
                <Clock className="w-5 h-5 text-[var(--violet)] drop-shadow-[0_0_8px_#915EFF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Follow-ups</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Never let a lead go cold. Auto-generate perfectly timed follow-up sequences.
              </p>
            </div>
          </GlowCard>

          {/* Large Card 2: Full Proposal Writer */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            glowColor="rgba(145, 94, 255, 0.15)"
            className="group md:col-span-2 row-span-1 overflow-hidden flex flex-col sm:flex-row p-0"
          >
             <div className="relative z-10 p-8 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 border-[var(--violet)]/30">
                  <FileText className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Full Proposal Writer</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Generate comprehensive 5-page proposals covering project scope, timelines, deliverables, and terms in absolute seconds.
                </p>
             </div>

             {/* Animated Document Preview */}
             <div className="relative z-10 w-full sm:w-64 h-48 sm:h-auto translate-y-8 sm:translate-y-0 sm:translate-x-8 bg-[#1A1A1A] border border-white/10 rounded-tl-xl p-6 shadow-2xl flex flex-col gap-3 group-hover:-translate-y-1 sm:group-hover:-translate-x-1 sm:group-hover:-translate-y-0 transition-transform duration-500 overflow-hidden">
               <motion.div animate={{ x: ["-100%", "300%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full skew-x-12 opacity-30 pointer-events-none" />
               <div className="w-1/3 h-3 bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] rounded" />
               <div className="w-full h-2 bg-white/5 rounded mt-2" />
               <div className="w-[90%] h-2 bg-white/5 rounded" />
               <div className="w-full h-2 bg-white/5 rounded" />
               <div className="w-[75%] h-2 bg-white/5 rounded" />
               
               <div className="w-1/2 h-2 bg-white/10 rounded mt-4" />
               <div className="w-full h-8 border border-[var(--violet)]/20 rounded bg-[var(--violet)]/5 mt-1 grid grid-cols-2 gap-2 p-1">
                 <div className="bg-[var(--violet)]/20 rounded h-full" />
                 <div className="bg-[var(--cyan)]/20 rounded h-full" />
               </div>
             </div>
          </GlowCard>

          {/* Small Card 3: Pricing Suggester */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            glowColor="rgba(0, 222, 255, 0.15)"
            className="group md:col-span-1 p-8"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#00DEFF]/10 flex items-center justify-center mb-5">
                <DollarSign className="w-5 h-5 text-[#00DEFF] drop-shadow-[0_0_8px_#00DEFF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pricing Intel</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Get AI suggestions on how much to charge based on industry standards.
              </p>
            </div>
          </GlowCard>

          {/* Small Card 4: Generation History */}
          <GlowCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            glowColor="rgba(255, 255, 255, 0.1)"
            className="group md:col-span-3 lg:col-span-2 p-6 sm:p-8 flex flex-col sm:flex-row items-center text-center sm:text-left"
          >
            <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 flex items-center justify-center sm:mr-6 mb-4 sm:mb-0">
              <History className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Centralized Generation Cloud History</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Never lose a successful pitch. Every cold email, proposal, and LinkedIn message is automatically formatted and saved securely to your cloud history.
              </p>
            </div>
          </GlowCard>
          
        </div>
      </Container>
    </section>
  )
}
