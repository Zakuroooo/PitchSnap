"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard" },
    { name: "Proposals", href: "/dashboard/proposals" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#0C0C0C] border-t border-white/5 flex items-center justify-between px-2 z-50">
      <Link href="/" className="p-3 text-zinc-500 hover:text-white transition-colors">
        <Home size={18} />
      </Link>
      
      <div className="flex-1 flex items-center justify-center h-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex-1 flex items-center justify-center h-full transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em] ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        className="p-3 text-zinc-500 hover:text-white transition-colors"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}
