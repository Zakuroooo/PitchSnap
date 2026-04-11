"use client";

import { motion } from "framer-motion";
import Container from "../layout/Container";

/* ================================================================
   LogoMarquee — Infinite scrolling platform logos
   Pure CSS @keyframes animation — no JS, no requestAnimationFrame
   ================================================================ */

const LOGOS = [
  { name: "Upwork", icon: "upwork" },
  { name: "Fiverr", icon: "fiverr" },
  { name: "Toptal", icon: "toptal" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "Dribbble", icon: "dribbble" },
  { name: "Freelancer", icon: "freelancer" },
  { name: "Behance", icon: "behance" },
] as const;

function LogoItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 px-8 md:px-12 group"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center gap-3">
        <img
          src={`https://cdn.simpleicons.org/${icon}/white`}
          alt={`${name} logo`}
          className="w-6 h-6 md:w-7 md:h-7 object-contain opacity-40 transition-all duration-300 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <span
          className="text-base md:text-lg font-semibold tracking-tight whitespace-nowrap select-none transition-all duration-300 opacity-40 group-hover:opacity-100"
          style={{
            color: "rgba(255, 255, 255, 1)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          {name}
        </span>
      </div>
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
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} icon={logo.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
