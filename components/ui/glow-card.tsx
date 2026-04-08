"use client"

import React, { useRef, useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  glowColor?: string
}

export function GlowCard({ children, className, glowColor = "rgba(145, 94, 255, 0.15)", ...props }: GlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[rgba(145,94,255,0.05)] to-[rgba(0,222,255,0.02)] transition-shadow hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  )
}
