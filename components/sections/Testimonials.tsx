import React from "react"
import { Star } from "lucide-react"
import Container from "../layout/Container"
import { AnimatedHeading } from "../ui/animated-heading"
import { GlowCard } from "../ui/glow-card"

const TESTIMONIALS_ROW_1 = [
  {
    name: "Sarah Jenkins",
    handle: "@sarahjdesigns",
    text: "PitchSnap single-handedly increased my close rate by 40%. The proposals are so detailed it looks like I spent hours on them.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarahj",
  },
  {
    name: "Marcus Chen",
    handle: "@marcusdev",
    text: "I used to hate the blank page anxiety when sending cold emails. Now I just drop in the requirements and get a 10/10 pitch in 10 seconds.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Rodriguez",
    handle: "@elenacodes",
    text: "The ROI on this tool is absurd. Won a $12k Webflow build from a proposal I generated on my phone while waiting for coffee.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    name: "James Thorne",
    handle: "@james_copy",
    text: "As a copywriter, I was skeptical. But the AI understands persuasive structure perfectly. It's my secret weapon now.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=james",
  },
]

const TESTIMONIALS_ROW_2 = [
  {
    name: "Alex Rivera",
    handle: "@arivera_ui",
    text: "Stop wasting time writing proposals from scratch. PitchSnap paid for itself in the first 2 hours of using it.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "David Kim",
    handle: "@davidk_growth",
    text: "Every agency owner needs this. It creates consistent, high-converting messaging without depending on my mood or energy levels.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Chloe Evans",
    handle: "@chloe_social",
    text: "Absolutely mind-blowing. The way it pulls context from just a few bullet points is pure magic. 10/10.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=chloe",
  },
  {
    name: "Michael Chang",
    handle: "@mikechang_dev",
    text: "I landed 3 retainers this month using PitchSnap's exact templates. The professional tone it generates is unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
]

const TESTIMONIALS_ROW_1_EXTENDED = [...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_2]
const TESTIMONIALS_ROW_2_EXTENDED = [...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_1]

function TestimonialCard({ item }: { item: typeof TESTIMONIALS_ROW_1[0] }) {
  return (
    <div className="min-w-[350px] mx-3 flex-shrink-0 flex">
      <GlowCard enableTilt={false} className="w-full flex-1 p-6 flex flex-col justify-between">
        <div className="flex items-center gap-1 mb-4 text-[var(--violet)]">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        
        <p className="text-[var(--text-secondary)] text-[15px] sm:text-base leading-relaxed mb-6 font-medium">
          "{item.text}"
        </p>
        
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.05]">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 ring-2 ring-white/5">
            <img 
              src={item.avatar} 
              alt={item.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{item.name}</h4>
            <p className="text-xs text-[var(--text-tertiary)]">{item.handle}</p>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 w-full bg-[#0A0A0A] overflow-hidden flex flex-col items-center">
      <Container className="mb-16 md:mb-20 text-center">
        <AnimatedHeading text="Freelancers are closing" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white justify-center" />
        <AnimatedHeading text="more deals than ever." gradient className="text-3xl sm:text-4xl md:text-5xl font-serif italic justify-center drop-shadow-lg" />
        <p className="mt-6 text-[var(--text-secondary)] max-w-xl mx-auto text-sm sm:text-base">
          Join the thousands of freelancers using PitchSnap to automate their outreach
          and win back their time.
        </p>
      </Container>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 sm:gap-8">
        
        {/* Row 1 - Left to Right */}
        <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
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
          <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused]">
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
