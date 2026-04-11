"use client"
import React from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedHeadingProps {
  text: string
  className?: string
  gradient?: boolean
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className, gradient = false }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Split text into characters including spaces
  const letters = text.split("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Hover wave effect variant
  const hoverVariants = {
    hover: (i: number) => ({
      y: -4,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 10,
        delay: i * 0.02
      }
    }),
    initial: {
      y: 0
    }
  }

  return (
    <motion.h2
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className={`${className} flex flex-wrap justify-center`}
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          custom={i}
          variants={{ ...childVariants, ...hoverVariants }}
          key={i}
          className={`inline-block ${gradient ? "text-[#F5F5F5]" : ""} ${letter === " " ? "w-3" : ""}`}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h2>
  )
}
