"use client"
import React, { useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  delay?: number
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  from = 0, 
  to, 
  prefix = "", 
  suffix = "", 
  duration = 2,
  className = "",
  delay = 0
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const spring = useSpring(from, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  })

  const display = useTransform(spring, (current) => {
    return Math.floor(current).toLocaleString()
  })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        spring.set(to)
      }, delay * 1000)
    }
  }, [isInView, spring, to, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
