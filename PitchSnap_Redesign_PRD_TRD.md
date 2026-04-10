PITCHSNAP Complete Redesign — PRD + TRD + Implementation Plan
 
 v2.0 | Landio-Inspired | Anime Character | Scroll-Driven
 
DOCUMENT
DETAILS
Project
PitchSnap Landing Page Complete Redesign
Reference Design
pitchsnapp.framer.website (Landio Template)
Character Feature
Scroll-driven anime freelancer (4 states)
Tech Stack
Next.js 14, TypeScript, Tailwind, Framer Motion
Performance Target
Zero lag, zero jitter on 8GB RAM Mac M2
Tools Used
Antigravity + GSD + Ralph Loop + CodeRabbit + Stitch + n8n
Phase
Landing Page Redesign Only (Auth/Dashboard untouched)
This document is the single source of truth for the redesign.
Antigravity must read this completely before writing any code.
1. EXACT COLOR SYSTEM (FROM REFERENCESITE)Analyzed from pitchsnapp.framer.website (Landio template). These are non-negotiable.
TOKEN
HEX VALUE
USAGE RULE
--color-bg
#0C0C0C
Page background — all sections default
--color-surface
#141414
Cards, alternate sections, sidebar
--color-surface-2
#1A1A1A
Nested cards, hover states
--color-border
rgba(255,255,255,0.07)
All borders — very subtle
--color-border-hover
rgba(255,255,255,0.14)
Hover border state
--color-text-primary
#F5F5F5
All headings and primary text
--color-text-secondary
#888888
Subtext, labels, captions
--color-text-muted
#555555
Placeholder, disabled text
--color-accent
#B8FF57
LIME GREEN — use sparingly (max 3-4x per page)
--color-accent-dim
rgba(184,255,87,0.12)
Accent backgrounds, badge fills
--color-accent-border
rgba(184,255,87,0.25)
Accent borders on badges/pills
--color-white
#FFFFFF
Logo, nav text on dark
ANTI-PATTERNS (never use these):
WHAT TO AVOID
WHY
Blue/violet/purple gradients (#915EFF etc)
Screams AI-generated, generic SaaS look
Lime green on every element
Accent loses meaning — use on CTA + 2-3 highlights max
Multiple accent colors mixed together
Visual chaos — one accent only
Heavy glassmorphism everywhere
Framer template uses clean flat surfaces
Neon glows and heavy shadows
Reference site uses minimal, clean shadows only
Background canvas particles
Causes lag on 8GB RAM — absolutely forbidden
Custom cursor
Causes jitter — absolutely forbidden
SVG feTurbulence noise filter
CPU expensive — absolutely forbidden
2. TYPOGRAPHY SYSTEMELEMENT
FONT
SIZE
WEIGHT
COLOR
LINE HEIGHT
Display headline
Inter
72-80px
700
--color-text-primary
1.1
Section heading
Inter
40-48px
600
--color-text-primary
1.2
Sub-heading
Inter
24-32px
600
--color-text-primary
1.3
Body text
Inter
16-18px
400
--color-text-secondary
1.7
Caption/label
Inter
11-13px
500
--color-text-secondary
1.4
Section badge
Inter
11px
600
--color-accent
1.0
Button text
Inter
14-15px
500
varies
1.0
Code snippet
JetBrains Mono
13px
400
--color-accent
1.5
Section Badge Style (like Landio 'BENEFITS', 'SERVICES'):
Small ALL CAPS label above every section heading. Style:
font-size: 11px | letter-spacing: 0.12em | color: --color-accent | font-weight: 600
3. PRODUCT REQUIREMENTS DOCUMENT (PRD)
3.1 Project Goal
Complete redesign of PitchSnap landing page to match the Landio Framer template aesthetic — minimal, dark, editorial,
premium agency feel. The redesign must include a unique scroll-driven anime character that transforms through 4 states,
making the product memorable and human. Auth system and dashboard are untouched.
3.2 Success Criteria
-> Teacher/reviewer cannot tell it was AI generated
-> Colors exactly match reference site palette
-> Page runs at 60fps with zero jitter on M2 Mac 8GB RAM
-> Anime character smoothly transitions through 4 states on scroll
-> Every section matches Landio spacing and editorial feel
-> Mobile responsive at 375px, 768px, 1024px, 1440px
-> npm run build passes with zero errors
-> Full page scroll takes under 3 seconds to load
3.3 Section Map
#
SECTION
BG COLOR
KEY COMPONENTS
UNIQUE ELEMENT
1
Navbar
#0C0C0C
Logo, nav links, CTA pill
Blur on scroll, lime CTA
2
Hero
#0C0C0C
Headline, CTAs, social proof
ANIME CHARACTER right side
3
Logo Marquee
#0C0C0C
Infinite scroll strip
Platform logos scrolling
4
Benefits
#141414
3 feature cards
Wobble card hover, animated icons
5
Your Journey
#0C0C0C
4-state character timeline
Character evolution story
6
How It Works
#141414
3-step numbered flow
Drawing connector line
7
Features Bento
#0C0C0C
2 large + 4 small cards
Live content previews inside
8
Success Numbers
#141414
3 animated counters
Count-up on scroll enter
9
Testimonials
#0C0C0C
Dual-row infinite marquee
Opposite scroll directions
10
Pricing
#141414
3 tier cards + toggle
Lime Popular badge
11
FAQ
#0C0C0C
Accordion expand/collapse
shadcn Accordion
12
Final CTA
#141414
Big headline + button
Background Beams (subtle)
13
Footer
#0C0C0C
4 columns, social icons
Clean minimal
4. ANIME CHARACTER — COMPLETESPECIFICATIONThis is the most important and unique feature. Must be implemented exactly as specified.
4.1 Character Overview
File: components/anime/FreelancerCharacter.tsx
PROPERTY
VALUE
Character type
Anime-style cartoon freelancer (gender-neutral)
Implementation
Pure SVG — no images, no canvas, no external assets
Animation engine
Framer Motion useScroll + useTransform + animate
Size
280px wide x 380px tall (desktop), 200px x 270px (mobile)
Scroll source
Single useScroll from hero section ref — NOT window scroll
Performance
GPU-accelerated transforms only — no layout thrashing
States
4 distinct poses (SVG path morphing between them)
Color system
Character colors interpolate with scroll progress
4.2 Character Design (SVG Structure)
Build the character using these SVG elements:
PART
SVG ELEMENT
DESCRIPTION
Head
circle + rect
Large round head (anime proportions: head 40% of body)
Eyes
ellipses
Big expressive eyes — change per state (normal/wide/sparkle/star)
Mouth
path
Simple curve — changes per state (frown/neutral/smile/big smile)
Hair
path
Simple spiky anime hair, dark color
Body/torso
rect + path
Simple rectangular body with collar
Arms
path
Simple stick arms — position changes per state
Legs
rect x2
Simple legs — position changes per state
Laptop
rect group
Small laptop prop — appears in states 2, 3, 4
Speech bubble
rect + path + text
Rounded rect with tail — changes per state
Floating elements
multiple paths
Papers (state 1), emails (state 3), money (state 4)
Glow ring
circle (opacity)
Soft glow behind character — color from gray to lime
4.3 Four States — Exact Specifications
STATE 1: STRESSED (scroll 0% - 25%)
 Head: tilted down 15deg, looking at ground
 Eyes: droopy/sad (flat bottom ellipse)
 Mouth: downward curve frown
 Arms: hanging down, shoulders slumped
 Posture: body tilted forward (slouch)
 Color: body fill #444444 (gray), no glow
 Floating: 3 paper shapes flying chaotically around head
 Papers: slight random rotation animation (CSS, not JS)
 Speech bubble: 'Writing proposals for hours...'
 Sweat drop: single animated drop on forehead
 Background glow: none
STATE 2: DISCOVERING (scroll 25% - 50%)
 Head: lifted up, facing forward
 Eyes: wide open circles (anime surprise)
 Mouth: small 'O' shape (surprised)
 Arms: one arm pointing at laptop
 Posture: leaning forward curiously
 Color: body fill transitions to #888888 (lighter gray)
 Laptop: appears on the side showing PitchSnap logo
 Speech bubble: 'Wait... 10 seconds?!'
 Question mark: small ? floating above head, slight bob
 Background glow: very subtle yellow rgba(255,220,0,0.06)
STATE 3: ENERGIZED (scroll 50% - 75%)
 Head: straight up, confident
 Eyes: determined half-squint (anime focus)
 Mouth: confident smirk
 Arms: both on laptop keyboard, typing pose
 Posture: straight, engaged, leaning slightly forward
 Color: body fill transitions to rgba(184,255,87,0.6) tint
 Laptop: screen glowing lime green
 Floating: 3 small envelope shapes flying outward
 Envelopes: CSS animation flying away from laptop
 Speech bubble: 'Proposals sent!'
 Lightning bolts: small CSS shapes near hands
 Background glow: rgba(184,255,87,0.08) soft circle
STATE 4: WINNING (scroll 75% - 100%)
 Head: tilted back slightly, triumphant
 Eyes: star-shaped (anime victory — 4-pointed stars)
 Mouth: huge open smile
 Arms: both raised up in victory V pose
 Posture: standing tall, expanded
 Color: body fill #B8FF57 (full lime green)
 Floating: checkmarks + small $ symbols floating up
 Confetti: 8 small colored rectangles, CSS animation falling
 Speech bubble: 'Client said YES!'
 Background glow: rgba(184,255,87,0.15) large soft circle
 Scale: character scales to 1.05 (slightly bigger = success)
4.4 Transition Implementation
PROPERTY
IMPLEMENTATION
Scroll source
useScroll({ target: heroRef, offset: ['start start', 'end end'] })
State detection
useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4])
Color interpolation
useTransform(scrollYProgress, [0,0.5,1], ['#444','#888','#B8FF57'])
Glow opacity
useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0.15])
Scale
useTransform(scrollYProgress, [0, 0.75, 1], [1.0, 1.0, 1.05])
Speech bubble
Framer Motion animate with key prop — fades out/in on state change
Floating elements
CSS @keyframes — NOT Framer Motion (performance)
Easing
spring({ stiffness: 200, damping: 30 }) for body transforms
Transition duration
0.6s for pose changes — smooth not instant
5. TECHNICAL REQUIREMENTS DOCUMENT (TRD)
5.1 Performance Constraints (8GB RAM M2 Mac)
RULE
REASON
ENFORCEMENT
NO canvas with requestAnimationFrame loops
Destroys performance
Code review will reject
NO custom cursor tracking
Causes mouse jitter
Code review will reject
NO SVG feTurbulence filter
CPU expensive
Code review will reject
NO rotateX/rotateY on scroll
Expensive repaints
Code review will reject
ALL whileInView must have once:true
Prevents re-triggering
TypeScript lint rule
Max 2 Framer Motion effects per section
Memory budget
Manual review
CSS @keyframes for marquee/floats
GPU accelerated
Required pattern
Framer Motion only for: character + entries
Targeted usage
Required pattern
No more than 10 animated elements visible simultaneously
Frame budget
Manual review
Lenis smooth scroll: lerp 0.08, duration 1.0
Tuned for 8GB
Exact config
5.2 Animation Architecture
ANIMATION TYPE
TOOL
PATTERN
Section entry (all sections)
Framer Motion
opacity: 0→1, y: 40→0, once:true, duration: 0.5
Stagger children
Framer Motion
staggerChildren: 0.08, delayChildren: 0.1
Anime character states
Framer Motion
useScroll + useTransform + spring physics
Infinite marquee (logos + testimonials)
CSS @keyframes
@keyframes marquee { 0%{} 100%{translateX(-50%)} }
Counter animation
Framer Motion
useInView + animate from 0 to target, duration: 2s
Connector line drawing
Framer Motion
pathLength: 0→1 on whileInView, once:true
Card hover effects
CSS
transform: translateY(-4px), transition: 150ms ease
Button hover
CSS
opacity + scale(1.02), 150ms ease
Scroll progress bar
Framer Motion
useScroll + scaleX + transformOrigin: left
Character floating elements
CSS @keyframes
float animation: translateY(-8px), 2s infinite
Confetti (state 4)
CSS @keyframes
8 divs, fall + rotate, CSS only
Smooth scroll
Lenis
lerp: 0.08, duration: 1.0, easing: easeInOutCubic
5.3 File Structure
FILE PATH
PURPOSE
app/page.tsx
Landing page — imports all sections in order
app/globals.css
CSS variables (ALL colors) + keyframes + utilities
components/layout/Navbar.tsx
Fixed navbar with scroll blur
components/layout/Footer.tsx
4-column footer
components/anime/FreelancerCharacter.tsx
THE anime SVG character — 4 states
components/sections/Hero.tsx
Hero with character + headline + CTAs
components/sections/LogoMarquee.tsx
Platform logos infinite scroll
components/sections/Benefits.tsx
3 wobble cards
components/sections/YourJourney.tsx
4-state character timeline
components/sections/HowItWorks.tsx
3-step process
components/sections/Features.tsx
Bento grid
components/sections/SuccessNumbers.tsx
Animated counters
components/sections/Testimonials.tsx
Dual-row marquee
components/sections/Pricing.tsx
3-tier pricing
components/sections/FAQ.tsx
shadcn accordion
components/sections/FinalCTA.tsx
CTA + Background Beams
components/ui/AnimatedCounter.tsx
Reusable count-up component
components/ui/SectionBadge.tsx
Reusable section label (BENEFITS etc)
components/ui/WobbleCard.tsx
Card with wobble hover effect
lib/lenis.ts
Smooth scroll singleton
hooks/useScrollProgress.ts
Shared scroll progress hook
5.4 Stitch MCP Integration
How Stitch works with Antigravity:
Antigravity sends design prompt to Stitch via MCP (already connected)
Stitch generates HTML/Tailwind mockup and returns it
You can see the result at stitch.withgoogle.com under your projects
Antigravity reads the Stitch output as visual reference
Then builds the actual React component matching that design
Use Experimental Mode (Gemini 2.5 Pro) for highest fidelity
Generate one section at a time — not full page at once
Stitch prompt format to use for each section:
Dark SaaS landing page [SECTION NAME] for PitchSnap AI proposal generator. Dark #0C0C0C background, lime
green #B8FF57 accent (used sparingly), Inter font, clean editorial minimal style like Landio Framer
template. [SPECIFIC SECTION REQUIREMENTS]. Mobile-first responsive.
5.5 n8n Automations (after Phase 3 core product)
WORKFLOW
TRIGGER
ACTION
Welcome email
POST /api/auth/signup success
Send branded welcome email via Gmail/Resend
Limit warning
User hits 4/5 generations
Send upgrade prompt email
Monthly reset
1st of month, 9am
Email all free users — quota reset notification
Error alert
API returns 500 error
Notify developer via email/Slack
Weekly digest
Every Monday 9am
Email user their weekly generation stats
6. IMPLEMENTATION PLAN — 20 TASKSGSD executes ONE task at a time. Never combine. Always confirm before next.
CodeRabbit reviews every push. Fix all flags before proceeding.
#
TASK
FILES CREATED/MODIFIED
VERIFY
T1
Update globals.css — exact color variables + keyframes + utilities
app/globals.css
All CSS vars defined, keyframes working
T2
Update Navbar — new colors, lime CTA, scroll blur effect
components/layout/Navbar.tsx
Blur on scroll, lime pill button
T3
Build SectionBadge + WobbleCard + AnimatedCounter reusable components
components/ui/*.tsx (3 files)
All 3 components render correctly
T4
Build FreelancerCharacter.tsx — SVG anime character State 1 only first
components/anime/FreelancerCharacter.tsx
State 1 renders, correct SVG proportions
T5
Add States 2, 3, 4 to character + scroll-driven transitions
components/anime/FreelancerCharacter.tsx
All 4 states transition smoothly on scroll
T6
STITCH: Generate Hero mockup via MCP. Build Hero.tsx with character
components/sections/Hero.tsx
Hero matches Stitch mockup, character visible
T7
Build LogoMarquee.tsx — CSS @keyframes infinite scroll
components/sections/LogoMarquee.tsx
Smooth infinite scroll, no JS
T8
STITCH: Generate Benefits mockup. Build Benefits.tsx — 3 wobble cards
components/sections/Benefits.tsx
Cards wobble on hover, lime accent on one
T9
Build YourJourney.tsx — 4-state character timeline with drawing connector
components/sections/YourJourney.tsx
Line draws left to right on scroll
T10
STITCH: Generate HowItWorks mockup. Build HowItWorks.tsx — 3-step flow
components/sections/HowItWorks.tsx
Steps stagger in, connector draws
T11
STITCH: Generate Features mockup. Build Features.tsx — bento grid
components/sections/Features.tsx
2 large + 4 small cards, live previews
T12
Build SuccessNumbers.tsx — animated counters
components/sections/SuccessNumbers.tsx
Counts up when scrolled into view
T13
Build Testimonials.tsx — dual-row CSS marquee
components/sections/Testimonials.tsx
Both rows scroll opposite directions
T14
STITCH: Generate Pricing mockup. Build Pricing.tsx — 3 tier cards
components/sections/Pricing.tsx
Toggle works, Pro card highlighted
T15
Build FAQ.tsx — shadcn Accordion
components/sections/FAQ.tsx
Expand/collapse works, smooth animation
T16
Build FinalCTA.tsx — Aceternity Background Beams (subtle)
components/sections/FinalCTA.tsx
Beams visible but not overwhelming
T17
Update Footer.tsx — new colors + 4 columns
components/layout/Footer.tsx
4 columns, correct colors
T18
Assemble app/page.tsx — all sections in correct order + scroll bar + Lenis
app/page.tsx, lib/lenis.ts
Full page renders, smooth scroll works
T19
Performance audit — check 60fps, no jitter, all once:true animations
All section files
DevTools shows 60fps, no dropped frames
T20
npm run build → 0 errors. Auto-commit. Push to GitHub.
All files
Clean build, pushed to GitHub
7. GSD + RALPH LOOP + CODERABBITINSTRUCTIONS
7.1 GSD Instructions
-> Read this entire PRD/TRD before writing any code
-> Break work into the 20 tasks listed in Section 6
-> Execute EXACTLY ONE task at a time — never combine tasks
-> After each task: show files created, run npx tsc --noEmit, confirm 0 errors
-> Auto-commit after EACH task: git add . && git commit -m 'feat: Task N - description' && git push
-> After committing: wait for user confirmation before starting next task
-> If a task fails: fix it completely before moving to next task
-> NEVER delete or modify: app/(auth)/, app/(dashboard)/, app/api/, lib/jwt.ts, lib/auth.ts, lib/db.ts, lib/models/
7.2 Ralph Loop Instructions
-> Task file: PRD.md (this document summary) in project root
-> Mode: Balanced (not Fast)
-> Max iterations: 50
-> Git: enabled — commit after each verified task
-> For each task: Read PRD -> Check progress -> Build -> npx tsc --noEmit -> Fix errors -> Commit
-> Stop and wait if: TypeScript errors > 0, build fails, or unclear requirements
-> Do NOT proceed past a failing task
-> Create new branch per session: ralph-loop/session-[date]
7.3 CodeRabbit Review Checklist (after every task)
[ ] Are all colors using CSS variables (not hardcoded hex)?
[ ] Is lime green used more than 3-4 times per section? (flag if yes)
[ ] Does every whileInView have once:true?
[ ] Are there any canvas elements or requestAnimationFrame loops? (reject if yes)
[ ] Are there any custom cursor implementations? (reject if yes)
[ ] Are there any rotateX/rotateY scroll animations? (reject if yes)
[ ] TypeScript: zero 'any' types, strict mode passing?
[ ] Mobile: does it work at 375px without horizontal scroll?
[ ] Performance: are all heavy animations using CSS @keyframes instead of JS?
[ ] Character: do all 4 states have smooth transitions tied to scroll?
[ ] Auth files: were they accidentally modified? (reject if yes)
8. ANTIGRAVITY AGENT PROMPT — PASTE THISFIRSTPaste this ENTIRE prompt into Antigravity Agent panel to start the redesign:
You are a Senior Creative Frontend Engineer rebuilding the PitchSnap landing page to match the Landio
Framer template (pitchsnapp.framer.website) with a unique scroll-driven anime character. FIRST: Read
PRD_REDESIGN.md in the project root. It contains the complete specification. CRITICAL RULES (violating
these = task failure): 1. NEVER touch: app/(auth)/, app/(dashboard)/, app/api/, lib/jwt.ts, lib/auth.ts,
lib/db.ts, lib/models/ — these are protected Phase 3 files 2. NEVER use hardcoded colors — CSS variables
ONLY 3. NEVER add canvas particles, custom cursor, SVG noise filters — performance killers 4. ALL
whileInView must have once:true 5. ONLY 3-4 uses of lime green per page maximum 6. ONE task at a time —
confirm before next 7. Run npx tsc --noEmit after every task (0 errors) 8. Auto-commit and push after
every task EXACT COLOR SYSTEM: --color-bg: #0C0C0C --color-surface: #141414 --color-surface-2: #1A1A1A
--color-border: rgba(255,255,255,0.07) --color-text-primary: #F5F5F5 --color-text-secondary: #888888
--color-accent: #B8FF57 (lime green — use sparingly) --color-accent-dim: rgba(184,255,87,0.12) ANIME
CHARACTER REQUIREMENTS: The FreelancerCharacter.tsx must be a pure SVG anime-style character with 4
scroll-driven states: State 1 (0-25%): Stressed — slouched, papers flying, gray State 2 (25-50%):
Discovering — surprised eyes, laptop appears State 3 (50-75%): Energized — typing, emails flying, lime
tint State 4 (75-100%): Winning — arms up, stars eyes, full lime green Use Framer Motion
useScroll+useTransform for scroll sync. Use CSS @keyframes for floating elements (not Framer Motion).
Spring physics for body transitions: stiffness:200, damping:30. STITCH MCP USAGE: Before building: Hero,
Benefits, HowItWorks, Features, Pricing Send design prompt to Stitch via MCP first. Use Experimental
mode (Gemini 2.5 Pro). Reference the generated mockup when building. START NOW with Task 1: Update
app/globals.css with the complete color system, CSS variables, and utility classes. Show me the complete
globals.css content. Run npx tsc --noEmit — confirm 0 errors. Then wait for my confirmation before Task
2.
After pasting this prompt, Antigravity will start with Task 1 (globals.css).
Share screenshot/output here after each task to get the next task prompt.
9. TASK-BY-TASK PROMPTS FOR CLAUDE TO GIVEYOUAfter each task completes, Claude will give you the next prompt based on this plan.
TASK 2 PROMPT — After T1 globals.css is done:
Task 1 confirmed. Begin Task 2: Update Navbar. Update components/layout/Navbar.tsx: - Background:
transparent by default - On scroll past 50px: backdrop-blur-md + background: rgba(12,12,12,0.8) +
border-bottom - Logo: 'Pitch' white + 'Snap' in --color-accent - Nav links:
text-[--color-text-secondary], hover: text-[--color-text-primary], 150ms ease - CTA button:
bg-[--color-accent] text-[#0C0C0C] font-semibold px-5 py-2 rounded-full hover: opacity-90, scale-[1.02],
150ms ease - Mobile: hamburger menu, slide drawer Run npx tsc --noEmit. Auto-commit. Confirm done.
TASK 3 PROMPT — After T2 Navbar is done:
Task 2 confirmed. Begin Task 3: Reusable UI Components. Create 3 files: 1.
components/ui/SectionBadge.tsx: Props: { label: string } Style: text-[11px] font-semibold
tracking-[0.12em] uppercase text-[--color-accent] inline-flex items-center gap-2 Add small lime dot
before label text 2. components/ui/WobbleCard.tsx: Wrapper card with mouse-tracking wobble On mousemove:
card tilts max 8deg X and Y Uses useRef + mousemove event + CSS transform Style: bg-[--color-surface]
border rounded-xl p-6 Smooth return: transition 300ms when mouse leaves NO Framer Motion — pure CSS
transform + JS 3. components/ui/AnimatedCounter.tsx: Props: { target: number, suffix?: string,
duration?: number } Uses Framer Motion useInView + animate Counts from 0 to target when in viewport
once:true — never repeats Format: toLocaleString() for thousands Run npx tsc --noEmit. Auto-commit.
Confirm done.
TASK 4+5 PROMPT — After T3 UI components done:
Task 3 confirmed. Begin Tasks 4 + 5: Anime Character. NOTE: This is the most important component. Take
your time. Get it right. CREATE components/anime/FreelancerCharacter.tsx The character is a pure SVG
anime-style freelancer. Dimensions: viewBox="0 0 280 380" SVG STRUCTURE (build exactly this): - Glow
circle: cx=140 cy=250 r=120, fill = interpolated color, opacity animated - Body: rect at center, rounded
corners - Head: large circle (anime proportions) - Eyes: two ellipses (change per state) - Mouth: path
curve (change per state) - Hair: path (simple spiky style) - Arms: two paths (position changes per
state) - Floating elements group (papers/emails/money) - Speech bubble: rect + triangle + text SCROLL
IMPLEMENTATION: const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start',
'end end'] }) Pass containerRef as prop from Hero parent. 4 States based on scrollYProgress [0, 0.25,
0.5, 0.75, 1]: State 1: gray body, sad eyes, slouch, papers floating State 2: lighter, surprised eyes,
laptop visible State 3: lime tint, focus eyes, emails flying State 4: full lime, star eyes, arms up,
confetti Floating elements: CSS @keyframes float (NOT Framer Motion) Speech bubbles: Framer Motion
animate with key prop Run npx tsc --noEmit. Screenshot result. Auto-commit. Confirm done.
Tasks 6-20 follow the same pattern.
Claude generates each task prompt after you confirm the previous one is complete.
10. PRD.MD FILE — CREATE THIS IN PROJECTROOTCreate this file at ~/Desktop/PitchSnap/PRD_REDESIGN.md before starting:
# PitchSnap Redesign PRD ## Status - Phase 1 Foundation: COMPLETE - Phase 2 Landing Page: IN REDESIGN
(Tasks 1-20) - Phase 3 Auth: COMPLETE — DO NOT TOUCH - Phase 4 Dashboard: PENDING - Phase 5 Data:
PENDING - Phase 6 Polish+Deploy: PENDING ## Design Reference URL: pitchsnapp.framer.website ## Colors
(exact) --color-bg: #0C0C0C --color-surface: #141414 --color-accent: #B8FF57 (lime, used sparingly)
--color-text-primary: #F5F5F5 --color-text-secondary: #888888 --color-border: rgba(255,255,255,0.07) ##
Character 4-state anime SVG: Stressed -> Discovering -> Energized -> Winning Scroll-driven via Framer
Motion useScroll ## Protected Files (NEVER MODIFY) app/(auth)/, app/(dashboard)/, app/api/, lib/jwt.ts,
lib/auth.ts, lib/db.ts, lib/models/ ## Task Progress [ ] T1: globals.css [ ] T2: Navbar [ ] T3: Reusable
UI components [ ] T4+5: Anime character [ ] T6: Hero section [ ] T7: Logo Marquee [ ] T8: Benefits [ ]
T9: Your Journey [ ] T10: How It Works [ ] T11: Features Bento [ ] T12: Success Numbers [ ] T13:
Testimonials [ ] T14: Pricing [ ] T15: FAQ [ ] T16: Final CTA [ ] T17: Footer [ ] T18: Assemble page.tsx
[ ] T19: Performance audit [ ] T20: Final build + push
READY TO BUILD. Step 1 — Create PRD_REDESIGN.md in ~/Desktop/PitchSnap
 Step 2 — Paste the Section 8 prompt into Antigravity Agent panel
 Step 3 — Confirm each task here and get the next prompt
 Step 4 — Check Stitch at stitch.withgoogle.com to see mockups
 
 20 tasks. Zero shortcuts. Premium result.
 