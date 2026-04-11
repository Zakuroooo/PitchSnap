"use client"
import React from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll()
  
  // Add a slight spring to make it buttery
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[10000] origin-left"
      style={{ scaleX }}
    />
  )
}
