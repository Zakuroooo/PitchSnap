"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import FreelancerCharacter from "@/components/anime/FreelancerCharacter";

export default function TestCharacterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: "400vh",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Fixed character in center */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Scroll down to see all 4 states
          </p>
          <FreelancerCharacter scrollYProgress={scrollYProgress} />
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            State changes at 25%, 50%, 75% scroll
          </p>
        </div>
      </div>
    </div>
  );
}
