# PitchSnap - AI Proposal Generator SaaS

## Project Context
PitchSnap is an AI-powered proposal generator SaaS designed for freelancers to quickly craft, send, and manage professional proposals. Its goal is to provide a user-friendly, feature-rich interface to maximize productivity and win rates.

## Tech Stack
- **Framework:** Next.js (App Router assumed)
- **UI & Styling:** Tailwind CSS
- **Language:** TypeScript
- **Tooling:** ESLint, Prettier

## Design System

### Overview
- **Pattern:** Interactive Demo + Feature-Rich
- **Structure:** Hero > Features > CTA (CTA placed above the fold)
- **Style:** Flat Design (2D, minimalist, bold colors, no shadows, clean lines, simple shapes, typography-focused, modern, icon-heavy)

### Colors
- **Primary:** `#0D9488`
- **Secondary:** `#14B8A6`
- **CTA:** `#F97316`
- **Background:** `#F0FDFA`
- **Text:** `#134E4A`

*(Note: Teal focus + Action Orange)*

### Typography
- **Font Family:** Plus Jakarta Sans (Heading & Body)
- **Mood:** Friendly, modern, SaaS, clean, approachable
- **Import:** 
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

## UX & Development Guidelines

### Pre-Delivery Checklist & Rules
1. **Icons & Visual Elements:** NO emojis for UI icons. Only use SVG icon libraries (e.g., Heroicons, Lucide).
2. **Interactivity:** Ensure `cursor-pointer` on all clickable or hoverable elements. Don't rely solely on color for interactive indication.
3. **Animations:** Keep effects simple. Smooth hover states with color/opacity shifts (150-200ms ease), but no layout shifting transforms. No gradients or shadows due to the flat design approach.
4. **Accessibility:** 
   - Light mode text contrast minimum of 4.5:1.
   - Focus states fully visible and enabled for keyboard navigation.
   - Respect `prefers-reduced-motion` settings.
5. **Responsiveness:** Maintain a structured container max-width. Ensure complete responsiveness across mobile (375px), tablet (768px), desktop (1024px), and large screens (1440px).
6. **Performance:** Prioritize fast loading and clean transitions. Avoid complex, tedious onboarding flows.

