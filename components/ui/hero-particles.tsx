"use client"
import React, { useEffect, useRef } from "react"

export const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let particles: { x: number; y: number; vx: number; vy: number; originX: number; originY: number }[] = []
    
    let mouse = { x: -1000, y: -1000 }

    const init = () => {
      particles = []
      const numParticles = 60
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }
    }

    init()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    
    // For smooth resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      init()
    }

    window.addEventListener("pointermove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        // Wrap around simple
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Repel from mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distance = Math.hypot(dx, dy)

        if (distance < 120) {
          const angle = Math.atan2(dy, dx)
          const force = (120 - distance) / 120
          p.x -= Math.cos(angle) * force * 5
          p.y -= Math.sin(angle) * force * 5
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("pointermove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
