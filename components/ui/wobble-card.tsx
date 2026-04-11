"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.02, 1.02, 1) rotateX(${-mousePosition.y * 0.15}deg) rotateY(${mousePosition.x * 0.15}deg)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0)",
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d"
      }}
      className={cn(
        "relative rounded-2xl overflow-hidden shadow-xl transition-all",
        containerClassName
      )}
    >
      <div className={cn("relative h-full w-full", className)}>
        {children}
      </div>
    </motion.section>
  );
};
