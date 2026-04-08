"use client"
import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export const CustomCursor = () => {
  const [isClient, setIsClient] = useState(false)
  
  // Custom cursor states mapping to the user demands
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">("default")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  // Dot follows exactly
  const cursorXSpring = useSpring(cursorX, { damping: 40, stiffness: 400, mass: 0.1 })
  const cursorYSpring = useSpring(cursorY, { damping: 40, stiffness: 400, mass: 0.1 })
  
  // Ring follows with slight delay and springiness
  const ringXSpring = useSpring(cursorX, springConfig)
  const ringYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setIsClient(true)
    
    // Using a performant pointer listener globally
    const moveCursor = (e: PointerEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Standard interactive elements check
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest("[role='button']") ||
        target.closest("[data-cursor='hover']")
      ) {
        setCursorState("hover")
        return
      }

      // Check if text (p, h1, h2, h3, span)
      if (
        ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"].includes(target.tagName) && 
        !target.closest("button")
      ) {
        setCursorState("text")
        return
      }

      setCursorState("default")
    }

    window.addEventListener("pointermove", moveCursor)
    window.addEventListener("mouseover", checkHoverState)

    return () => {
      window.removeEventListener("pointermove", moveCursor)
      window.removeEventListener("mouseover", checkHoverState)
    }
  }, [cursorX, cursorY])

  if (!isClient) return null

  // Ring variants for hover/text interactions
  const variants = {
    default: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "1px solid rgba(255,255,255,0.4)"
    },
    hover: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: "rgba(145,94,255,0.2)",
      border: "1px solid rgba(145,94,255,0.8)"
    },
    text: {
      width: 2,
      height: 24,
      borderRadius: "0%",
      backgroundColor: "rgba(0,222,255,0.8)",
      border: "none"
    }
  }

  return (
    <>
      <style>{`
        body * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          opacity: cursorState === "text" ? 0 : 1
        }}
      />
    </>
  )
}
