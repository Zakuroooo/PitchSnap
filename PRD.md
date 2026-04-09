🎯 PROJECT GOAL
Build PitchSnap — a premium dark-themed AI proposal 
and cold outreach generator SaaS for freelancers.
Location: ~/Desktop/PitchSnap (already created)

📋 PRD (Product Requirements Document)
- What it does: Generates freelance proposals and 
  outreach content using AI in under 10 seconds
- Who it's for: Freelancers, agency owners, indie 
  developers looking for clients

- Key Features:
  1. Storytelling landing page:
     - Hero with Aceternity spotlight + 3D card
     - Problem section (scroll animations)
     - Solution 3-step flow
     - Features bento grid
     - Infinite marquee (testimonials)
     - Pricing section (glassmorphism cards)
     - Footer
  2. Auth (JWT):
     - Signup + Login pages
     - Access + refresh token rotation
     - Protected routes middleware
  3. Dashboard with generation form:
     - Service dropdown (Web Dev, Mobile App,
       UI/UX, AI Integration, Automation, Other)
     - Client business name input
     - Client industry dropdown
     - Their main problem textarea
     - Tone selector (Professional/Friendly/Bold)
     - Generate button with loading animation
  4. AI Output (Groq API - Llama 3.1):
     - Cold email (subject + body)
     - LinkedIn outreach message
     - Full project proposal
     - 3 follow-up email sequence
     - Suggested pricing range
     - Copy button for each section
     - Tab switcher UI
  5. Generation history (MongoDB)
  6. Free tier: 5 generations/month limit
  7. Mobile responsive on all pages

- Tech Stack:
  Frontend: Next.js 14, TypeScript, Tailwind CSS
  Components: shadcn/ui + Aceternity UI + Framer Motion
  Backend: Next.js API Routes (no separate backend)
  Database: MongoDB Atlas (free tier)
  AI: Groq API (llama-3.1-70b-versatile)
  Auth: JWT (access + refresh tokens)
  Icons: lucide-react
  Deployment: Vercel

- Design System (READ THIS CAREFULLY):
  Style: Dark Premium SaaS (Linear/Vercel level)
  Background: #0A0A0A
  Surface: #111111
  Border: rgba(255,255,255,0.08)
  Primary Accent: #915EFF (violet)
  Secondary Accent: #00DEFF (cyan)
  Text Primary: #FFFFFF
  Text Secondary: #888888
  Font: Inter (Google Fonts)
  
  Effects to use:
  → Aceternity Spotlight on hero
  → Aceternity Background Beams
  → Aceternity 3D Card tilt effect
  → Aceternity Infinite Moving Cards
  → Aceternity Text Generate Effect
  → Framer Motion for ALL transitions
  → Glassmorphism for pricing cards
  → Skeleton loaders for all loading states
  → Toast notifications for all actions

- Success Criteria:
  Premium SaaS that looks like a 
  multi-million dollar product. User signs up,
  enters client details, gets complete AI 
  proposal package in under 10 seconds.

🗂️ GSD INSTRUCTIONS
Read .agent/skills/ for UI/UX Pro Max guidance.
Break into smallest possible sequential tasks:

Phase 1: Foundation
→ Fix folder structure (remove nested PitchSnap)
→ Setup Tailwind design tokens
→ Setup CSS variables
→ Create base layout components

Phase 2: Landing Page
→ Navbar component
→ Hero section
→ Problem section
→ Solution section
→ Features bento grid
→ Infinite marquee
→ Pricing section
→ Footer

Phase 3: Auth
→ Signup page + API route
→ Login page + API route
→ JWT middleware
→ Protected route HOC

Phase 4: Dashboard
→ Dashboard layout + sidebar
→ Generation form
→ Groq AI API route
→ Output tabs + copy buttons
→ Loading states

Phase 5: History + Limits
→ MongoDB connection
→ Save generations
→ History page
→ 5/month limit logic

Phase 6: Polish
→ Mobile responsiveness
→ Error states
→ Final animations
→ Deploy to Vercel

Execute ONE task at a time.
Never combine steps.
After each task confirm before moving on.

🔁 RALPH LOOP INSTRUCTIONS
For each task:
1. Read PRD and design system above
2. Check what is completed so far
3. Pick the next smallest task
4. Build it completely
5. Test it works correctly
6. Fix any issues found
7. Confirm completion with file list
8. Only then move to next task

🐇 CODERABBIT INSTRUCTIONS
After each component is built:
→ Review code diff completely
→ Flag security issues (especially JWT)
→ Flag TypeScript errors
→ Flag missing mobile styles
→ Flag missing loading/error states
→ Check Framer Motion is used for animations
→ Check design tokens are used not hardcoded colors
→ Suggest fixes before proceeding

🎨 STITCH INSTRUCTIONS
Before building each major page:
→ Reference the Stitch MCP for visual guidance
→ Generate screen mockup in Stitch first
→ Use the generated design as reference
→ Then implement with Aceternity + shadcn

📁 CURRENT FOLDER STRUCTURE
Project is at: ~/Desktop/PitchSnap
Already installed:
→ Next.js 14 + TypeScript + Tailwind
→ shadcn/ui (Nova preset)
→ framer-motion
→ lucide-react
→ clsx + tailwind-merge
→ UI/UX Pro Max (.agent/skills/)

Still needed (install as we build):
→ Aceternity UI components via shadcn registry
→ @splinetool/react-spline
→ mongoose
→ jsonwebtoken
→ bcryptjs
→ groq-sdk

⚠️ CONSTRAINTS
→ Use UI/UX Pro Max skill for ALL design decisions
→ NEVER use blue/purple AI gradients (anti-pattern)
→ NEVER hardcode colors — use CSS variables
→ Mobile first always (375px → 768px → 1440px)
→ Framer Motion for every animation
→ Aceternity UI for all hero/landing effects
→ shadcn/ui for all form/dashboard components
→ One component per file
→ TypeScript strict mode
→ No any types

📦 FINAL OUTPUT
A fully working premium dark SaaS that looks like 
a multi-million dollar product. Every page is 
mobile responsive, animated, and production ready.
Deployed live on Vercel.

🚀 START NOW
Begin with Phase 1, Task 1:
Fix folder structure — check if nested PitchSnap 
folder exists inside ~/Desktop/PitchSnap and 
fix it. Show me the complete folder structure 
after fixing. Confirm before moving to Task 2.