"use client"
import React from "react"
import { motion } from "framer-motion"

export const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 min-h-screen w-full overflow-hidden pointer-events-none z-[1]">
      <motion.div
        animate={{
          y: ["0%", "20%", "0%"],
          x: ["0%", "-10%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(145,94,255,0.06)_0%,transparent_60%)] blur-[80px]"
      />
      
      <motion.div
        animate={{
          y: ["0%", "-20%", "0%"],
          x: ["0%", "10%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,222,255,0.06)_0%,transparent_60%)] blur-[100px]"
      />

      <motion.div
        animate={{
          y: ["0%", "15%", "0%"],
          x: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(145,94,255,0.08)_0%,transparent_60%)] blur-[80px]"
      />
    </div>
  )
}
