"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";

/* ================================================================
   LogoMarquee — Infinite scrolling platform logos
   Pure CSS @keyframes animation — no JS, no requestAnimationFrame
   ================================================================ */

/* Platform logos as simple SVG text marks — no external images */
const LOGOS = [
  { name: "Upwork", width: 90 },
  { name: "Fiverr", width: 75 },
  { name: "Toptal", width: 80 },
  { name: "LinkedIn", width: 95 },
  { name: "Dribbble", width: 90 },
  { name: "Contra", width: 75 },
  { name: "Freelancer", width: 105 },
  { name: "99designs", width: 95 },
] as const;

function LogoItem({ name }: { name: string }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 px-8 md:px-12"
      style={{ willChange: "transform" }}
    >
      <span
        className="text-base md:text-lg font-semibold tracking-tight whitespace-nowrap select-none"
        style={{
          color: "rgba(255, 255, 255, 0.15)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  /* Duplicate logos 3x for seamless loop */
  const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top/bottom fade borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      {/* Section label */}
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium uppercase tracking-[0.15em] mb-8"
          style={{ color: "var(--color-text-muted)" }}
        >
          Trusted by freelancers on
        </motion.p>
      </Container>

      {/* Left/right edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* Marquee track */}
      <div className="relative flex items-center overflow-hidden scrollbar-hide">
        <div
          className="flex items-center animate-marquee"
          style={{ willChange: "transform" }}
        >
          {tripled.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
