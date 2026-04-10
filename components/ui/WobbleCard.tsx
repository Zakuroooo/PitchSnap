"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  children: React.ReactNode;
  className?: string;
}

export function WobbleCard({ children, className }: WobbleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // max ~8deg depending on card size
    const y = -(e.clientY - top - height / 2) / 25;

    setTransformStyle(`perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "rounded-xl p-6 transition-transform duration-300 ease-out border",
        className
      )}
      style={{ 
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        transform: transformStyle,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </div>
  );
}
