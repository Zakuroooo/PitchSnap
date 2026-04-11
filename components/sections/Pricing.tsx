"use client"
import React, { useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import Container from "../layout/Container"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="relative py-32 w-full bg-[#0c0c0c] text-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="flex flex-col max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] text-[#5e5e5e] uppercase font-bold mb-6"
            >
              Investment
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter"
            >
              VALUE WITHOUT<br/>COMPROMISE.
            </motion.h2>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="flex flex-col items-start gap-4"
          >
             <p className="text-[#A1A1A1] text-lg max-w-sm">
                Structured pricing for operators who understand the compounding value of high-converting proposals.
             </p>
             {/* Billing Toggle */}
             <div className="flex items-center gap-6 mt-4">
               <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors pb-1 border-b-2 ${!isAnnual ? 'text-white border-white' : 'text-[#474747] border-transparent hover:text-[#919191]'}`}
               >
                 Monthly
               </button>
               <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors pb-1 border-b-2 ${isAnnual ? 'text-white border-white' : 'text-[#474747] border-transparent hover:text-[#919191]'}`}
               >
                 Annually (Save 20%)
               </button>
             </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch relative z-10 w-full lg:h-[600px]">
          
          {/* Starter Plan */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="flex-1 bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-12 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Starter</h3>
              <p className="text-[#A1A1A1] text-sm h-12">Essential architecture for solo freelancers entering the market.</p>
              <div className="mt-8 mb-12 flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tighter">$0</span>
                <span className="text-[#5e5e5e] font-bold text-sm uppercase tracking-widest">/ forever</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  "3 AI proposals per month",
                  "Standard Monolith templates",
                  "Basic analytics structure",
                  "Community access",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-white shrink-0" />
                    <span className="text-base text-[#c6c6c6]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-12 py-4 px-4 bg-[#1C1B1B] hover:bg-[#2a2a2a] text-white font-bold tracking-widest uppercase text-sm transition-colors">
              Deploy Starter
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="flex-[1.2] bg-white p-10 md:p-12 flex flex-col justify-between shadow-2xl relative z-20"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-2xl font-bold text-black uppercase tracking-wider">Pro</h3>
                 <span className="text-[10px] font-bold tracking-widest uppercase bg-black text-white px-3 py-1">Featured</span>
              </div>
              <p className="text-[#474747] text-sm h-12 pb-2">Unrestricted access for full-time operators scaling revenue.</p>
              <div className="mt-8 mb-12 flex items-baseline gap-2 text-black">
                <span className="text-7xl md:text-8xl font-black tracking-tighter leading-none">${isAnnual ? '15' : '19'}</span>
                <span className="text-[#474747] font-bold text-sm uppercase tracking-widest">/ month</span>
              </div>
              <div className="flex flex-col gap-4 text-black">
                 <p className="text-xs font-bold uppercase tracking-widest text-[#474747] mb-2 pb-2 border-b border-[#e2e2e2]">Everything in Starter, plus:</p>
                {[
                  "Unlimited proposal indexing",
                  "Custom brand alignment",
                  "CRM terminal integrations",
                  "Priority protocol support",
                  "E-signatures & digital contracts",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-black shrink-0" />
                    <span className="text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-12 py-4 px-4 bg-black hover:bg-[#1a1c1c] text-white font-bold tracking-widest uppercase text-sm transition-colors">
              Access Terminal
            </button>
          </motion.div>

          {/* Agency Plan */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="flex-1 bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-12 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Agency</h3>
              <p className="text-[#A1A1A1] text-sm h-12">Volume-based infrastructure for teams and high-output agencies.</p>
              <div className="mt-8 mb-12 flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tighter">${isAnnual ? '39' : '49'}</span>
                <span className="text-[#5e5e5e] font-bold text-sm uppercase tracking-widest">/ month</span>
              </div>
              <div className="flex flex-col gap-4">
                 <p className="text-xs font-bold uppercase tracking-widest text-[#5e5e5e] mb-2 pb-2 border-b border-[#1C1B1B]">Everything in Pro, plus:</p>
                {[
                  "Up to 5 operator seats",
                  "White-label domain hosting",
                  "API endpoints for automation",
                  "Dedicated success architect",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-white shrink-0" />
                    <span className="text-base text-[#c6c6c6]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-12 py-4 px-4 bg-[#1C1B1B] hover:bg-[#2a2a2a] text-white font-bold tracking-widest uppercase text-sm transition-colors">
              Contact Sales
            </button>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
