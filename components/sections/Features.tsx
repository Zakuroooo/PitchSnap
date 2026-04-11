"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Briefcase, Clock, FileText, DollarSign, History } from "lucide-react"
import Container from "../layout/Container"
import { CardContainer, CardBody, CardItem } from "../ui/3d-card"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="relative py-24 sm:py-32 w-full bg-[#0c0c0c] text-white">
      <Container>
        <div className="flex flex-col mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.2em] text-[#5e5e5e] uppercase font-bold mb-6"
          >
            Capabilities
          </motion.div>
          
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter max-w-2xl"
          >
            EVERYTHING YOU NEED TO WIN THE CLIENT.
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Large Card 1: Cold Email Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group md:col-span-2 row-span-1 bg-[#131313] hover:bg-[#1a1b1c] transition-colors flex flex-col justify-between overflow-hidden"
          >
            <div className="p-8 sm:p-12 flex-1">
              <div className="w-12 h-12 rounded bg-[#1C1B1B] flex items-center justify-center mb-8">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">Cold Email Generator</h3>
              <p className="text-[#A1A1A1] text-lg max-w-md">
                Instantly draft highly personalized cold emails that bypass spam filters and command a response.
              </p>
            </div>
            
            {/* Mock Email Preview Animation */}
            <div className="bg-[#0e0e0e] border-t border-[#1C1B1B] p-8 mt-auto mx-4 sm:mx-12 rounded-t-xl overflow-hidden relative">
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent w-full h-full pointer-events-none" />
              <div className="flex text-xs text-[#5e5e5e] mb-4 pb-2 border-b border-[#1C1B1B]">
                <span className="w-16 uppercase tracking-widest font-bold">To:</span> <span className="text-[#c6c6c6]">founder@stellar.io</span>
              </div>
              <div className="flex text-xs text-[#5e5e5e] mb-6">
                <span className="w-16 uppercase tracking-widest font-bold">Subject:</span> <span className="text-white font-bold">Re: Frontend Architecture</span>
              </div>
              <div className="space-y-3">
                <div className="w-[85%] h-1 rounded bg-[#1C1B1B]" />
                <div className="w-[90%] h-1 rounded bg-[#1C1B1B]" />
                <div className="w-[60%] h-1 rounded bg-[#1C1B1B]" />
              </div>
            </div>
          </motion.div>

          {/* Small Card 1: LinkedIn Outreach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group md:col-span-1 bg-[#1A1C1C] p-8 sm:p-12 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center mb-8">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-4">LinkedIn Outreach</h3>
              <p className="text-[#A1A1A1] text-base mb-8">
                Generate connection notes perfectly formatted for algorithms.
              </p>
            </div>
            <div className="w-full bg-[#131313] p-6 rounded-lg border border-[#201f1f]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-[#1C1B1B] flex items-center justify-center font-bold text-[10px]">IN</div>
                  <div className="text-[10px] text-[#5e5e5e] font-bold tracking-widest uppercase">Tech Recruiter</div>
               </div>
               <div className="space-y-2">
                 <div className="w-full h-1 rounded bg-[#2A2A2A]" />
                 <div className="w-[80%] h-1 rounded bg-[#2A2A2A]" />
                 <div className="w-[60%] h-1 rounded bg-[#2A2A2A]" />
               </div>
            </div>
          </motion.div>

          {/* Small Card 2: Follow-up Sequences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group md:col-span-1 bg-[#161616] hover:bg-[#1c1b1b] transition-colors p-8 sm:p-12"
          >
            <div className="w-12 h-12 rounded bg-[#201f1f] flex items-center justify-center mb-8">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-4">Smart Follow-ups</h3>
            <p className="text-[#A1A1A1] text-base">
              Never let a lead go cold. Auto-generate perfectly timed follow-up sequences.
            </p>
          </motion.div>

          {/* Large Card 2: Full Proposal Writer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group md:col-span-2 row-span-1 bg-[#131313] hover:bg-[#1a1b1c] transition-colors overflow-hidden flex flex-col sm:flex-row"
          >
             <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center relative z-10 w-full sm:w-1/2">
                <div className="w-12 h-12 rounded bg-[#1C1B1B] flex items-center justify-center mb-8">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-3xl font-extrabold text-[#F5F5F5] mb-4">Full Proposal Writer</h3>
                <p className="text-[#A1A1A1] text-lg max-w-sm">
                  Generate comprehensive 5-page proposals covering scope, timelines, deliverables, and terms.
                </p>
             </div>

             <div className="bg-[#0e0e0e] w-full sm:w-1/2 border-l border-[#1C1B1B] p-12 relative overflow-hidden flex flex-col items-center justify-center group-hover:bg-[#111111] transition-colors">
               <motion.div animate={{ x: ["-100%", "300%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent w-full h-full pointer-events-none" />
               <div className="w-48 h-64 bg-[#1C1B1B] border border-[#2A2A2A] p-6 shadow-2xl flex flex-col gap-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-full h-12 bg-[#2A2A2A] rounded-sm mb-2" />
                  <div className="w-full h-2 bg-[#2A2A2A] rounded-sm" />
                  <div className="w-[85%] h-2 bg-[#2A2A2A] rounded-sm" />
                  <div className="w-[90%] h-2 bg-[#2A2A2A] rounded-sm" />
                  <div className="w-[60%] h-2 bg-[#2A2A2A] rounded-sm" />
               </div>
             </div>
          </motion.div>

          {/* Small Card 3: Pricing Suggester */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group md:col-span-1 bg-[#1A1C1C] p-8 sm:p-12 hover:bg-[#201F1F] transition-colors"
          >
            <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center mb-8">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-4">Pricing Intel</h3>
            <p className="text-[#A1A1A1] text-base">
              Get AI suggestions on how much to charge based on industry standards.
            </p>
          </motion.div>

          {/* Small Card 4: Generation History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group md:col-span-2 bg-[#131313] p-8 sm:p-12 flex flex-col sm:flex-row items-center text-center sm:text-left gap-8"
          >
            <div className="w-16 h-16 shrink-0 rounded bg-[#1C1B1B] flex items-center justify-center">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white mb-3">Generation Cloud History</h3>
              <p className="text-[#A1A1A1] text-base">
                Never lose a successful pitch. Every cold email, proposal, and LinkedIn message is automatically protected.
              </p>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  )
}
