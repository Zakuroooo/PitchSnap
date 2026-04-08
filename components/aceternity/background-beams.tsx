"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 z-0 flex items-center justify-center", className)}>
      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, white 10%, transparent 90%)"
        }} 
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_20%,#0A0A0A_100%)] pointer-events-none"
      />
    </div>
  )
}
