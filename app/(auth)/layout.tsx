import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (session?.user?.id) {
    // Force active sessions to dashboard instantly
    redirect("/dashboard")
  }

  return <>{children}</>
}
