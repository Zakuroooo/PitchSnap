import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-[#0C0C0C] text-white overflow-hidden font-inter">
      {/* 200px Sidebar reserved space */}
      <aside className="w-[200px] flex-shrink-0 border-r border-white/5 bg-[#0C0C0C] hidden md:block">
        <Sidebar session={session} />
      </aside>
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
