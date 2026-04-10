"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  target, 
  suffix = "", 
  duration = 2,
  className 
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${Math.round(value).toLocaleString()}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, target, duration, suffix]);

  return <span ref={nodeRef} className={className}>0{suffix}</span>;
}
