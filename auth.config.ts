import type { NextAuthConfig } from "next-auth"

export const authConfig = {
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
  session: { strategy: "jwt" },
  providers: [], // Providers are populated in auth.ts to avoid Edge Runtime issues with bcrypt/mongodb imports
} satisfies NextAuthConfig
