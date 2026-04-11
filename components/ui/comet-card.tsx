"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden p-[1px]", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spinning conic gradient comet border — always spinning, fades in/out on hover */}
      <div
        className="pointer-events-none absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 340deg, rgba(255,255,255,0.6) 360deg)",
          animation: "spin 2s linear infinite",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Card content — sits above the border layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
