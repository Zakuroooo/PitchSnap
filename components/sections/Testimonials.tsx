"use client"
import React, { useRef } from "react"
import { Star } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Container from "../layout/Container"

const TESTIMONIALS_ROW_1 = [
  {
    name: "Sarah Jenkins",
    handle: "Creative Director",
    text: "PitchSnap single-handedly increased my close rate by 40%. The proposals are so structurally sound it looks like I spent weeks on them.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    handle: "Lead Engineer",
    text: "I used to hate the blank page anxiety when sending cold emails. Now I just drop in the requirements and get an untouchable pitch instantly.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    handle: "Agency Owner",
    text: "The ROI on this platform is absurd. Won a $12k enterprise build from a proposal I generated on my phone while in transit.",
    rating: 5,
  },
  {
    name: "James Thorne",
    handle: "Brand Strategist",
    text: "I was skeptical of AI generation. But PitchSnap understands persuasive architecture perfectly. It's the silent partner I needed.",
    rating: 5,
  },
]

const TESTIMONIALS_ROW_2 = [
  {
    name: "Alex Rivera",
    handle: "UX Architect",
    text: "Stop wasting time writing proposals from scratch. The Monolith aesthetic generated here paid for itself in the first 2 hours.",
    rating: 5,
  },
  {
    name: "David Kim",
    handle: "Growth Consultant",
    text: "Every operator needs this. It creates consistent, high-converting messaging without depending on my mood or energy levels.",
    rating: 5,
  },
  {
    name: "Chloe Evans",
    handle: "Product Marketer",
    text: "Absolutely uncompromising quality. The way it pulls authority from just a few bullet points is genuinely staggering. 10/10.",
    rating: 5,
  },
  {
    name: "Michael Chang",
    handle: "Full-Stack Dev",
    text: "Landed 3 retainers this month using PitchSnap's core logic. The authoritative tone it commands is unmatched by anything else.",
    rating: 5,
  },
]

const TESTIMONIALS_ROW_1_EXTENDED = [...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1]
const TESTIMONIALS_ROW_2_EXTENDED = [...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2]

function TestimonialCard({ item }: { item: typeof TESTIMONIALS_ROW_1[0] }) {
  return (
    <div className="w-[350px] md:w-[420px] min-w-[350px] md:min-w-[420px] mx-3 flex-shrink-0 flex h-auto">
      <div className="w-full flex-1 p-8 md:p-10 bg-[#111111] hover:bg-[#161616] transition-colors flex flex-col justify-between">
        <div className="flex items-center gap-1 mb-8">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-white" />
          ))}
        </div>
        
        <p className="text-[#A1A1A1] text-lg leading-relaxed mb-10 font-medium">
          "{item.text}"
        </p>
        
        <div className="mt-auto">
          <h4 className="text-base font-bold text-white mb-1 uppercase tracking-wider">{item.name}</h4>
          <p className="text-xs tracking-widest uppercase font-bold text-[#5e5e5e]">{item.handle}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="relative py-32 w-full bg-[#0c0c0c] overflow-x-clip text-white">
      <Container className="mb-20">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-end">
          <motion.div
             ref={ref}
             initial={{ opacity: 0, x: -30 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
             transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none">
              PROVEN.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1A1] max-w-sm text-lg leading-relaxed md:pb-4"
          >
            Elite operators demanding uncompromising quality. Our index powers the highest-converting portfolios on the market.
          </motion.p>
        </div>
      </Container>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        
        {/* Row 1 - Left to Right */}
        <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
            {TESTIMONIALS_ROW_1_EXTENDED.map((item, i) => (
              <TestimonialCard key={`orig-${i}`} item={item} />
            ))}
            {TESTIMONIALS_ROW_1_EXTENDED.map((item, i) => (
              <TestimonialCard key={`clone-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused] py-2">
            {TESTIMONIALS_ROW_2_EXTENDED.map((item, i) => (
              <TestimonialCard key={`orig-${i}`} item={item} />
            ))}
            {TESTIMONIALS_ROW_2_EXTENDED.map((item, i) => (
              <TestimonialCard key={`clone-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
