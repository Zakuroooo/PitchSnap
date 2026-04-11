"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import FreelancerCharacter from "../anime/FreelancerCharacter";

/* ── Stagger animation variants ────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Scroll progress tied to hero section — drives the character */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full overflow-x-clip"
      style={{
        backgroundColor: "var(--color-bg)",
        /* 400vh so character has room to scroll through all 4 states */
        height: "400vh",
      }}
    >
      {/* Sticky inner container — stays visible while scrolling through 400vh */}
      <div className="sticky top-0 h-screen flex items-center">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

        {/* Very subtle radial glow top-center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-16">
            {/* ── Left: Copy ────────────────────────────────────── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col items-start max-w-2xl w-full"
            >
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--color-text-secondary)" }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: "var(--color-text-primary)" }} />
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  PitchSnap AI is now available
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-bold tracking-tight mb-6 leading-[1.05]"
                style={{
                  fontSize: "var(--text-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                Win more clients
                <br />
                with{" "}
                <span style={{ color: "#F5F5F5" }}>AI proposals</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
                style={{ color: "var(--color-text-secondary)" }}
              >
                PitchSnap generates tailored cold emails, LinkedIn messages, and
                full project proposals in under 10 seconds. Focus on the work,
                let AI handle the pitch.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link href="/signup" className="btn-white flex items-center gap-2 px-7 py-3.5 text-sm">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#features"
                  className="btn-ghost flex items-center justify-center px-7 py-3.5 text-sm"
                >
                  See Features
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-10"
              >
                {/* Avatar stack */}
                <div className="flex -space-x-2.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold"
                      style={{
                        borderColor: "var(--color-bg)",
                        backgroundColor: `rgba(255,255,255,${0.08 + i * 0.03})`,
                        color: "var(--color-text-secondary)",
                        zIndex: 5 - i,
                        position: "relative",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    <span style={{ color: "#F5F5F5" }}>★★★★★</span> 4.9/5
                  </div>
                  <p
                    className="text-sm mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Join 2,400+ freelancers winning clients
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Anime Character ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex-1 flex items-center justify-center lg:justify-end"
            >
              <FreelancerCharacter scrollYProgress={scrollYProgress} />
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
