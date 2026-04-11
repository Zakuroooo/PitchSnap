import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb-client"
import bcrypt from "bcryptjs"
import { UserModel } from "@/lib/models/User"
import dbConnect from "@/lib/db"

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
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.plan = token.plan as string | undefined
        session.user.id = token.id as string
      }
      return session
    }
  },
  session: { strategy: "jwt" }
})
