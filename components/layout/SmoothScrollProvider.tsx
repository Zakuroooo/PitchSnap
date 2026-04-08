"use client"
import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time)
        requestAnimationFrame(raf)
      }
    }

    requestAnimationFrame(raf)

    // Handle standard browser resize
    const handleResize = () => {
      lenisRef.current?.resize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      lenis.destroy()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
