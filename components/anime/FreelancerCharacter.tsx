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
        {/* Glow */}
        <motion.circle cx={140} cy={220} r={130} fill="rgba(255,255,255,0.06)" style={{ opacity: glowOpacity }} />

        {/* ── Arms (Behind body) ── */}
        <g>
          {currentState === 0 && (
            <>
              {/* Drooping arms */}
              <path d="M85,180 Q65,230 75,270" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M195,180 Q215,230 205,270" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <circle cx={75} cy={275} r={8} fill="#F2EBE9" />
              <circle cx={205} cy={275} r={8} fill="#F2EBE9" />
            </>
          )}
          {currentState === 1 && (
            <>
              {/* Pointing/Raised */}
              <path d="M85,180 Q65,230 75,270" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M195,180 Q225,200 240,180" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <circle cx={75} cy={275} r={8} fill="#F2EBE9" />
              <circle cx={242} cy={178} r={8} fill="#F2EBE9" />
            </>
          )}
          {currentState === 2 && (
            <>
              {/* Typing */}
              <path d="M85,190 Q65,220 95,255" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M195,190 Q215,220 185,255" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <circle cx={98} cy={258} r={8} fill="#F2EBE9" />
              <circle cx={182} cy={258} r={8} fill="#F2EBE9" />
            </>
          )}
          {currentState === 3 && (
            <>
              {/* Victory V */}
              <path d="M85,190 Q65,150 55,110" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <path d="M195,190 Q215,150 225,110" stroke="#666666" strokeWidth={16} strokeLinecap="round" fill="none" />
              <circle cx={53} cy={105} r={8} fill="#F2EBE9" />
              <circle cx={227} cy={105} r={8} fill="#F2EBE9" />
            </>
          )}
        </g>

        {/* ── Body: Hoodie ── */}
        {/* Legs / Lower body */}
        <path d="M110,290 L120,340 L135,340 L135,290 Z" fill="#333333" />
        <path d="M170,290 L160,340 L145,340 L145,290 Z" fill="#333333" />
        {/* Shoes */}
        <path d="M105,340 Q120,335 140,340 Q130,350 110,350 Z" fill="#0A0A0A" />
        <path d="M175,340 Q160,335 140,340 Q150,350 170,350 Z" fill="#0A0A0A" />

        {/* Torso */}
        <path d="M90,190 C90,190 80,300 100,300 L180,300 C200,300 190,190 190,190 Z" fill="#666666" />
        {/* Hoodie shadows/folds */}
        <path d="M140,190 L140,300" stroke="#555555" strokeWidth={1.5} />
        {/* Hoodie Pocket */}
        <path d="M110,250 C110,250 105,280 120,290 L160,290 C175,280 170,250 170,250 L110,250 Z" fill="#555555" />
        {/* Back of Hood */}
        <path d="M110,165 Q140,190 170,165 Q185,190 140,205 Q95,190 110,165 Z" fill="#555555" />
        {/* Drawstrings */}
        <path d="M125,185 Q120,210 125,230" stroke="#444444" strokeWidth={3} strokeLinecap="round" fill="none" />
        <path d="M155,185 Q160,210 155,230" stroke="#444444" strokeWidth={3} strokeLinecap="round" fill="none" />

        {/* ── Head / Anime Face ── */}
        <g
          style={{
            transform: `rotate(${headTilt}deg)`,
            transformOrigin: "140px 130px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Neck */}
          <rect x={132} y={150} width={16} height={20} rx={4} fill="#E5DCDA" />
          {/* Face */}
          <path d="M92,105 C92,155 110,168 140,168 C170,168 188,155 188,105 C188,75 168,65 140,65 C112,65 92,75 92,105 Z" fill="#F2EBE9" />

          {/* Hair (Anime Style Spikes) */}
          <g fill="#2A2D34">
            {/* Base hair bulk */}
            <circle cx={140} cy={95} r={54} />
            {/* Left spikes */}
            <path d="M85,100 Q70,95 65,115 Q75,120 85,110 Z" />
            <path d="M86,80 Q70,70 65,85 Q75,90 85,90 Z" />
            {/* Right spikes */}
            <path d="M195,100 Q210,95 215,115 Q205,120 195,110 Z" />
            <path d="M194,80 Q210,70 215,85 Q205,90 195,90 Z" />
            {/* Top Cowlick */}
            <path d="M135,45 Q150,20 160,45 Q150,30 145,45 Z" />
            {/* Front bangs crossing forehead */}
            <path d="M95,65 Q115,70 110,105 Q125,85 130,65 Z" />
            <path d="M130,60 Q145,50 160,95 Q165,75 165,65 Z" />
            <path d="M165,65 Q180,75 185,105 Q190,85 185,75 Z" />
            <path d="M135,65 Q145,85 140,105 Q155,85 155,65 Z" />
          </g>

          {/* Eyes & Mouth container */}
          <g>
            {currentState === 0 && (
              /* State 0: Stressed (Drooping eyes) */
              <>
                <ellipse cx={116} cy={125} rx={14} ry={10} fill="white" />
                <ellipse cx={164} cy={125} rx={14} ry={10} fill="white" />
                <ellipse cx={116} cy={125} rx={9} ry={7} fill="#111111" />
                <ellipse cx={164} cy={125} rx={9} ry={7} fill="#111111" />
                {/* Heavy Eyelids cutting off the top */}
                <path d="M100,110 L132,125 L132,110 Z" fill="#F2EBE9" />
                <path d="M180,110 L148,125 L148,110 Z" fill="#F2EBE9" />
                {/* Sweat Drop */}
                <path d="M175,135 Q180,145 175,150 Q170,145 175,135 Z" fill="#A8DADC" opacity={0.8} />
                {/* Frown */}
                <path d="M130,152 Q140,146 150,152" stroke="#2A2D34" strokeWidth={2.5} strokeLinecap="round" fill="none" />
              </>
            )}

            {currentState === 1 && (
              /* State 1: Discovering (Wide eyes + highlights) */
              <>
                <ellipse cx={116} cy={125} rx={16} ry={18} fill="white" />
                <ellipse cx={164} cy={125} rx={16} ry={18} fill="white" />
                {/* Dark Iris */}
                <ellipse cx={116} cy={125} rx={12} ry={14} fill="#111111" />
                <ellipse cx={164} cy={125} rx={12} ry={14} fill="#111111" />
                {/* Highlights */}
                <circle cx={110} cy={118} r={5} fill="white" />
                <circle cx={122} cy={133} r={2.5} fill="white" />
                <circle cx={158} cy={118} r={5} fill="white" />
                <circle cx={170} cy={133} r={2.5} fill="white" />
                {/* Small O Mouth */}
                <circle cx={140} cy={152} r={4} fill="#111111" />
              </>
            )}

            {currentState === 2 && (
              /* State 2: Energized (Determined Squint/Smirk) */
              <>
                {/* Squint paths */}
                <path d="M102,123 Q116,113 130,123" stroke="#111111" strokeWidth={3} strokeLinecap="round" fill="none" />
                <path d="M178,123 Q164,113 150,123" stroke="#111111" strokeWidth={3} strokeLinecap="round" fill="none" />
                {/* Smirk */}
                <path d="M132,150 Q142,155 150,145" stroke="#111111" strokeWidth={2.5} strokeLinecap="round" fill="none" />
              </>
            )}

            {currentState === 3 && (
              /* State 3: Winning (Star eyes & Big Smile) */
              <>
                {/* Star shape for eyes */}
                <path d={starPath(116, 125, 12)} fill="#111111" />
                <path d={starPath(164, 125, 12)} fill="#111111" />
                <path d={starPath(116, 125, 5)} fill="white" />
                <path d={starPath(164, 125, 5)} fill="white" />
                {/* Big happy mouth */}
                <path d="M125,145 Q140,145 155,145 C155,160 140,165 125,145 Z" fill="#111111" stroke="#111" strokeWidth={1.5} strokeLinejoin="round" />
              </>
            )}
          </g>
        </g>

        {/* ── Laptop (Appears in states 1, 2, 3) ── */}
        {currentState >= 1 && (
          <g>
            {/* Laptop base */}
            <rect x={170} y={255} width={65} height={5} rx={2} fill="#222222" />
            <path d="M165,260 L240,260 L235,265 L170,265 Z" fill="#111111" />
            {/* Screen */}
            <rect x={175} y={215} width={55} height={40} rx={3} fill="#1A1A1A" stroke="#333333" strokeWidth={1} />
            {/* Screen content */}
            <rect x={180} y={220} width={45} height={30} rx={1} fill="#0C0C0C" />
            {/* PS text on screen for states 2 + 3 */}
            {currentState >= 2 && (
              <text x={202} y={240} fill="rgba(255,255,255,0.7)" fontSize={12} fontWeight={700} textAnchor="middle" fontFamily="system-ui">
                PS
              </text>
            )}
            {/* Screen glow for state 2+ */}
            {currentState >= 2 && (
              <rect x={180} y={220} width={45} height={30} rx={1} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            )}
          </g>
        )}
      </svg>
    </motion.div>
  );
}
