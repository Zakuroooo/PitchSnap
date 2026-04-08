"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 z-0 flex items-center justify-center opacity-40", className)}>
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1713531189/grid-paper_v0x7m0.svg')] bg-center [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,transparent_20%,#0A0A0A_100%)] pointer-events-none"
      />
    </div>
  )
}
