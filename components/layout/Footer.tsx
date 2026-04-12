"use client"

import Link from "next/link"
import Container from "./Container"

const FOOTER_LINKS = {
  Infrastructure: [
    { label: "Features",     href: "#features"  },
    { label: "How It Works", href: "#howitworks" },
    { label: "Pricing",      href: "#pricing"   },
    { label: "GitHub",       href: "https://github.com/Zakuroooo/PitchSnap" },
  ],
  Entity: [
    { label: "Contact",      href: "mailto:hello@pitchsnap.me" },
  ],
} as const

const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/Zakuroooo/PitchSnap" },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0c0c0c] text-white pt-12 pb-6 overflow-hidden border-t-2 border-[#111111]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="inline-block text-2xl font-black tracking-tighter uppercase mb-3"
                aria-label="PitchSnap home"
              >
                PITCHSNAP.
              </Link>
              <p className="text-[#A1A1A1] text-sm max-w-sm leading-relaxed">
                The authoritative engine for creating uncompromising freelance proposals.
              </p>
            </div>
            
            <div className="flex gap-8 mt-6 md:mt-0">
               {SOCIAL_LINKS.map(({ label, href }) => (
                 <a 
                   key={label}
                   href={href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-xs font-bold tracking-[0.2em] uppercase text-[#5e5e5e] hover:text-white transition-colors"
                 >
                   {label}
                 </a>
               ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
            {(
              Object.entries(FOOTER_LINKS) as [
                string,
                readonly { label: string; href: string }[],
              ][]
            ).map(([section, links]) => (
              <div key={section} className="flex flex-col">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#474747] mb-4 pb-3 border-b-2 border-[#161616]">
                   {section}
                 </h3>
                 <ul className="flex flex-col gap-3">
                   {links.map((link) => (
                     <li key={link.href}>
                       <Link
                         href={link.href}
                         className="text-sm font-medium text-[#A1A1A1] hover:text-white transition-colors"
                       >
                         {link.label}
                       </Link>
                     </li>
                   ))}
                 </ul>
               </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t-2 border-[#111111]">
          <p className="text-[#474747] text-xs font-bold tracking-widest uppercase mb-3 md:mb-0">
            © {currentYear} PITCHSNAP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4 items-center">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-[#474747] text-xs font-bold tracking-widest uppercase">
              SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>

      </Container>
    </footer>
  )
}
