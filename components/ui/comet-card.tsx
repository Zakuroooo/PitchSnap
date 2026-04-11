"use client"
import React from "react";
import { cn } from "@/lib/utils";

export const CometCard = ({ children, className, innerClassName }: { children: React.ReactNode, className?: string, innerClassName?: string }) => {
  return (
    <div className={cn("relative overflow-hidden p-[1px] group rounded-2xl transition-transform duration-300 hover:-translate-y-2", className)}>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.6)_360deg)] animate-[spin_2s_linear_infinite]" />
      </div>
      <div className={cn("relative z-10 w-full h-full rounded-[15px] overflow-hidden", innerClassName)}>
        {children}
      </div>
    </div>
  )
}
