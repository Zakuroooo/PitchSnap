"use client"
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const SmoothCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 28 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);

      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"]')) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          html, body {
            cursor: none !important;
          }
          a, button, [role="button"] {
            cursor: none !important;
          }
        }
      `}} />
      
      {/* Small dot (instant) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] opacity-90 -ml-1 -mt-1 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
      
      {/* Ring (smooth spring) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border rounded-full pointer-events-none z-[9999] -ml-3 -mt-3 mix-blend-difference transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          borderColor: "rgba(255, 255, 255, 0.35)",
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.06)" : "transparent",
          scale: isHovering ? 1.5 : 1,
        }}
      />
    </>
  );
};
