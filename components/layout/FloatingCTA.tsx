"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap } from "lucide-react"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8
      
      // Find pricing section
      const pricingSection = document.getElementById("pricing")
      const pricingTop = pricingSection ? pricingSection.offsetTop - window.innerHeight + 100 : Infinity

      if (scrollY > heroHeight && scrollY < pricingTop) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 right-8 z-[55] flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white font-semibold text-sm shadow-[0_0_30px_rgba(145,94,255,0.4)] hover:shadow-[0_0_40px_rgba(0,222,255,0.6)] hover:scale-105 active:scale-95 transition-all"
          onClick={() => {
             window.location.href = "/signup"
          }}
        >
          <Zap className="w-4 h-4 fill-white" />
          Generate Free Proposal
        </motion.button>
      )}
    </AnimatePresence>
  )
}
