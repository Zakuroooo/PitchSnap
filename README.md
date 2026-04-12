# PitchSnap

PitchSnap is the authoritative engine for creating uncompromising freelance proposals. It is a premium, AI-powered platform that allows freelancers and agencies to generate highly converting cold emails, LinkedIn outreach messages, and full proposals by typing in a client's core problem. 

## Features

- **AI-Powered Proposal Generation**: Generates Cold Emails, LinkedIn Messages, Proposals, Follow-Up Sequences, and Pricing Ranges.
- **Deep Quality Scoring**: Evaluates the copy and assigns a conversion probability score with structural feedback.
- **Next-Gen UI/UX**: A dark-mode first, ultra-premium aesthetic inspired by modern minimalist tools.
- **Authentication**: Seamless credential and email OTP based authentication.
- **Analytics & Telemetry**: Tracks views and read times for shared proposal links.
- **Document Export**: High-quality PDF export of generated proposal assets.
- **Serverless Architecture**: Built for high performance on Next.js Edge.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory, React 19, Turbopack)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS (`globals.css`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose & NextAuth Adapter)
- **Authentication**: [NextAuth.js (Auth.js v5)](https://authjs.dev/) with Credentials provider.
- **Email Service**: [Resend](https://resend.com/) for transactional emails & OTPs.
- **AI Processing**: [Groq SDK](https://groq.com/) using LLaMA models.
- **Webhooks/Integrations**: [n8n](https://n8n.io/) for analytics and sign-up telemetry.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel

## Requirements

- Node.js 18+ (20+ recommended)
- MongoDB instance (Atlas recommended)
- Resend API key
- Groq API key
- n8n instance (optional for webhooks, falls back safely if unavailable)

## Environment Variables

To run the project locally, create a \`.env.local\` file in the root directory and populate it with the following:

```env
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.../pitchsnap?retryWrites=true&w=majority

# Auth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# External APIs
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key

# Webhooks (Optional)
N8N_SIGNUP_WEBHOOK=your_n8n_signup_webhook_url
N8N_GENERATION_WEBHOOK=your_n8n_generation_webhook_url
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zakuroooo/PitchSnap.git
   cd PitchSnap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js App Router (Pages, Layouts, API routes)
  - `(auth)/` - Login, Signup pages
  - `(dashboard)/` - Dashboard, Settings, Proposals views
  - `api/` - Backend endpoints (`/generate`, `/auth`, `/telemetry`)
- `components/` - React components
  - `layout/` - Navbar, Footer, Container, Sidebar
  - `sections/` - Landing page sections (Hero, Features, Pricing)
  - `dashboard/` - Dashboard UI (PitchForm, ProposalList, Settings)
  - `ui/`, `aceternity/` - Micro-components and animations
- `lib/` - Server-side utilities, MongoDB connection, models, integrations (Groq, Resend, n8n)
- `public/` - Static assets, images, and icons

## License

© 2026 PitchSnap. All rights reserved.
