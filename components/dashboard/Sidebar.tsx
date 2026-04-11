"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Send, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface SidebarProps {
  session: Session | null;
}

export function Sidebar({ session }: SidebarProps) {
  const pathname = usePathname();
  const userName = session?.user?.name?.split(" ")[0] || "User";
  const plan = session?.user?.plan === "pro" || session?.user?.plan === "agency" 
    ? `${session.user.plan} plan`
    : "Free Plan";

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Proposals", href: "/dashboard/proposals", icon: FileText },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Send },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6">
        <Link href="/" className="text-[14px] font-bold tracking-widest text-white uppercase">
          PITCHSNAP.
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-8 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-[2px] text-[13px] font-medium transition-colors ${
                isActive 
                  ? "text-white bg-white/[0.04]" 
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* User Widget */}
      <div className="p-4 mb-4 mx-4 border border-white/5 rounded-[2px] bg-[#141414]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-white capitalize line-clamp-1">{userName}</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">{plan}</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-zinc-500 hover:text-white transition-colors p-1"
            title="Log Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
