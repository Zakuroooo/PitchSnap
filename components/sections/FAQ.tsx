"use client"
import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import Container from "../layout/Container"

const FAQS = [
  {
    question: "Do I need any technical skills to use PitchSnap?",
    answer: "No. Just enter your client details and service — PitchSnap handles everything else in under 10 seconds.",
  },
  {
    question: "What types of proposals can PitchSnap generate?",
    answer: "Cold emails, LinkedIn outreach messages, full project proposals, 3-email follow-up sequences, and pricing suggestions.",
  },
  {
    question: "How many proposals can I generate for free?",
    answer: "The free tier includes 5 proposals per month. Pro and Agency plans offer unlimited generation.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All proposals are encrypted and stored securely. We never share your client data with third parties.",
  },
  {
    question: "Can I customize the tone of my proposals?",
    answer: "Absolutely. Choose from Professional, Friendly, or Bold tone — PitchSnap adapts the entire output to match your style.",
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-32 w-full bg-[#0c0c0c] text-white">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-between items-start">
          
          {/* Header Area */}
          <div className="md:w-1/3 flex flex-col md:sticky md:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] text-[#5e5e5e] uppercase font-bold mb-6"
            >
              Intelligence
            </motion.div>
            
            <motion.h2 
               ref={ref}
               initial={{ opacity: 0, x: -20 }}
               animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-6xl md:text-8xl font-black tracking-tighter"
            >
              CLARITY.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A1A1A1] text-lg max-w-sm mt-8 leading-relaxed"
            >
              Uncompromising answers to operational protocols.
            </motion.p>
          </div>

          {/* Accordion Area */}
          <div className="md:w-2/3 flex flex-col w-full">
            {FAQS.map((faq, index) => {
               const isOpen = openIndex === index;
               
               return (
                 <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`border-b border-[#1C1B1B] overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#111111]' : 'hover:bg-[#0e0e0e]'}`}
                 >
                   <button 
                     onClick={() => toggleAccordion(index)}
                     className="w-full py-8 px-6 md:px-10 flex items-center justify-between text-left focus:outline-none"
                   >
                     <span className={`text-xl md:text-2xl font-bold tracking-tight pr-8 transition-colors ${isOpen ? 'text-white' : 'text-[#c6c6c6]'}`}>
                       {faq.question}
                     </span>
                     <span className="text-[#5e5e5e] shrink-0">
                       {isOpen ? <Minus className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6" />}
                     </span>
                   </button>
                   
                   <AnimatePresence>
                     {isOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                       >
                         <div className="px-6 md:px-10 pb-8 pt-2">
                           <p className="text-[#A1A1A1] text-lg leading-relaxed max-w-3xl">
                             {faq.answer}
                           </p>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.div>
               )
            })}
          </div>
          
        </div>
      </Container>
    </section>
  )
}
