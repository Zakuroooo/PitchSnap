"use client";

import { useEffect, useState } from "react";
import {
  type MotionValue,
  useTransform,
  motion,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";

/* ================================================================
   FreelancerCharacter — Pure SVG anime character with 4 states
   Scroll-driven via scrollYProgress from parent Hero section
   ================================================================ */

interface FreelancerCharacterProps {
  scrollYProgress: MotionValue<number>;
}

const SPEECH_BUBBLES = [
  "Writing proposals for hours...",
  "Wait... 10 seconds?!",
  "Proposals sent!",
  "Client said YES!",
] as const;



export default function FreelancerCharacter({
  scrollYProgress,
}: FreelancerCharacterProps) {
  const [currentState, setCurrentState] = useState(0);

  /* ── Derive state index from scroll ──────────────────────────── */
  const heroState = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0, 1, 2, 3]
  );

  useMotionValueEvent(heroState, "change", (v) => {
    setCurrentState(Math.round(v));
  });



  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.04, 0.08]
  );

  const characterScale = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1.5, 1.5, 1.55]
  );



  return (
    <motion.div
      className="relative select-none"
      style={{
        scale: characterScale,
        willChange: "transform",
      }}
    >
      {/* ── Speech bubble ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -top-4 -left-8 md:-left-16 z-10"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            className="relative px-5 py-3 shadow-2xl backdrop-blur-md"
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.7)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "20px 20px 20px 0px",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            }}
          >
            {SPEECH_BUBBLES[currentState]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Floating elements (CSS @keyframes only) ────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* State 0: Papers flying chaotically */}
        {currentState === 0 && (
          <>
            <div
              className="absolute animate-float-chaos"
              style={{
                top: "15%",
                left: "5%",
                width: 16,
                height: 20,
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.08)",
                animationDelay: "0s",
                willChange: "transform",
              }}
            />
            <div
              className="absolute animate-float-chaos"
              style={{
                top: "25%",
                right: "8%",
                width: 14,
                height: 18,
                backgroundColor: "rgba(255,255,255,0.10)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.06)",
                animationDelay: "0.6s",
                willChange: "transform",
              }}
            />
            <div
              className="absolute animate-float-chaos"
              style={{
                top: "10%",
                right: "25%",
                width: 12,
                height: 16,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.05)",
                animationDelay: "1.2s",
                willChange: "transform",
              }}
            />
            {/* Sweat drop */}
            <div
              className="absolute animate-sweat-drop"
              style={{
                top: "22%",
                left: "62%",
                width: 6,
                height: 10,
                backgroundColor: "rgba(255,255,255,0.25)",
                borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
                willChange: "transform",
              }}
            />
          </>
        )}

        {/* State 1: Question mark bobbing */}
        {currentState === 1 && (
          <div
            className="absolute animate-question-bob font-bold"
            style={{
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "22px",
              color: "rgba(255,255,255,0.35)",
              willChange: "transform",
            }}
          >
            ?
          </div>
        )}

        {/* State 2: Envelopes flying */}
        {currentState === 2 && (
          <>
            <div
              className="absolute animate-fly-right"
              style={{ top: "45%", right: "10%", willChange: "transform" }}
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect
                  width="16"
                  height="12"
                  rx="2"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,0 L8,6 L16,0"
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="0.8"
                  fill="none"
                />
              </svg>
            </div>
            <div
              className="absolute animate-fly-left"
              style={{
                top: "40%",
                left: "5%",
                animationDelay: "0.4s",
                willChange: "transform",
              }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect
                  width="14"
                  height="10"
                  rx="2"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,0 L7,5 L14,0"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                  fill="none"
                />
              </svg>
            </div>
            <div
              className="absolute animate-fly-right"
              style={{
                top: "50%",
                right: "20%",
                animationDelay: "0.8s",
                willChange: "transform",
              }}
            >
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <rect
                  width="12"
                  height="9"
                  rx="2"
                  fill="rgba(255,255,255,0.10)"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,0 L6,4.5 L12,0"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.8"
                  fill="none"
                />
              </svg>
            </div>
          </>
        )}

        {/* State 3: Checkmarks + $ floating up */}
        {currentState === 3 && (
          <>
            <div
              className="absolute animate-float-bob font-bold"
              style={{
                top: "8%",
                left: "15%",
                fontSize: "14px",
                color: "rgba(255,255,255,0.30)",
                willChange: "transform",
              }}
            >
              ✓
            </div>
            <div
              className="absolute animate-float-bob font-bold"
              style={{
                top: "12%",
                right: "18%",
                fontSize: "16px",
                color: "rgba(255,255,255,0.25)",
                animationDelay: "0.5s",
                willChange: "transform",
              }}
            >
              $
            </div>
            <div
              className="absolute animate-float-bob font-bold"
              style={{
                top: "5%",
                right: "35%",
                fontSize: "12px",
                color: "rgba(255,255,255,0.20)",
                animationDelay: "1s",
                willChange: "transform",
              }}
            >
              ✓
            </div>
            <div
              className="absolute animate-float-bob font-bold"
              style={{
                top: "15%",
                left: "40%",
                fontSize: "13px",
                color: "rgba(255,255,255,0.22)",
                animationDelay: "0.3s",
                willChange: "transform",
              }}
            >
              $
            </div>
            {/* Confetti rectangles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti-fall"
                style={{
                  top: "-5%",
                  left: `${12 + i * 10}%`,
                  width: 4 + (i % 3),
                  height: 8 + (i % 4),
                  backgroundColor: `rgba(255,255,255,${0.1 + (i % 3) * 0.05})`,
                  borderRadius: 1,
                  animationDelay: `${i * 0.2}s`,
                  willChange: "transform",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* ── Main Character Images ─────────────────────────────────── */}
      <div className="relative w-[200px] h-[270px] md:w-[280px] md:h-[380px] flex items-center justify-center">
        {/* Glow */}
        <motion.div 
          className="absolute rounded-full bg-white/10 blur-[80px]"
          style={{ width: "80%", height: "80%", opacity: glowOpacity }}
        />
        
        {/* Images stacked with AnimatePresence for smooth crossfade */}
        <AnimatePresence>
          <motion.img
            key={currentState}
            src={`/anime_states/state_${currentState + 1}.png`}
            alt="PitchSnap Freelancer Mascot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
