import NextAuth, { DefaultSession } from "next-auth"
import { authConfig } from "./auth.config"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb-client"
import bcrypt from "bcryptjs"
import { UserModel } from "@/lib/models/User"
import dbConnect from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"
import { triggerSignupWebhook } from "@/lib/n8n"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan?: string
    } & DefaultSession["user"]
  }
  interface User {
    plan?: string
    hashedPassword?: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect()
        const userEmail = credentials?.email as string
        const userPassword = credentials?.password as string
        const user = await UserModel.findOne({ email: userEmail })
        if (!user || !user.hashedPassword) return null
        const valid = await bcrypt.compare(userPassword, user.hashedPassword)
        if (!valid) return null
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          plan: user.plan
        }
      }
    })
  ],
  events: {
    async createUser({ user }) {
      try {
        const email = user.email
        if (!email || !user.name) return

        // Send welcome email (fire-and-forget)
        sendWelcomeEmail(email, user.name)

        // Trigger n8n signup webhook (fire-and-forget)
        triggerSignupWebhook({
          name: user.name,
          email,
          plan: "free",
          provider: "google", // OAuth provider — could be google or github
        })
      } catch (err) {
        // Never let this block the OAuth session
        console.error("[createUser event]", err)
      }
    }
  }
})
