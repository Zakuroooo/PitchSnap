"use client"

import React, { useRef, useState } from "react"
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  glowColor?: string
  enableTilt?: boolean
}

export function GlowCard({ children, className, glowColor = "rgba(145, 94, 255, 0.15)", enableTilt = false, ...props }: GlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  // 3D Tilt calculations
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth return
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  // Map to degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], enableTilt ? ["4deg", "-4deg"] : ["0deg", "0deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], enableTilt ? ["-4deg", "4deg"] : ["0deg", "0deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    setPosition({ x: clientX, y: clientY })
    
    // Set 3d tilt
    x.set(clientX / rect.width - 0.5)
    y.set(clientY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    // Return to original flat position
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1500,
        ...props.style,
      }}
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
