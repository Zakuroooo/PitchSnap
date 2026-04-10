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

/* ── Star path for victory eyes (state 4) ──────────────────────── */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.4;
    pts.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return `M${pts.join("L")}Z`;
}

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

  /* ── Color interpolations ────────────────────────────────────── */
  const bodyColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#444444", "#666666", "#999999", "#F5F5F5"]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.04, 0.08]
  );

  const characterScale = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1.0, 1.0, 1.05]
  );

  /* ── Head tilt per state ─────────────────────────────────────── */
  const headTilts = [15, 0, 0, -5];
  const headTilt = headTilts[currentState] ?? 0;

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
            className="relative rounded-xl px-4 py-2.5 text-xs font-medium whitespace-nowrap"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "12px",
            }}
          >
            {SPEECH_BUBBLES[currentState]}
            {/* Triangle tail */}
            <div
              className="absolute -bottom-[6px] left-8"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(255, 255, 255, 0.15)",
              }}
            />
            <div
              className="absolute -bottom-[5px] left-[33px]"
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid rgba(255, 255, 255, 0.08)",
              }}
            />
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

      {/* ── Main SVG Character ─────────────────────────────────── */}
      <svg
        viewBox="0 0 280 380"
        className="w-[200px] h-[270px] md:w-[280px] md:h-[380px]"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated freelancer character"
      >
        {/* Group 1: Background glow circle */}
        <motion.circle
          cx={140}
          cy={220}
          r={130}
          fill="rgba(255,255,255,0.06)"
          style={{ opacity: glowOpacity }}
        />

        {/* Group 7: Arms — behind body */}
        <g>
          {currentState === 0 && (
            /* State 0: Arms hanging limp */
            <>
              <path
                d="M95,200 Q75,240 80,280"
                stroke="#444444"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M185,200 Q205,240 200,280"
                stroke="#444444"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          {currentState === 1 && (
            /* State 1: One arm pointing forward */
            <>
              <path
                d="M95,200 Q75,240 80,275"
                stroke="#666666"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M185,200 Q210,210 230,195"
                stroke="#666666"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          {currentState === 2 && (
            /* State 2: Both arms on keyboard */
            <>
              <path
                d="M95,210 Q70,240 90,265"
                stroke="#999999"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M185,210 Q210,240 190,265"
                stroke="#999999"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          {currentState === 3 && (
            /* State 3: Victory V pose — arms raised */
            <>
              <path
                d="M95,200 Q60,160 50,110"
                stroke="#F5F5F5"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M185,200 Q220,160 230,110"
                stroke="#F5F5F5"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
        </g>

        {/* Group 2: Body/torso */}
        <motion.rect
          x={95}
          y={180}
          width={90}
          height={110}
          rx={12}
          style={{ fill: bodyColor }}
        />
        {/* Collar detail */}
        <motion.path
          d="M115,180 L140,200 L165,180"
          style={{ stroke: bodyColor }}
          strokeWidth={2}
          fill="none"
          opacity={0.3}
        />

        {/* Legs */}
        <motion.rect x={108} y={290} width={22} height={45} rx={6} style={{ fill: bodyColor }} />
        <motion.rect x={150} y={290} width={22} height={45} rx={6} style={{ fill: bodyColor }} />

        {/* Shoes */}
        <rect x={105} y={330} width={28} height={10} rx={5} fill="#1A1A1A" />
        <rect x={147} y={330} width={28} height={10} rx={5} fill="#1A1A1A" />

        {/* Group 3: Head */}
        <g
          style={{
            transform: `rotate(${headTilt}deg)`,
            transformOrigin: "140px 130px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <motion.circle cx={140} cy={130} r={55} style={{ fill: bodyColor }} />

          {/* Group 4: Hair — always dark */}
          <path
            d="M85,120 Q90,60 140,55 Q190,60 195,120 L190,110 Q185,75 140,68 Q95,75 90,110 Z"
            fill="#1A1A1A"
          />
          {/* Spiky hair bits */}
          <path d="M100,85 L95,55 L115,78" fill="#1A1A1A" />
          <path d="M125,72 L130,42 L145,68" fill="#1A1A1A" />
          <path d="M155,72 L165,45 L175,78" fill="#1A1A1A" />
          <path d="M180,85 L190,58 L185,82" fill="#1A1A1A" />

          {/* Group 5: Eyes */}
          {currentState === 0 && (
            /* Droopy/sad ellipses */
            <>
              <ellipse cx={118} cy={127} rx={10} ry={6} fill="#1A1A1A" />
              <ellipse cx={162} cy={127} rx={10} ry={6} fill="#1A1A1A" />
              {/* Heavy eyelids */}
              <rect x={106} y={118} width={24} height={6} rx={3} fill="#1A1A1A" opacity={0.5} />
              <rect x={150} y={118} width={24} height={6} rx={3} fill="#1A1A1A" opacity={0.5} />
            </>
          )}
          {currentState === 1 && (
            /* Wide circles (surprised) with shine */
            <>
              <circle cx={118} cy={125} r={12} fill="#1A1A1A" />
              <circle cx={162} cy={125} r={12} fill="#1A1A1A" />
              {/* White of eyes */}
              <circle cx={118} cy={125} r={10} fill="white" />
              <circle cx={162} cy={125} r={10} fill="white" />
              {/* Pupils */}
              <circle cx={120} cy={124} r={5} fill="#1A1A1A" />
              <circle cx={164} cy={124} r={5} fill="#1A1A1A" />
              {/* Shine dots */}
              <circle cx={122} cy={121} r={2} fill="white" />
              <circle cx={166} cy={121} r={2} fill="white" />
            </>
          )}
          {currentState === 2 && (
            /* Determined half-squint */
            <>
              <rect x={108} y={120} width={20} height={10} rx={5} fill="#1A1A1A" />
              <rect x={152} y={120} width={20} height={10} rx={5} fill="#1A1A1A" />
              {/* Small glint lines */}
              <line x1={105} y1={125} x2={100} y2={123} stroke="#1A1A1A" strokeWidth={1.5} />
              <line x1={175} y1={125} x2={180} y2={123} stroke="#1A1A1A" strokeWidth={1.5} />
            </>
          )}
          {currentState === 3 && (
            /* Star eyes (victory) */
            <>
              <path d={starPath(118, 125, 12)} fill="#1A1A1A" />
              <path d={starPath(162, 125, 12)} fill="#1A1A1A" />
              {/* White star centers */}
              <path d={starPath(118, 125, 7)} fill="white" />
              <path d={starPath(162, 125, 7)} fill="white" />
            </>
          )}

          {/* Group 6: Mouth */}
          {currentState === 0 && (
            /* Frown */
            <path
              d="M120,150 Q140,142 160,150"
              stroke="#1A1A1A"
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
            />
          )}
          {currentState === 1 && (
            /* Surprised O */
            <circle cx={140} cy={150} r={8} fill="#1A1A1A" />
          )}
          {currentState === 2 && (
            /* Confident smirk */
            <path
              d="M125,147 Q140,155 155,147"
              stroke="#1A1A1A"
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
            />
          )}
          {currentState === 3 && (
            /* Big open smile */
            <>
              <path
                d="M115,145 Q140,168 165,145"
                stroke="#1A1A1A"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M120,147 Q140,165 160,147"
                fill="#1A1A1A"
                opacity={0.3}
              />
            </>
          )}
        </g>

        {/* Group 8: Laptop (visible in states 1, 2, 3) */}
        {currentState >= 1 && (
          <g>
            {/* Laptop base */}
            <rect x={170} y={255} width={65} height={5} rx={2} fill="#333333" />
            {/* Screen */}
            <rect x={175} y={215} width={55} height={40} rx={3} fill="#222222" stroke="#444444" strokeWidth={1} />
            {/* Screen content */}
            <rect x={180} y={220} width={45} height={30} rx={1} fill="#111111" />
            {/* PS text on screen for states 2 + 3 */}
            {currentState >= 2 && (
              <text
                x={202}
                y={240}
                fill="rgba(255,255,255,0.5)"
                fontSize={12}
                fontWeight={700}
                textAnchor="middle"
                fontFamily="system-ui"
              >
                PS
              </text>
            )}
            {/* Screen glow for state 2+ */}
            {currentState >= 2 && (
              <rect
                x={180}
                y={220}
                width={45}
                height={30}
                rx={1}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
              />
            )}
          </g>
        )}
      </svg>
    </motion.div>
  );
}
