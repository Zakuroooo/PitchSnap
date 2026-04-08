"use client"
import React, { useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const Spotlight = ({ className }: { className?: string }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 opacity-100 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(900px circle at ${x}px ${y}px, rgba(145, 94, 255, 0.12), transparent 40%)`
          ),
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-100 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 222, 255, 0.08), transparent 40%)`
          ),
        }}
      />
    </div>
  )
}
