"use client";

import { useState } from "react";
import { SettingsForm } from "./SettingsForm";
import { User, CreditCard, Shield, Activity } from "lucide-react";
import { toast } from "sonner";

interface SettingsClientProps {
  user: {
    name: string | null;
    email: string | null;
  };
  isOAuthUser: boolean;
  plan: string;
  planLabel: string;
  generationsThisMonth: number;
  limit: number;
  userEmail: string;
}

type Tab = "general" | "usage" | "security";

export function SettingsClient({
  user,
  isOAuthUser,
  plan,
  planLabel,
  generationsThisMonth,
  limit,
  userEmail,
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General", icon: <User size={14} /> },
    { id: "usage", label: "Billing & Usage", icon: <Activity size={14} /> },
    { id: "security", label: "Security", icon: <Shield size={14} /> },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-[80vh]">
      <div className="flex flex-col space-y-2 mb-12">
        <h1 className="text-[32px] md:text-[40px] font-bold tracking-tighter text-white uppercase leading-none">
          Configuration
        </h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          Account Preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all rounded-[2px] ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 max-w-3xl">
          
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
                  Account Details
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 flex items-center justify-between group hover:border-[#B8FF57]/20 transition-all">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Name</span>
                      <span className="text-[14px] font-bold text-white tracking-widest uppercase">{user.name ?? "—"}</span>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 flex items-center justify-between group hover:border-[#B8FF57]/20 transition-all">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Email</span>
                      <span className="text-[14px] font-bold text-white tracking-widest uppercase">{user.email ?? "—"}</span>
                    </div>
                    {isOAuthUser && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-black bg-[#B8FF57] px-2 py-1 rounded-[2px]">
                        Google SSO
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* USAGE TAB */}
          {activeTab === "usage" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
                  Production Quota
                </h2>
                <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6 space-y-6 relative overflow-hidden group hover:border-[#B8FF57]/20 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8FF57]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-1000 group-hover:bg-[#B8FF57]/10" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Monthly Usage</span>
                    <span className="text-[13px] font-bold text-white tracking-widest uppercase">{generationsThisMonth} / {limit === 500 ? "∞" : limit}</span>
                  </div>
                  <div className="w-full h-[4px] bg-[#0c0c0c] rounded-full overflow-hidden border border-white/5 relative z-10">
                    <div
                      className="h-full bg-[#B8FF57] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(184,255,87,0.5)]"
                      style={{ width: `${Math.min((generationsThisMonth / limit) * 100, 100)}%` }}
                    />
                  </div>
                   <div className="pt-2 flex flex-col relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-2">Current Tier</span>
                      <span className="text-[20px] font-bold text-white tracking-tighter uppercase">{planLabel}</span>
                   </div>
                </div>
              </section>

               <section className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
                  Billing
                </h2>
                <div className="bg-[#0C0C0C] border border-white/5 rounded-[2px] p-6 flex items-center justify-between group hover:border-[#B8FF57]/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Status</span>
                    <span className="text-[14px] font-bold flex items-center gap-2 tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF57] animate-pulse" />
                      Active
                     </span>
                  </div>
                  {plan === "free" && (
                    <button
                      onClick={() => toast("Upgrade — Coming Soon", { description: "We're setting up payments. Join the waitlist at hello@pitchsnap.me", duration: 4000 })}
                      className="px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-[#B8FF57] transition-colors"
                    >
                      Upgrade Plan
                    </button>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <section className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
                  Access Credentials
                </h2>
                {isOAuthUser ? (
                  <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
                      Your account is secured via Single Sign-On (Google). Password management is handled by your identity provider.
                    </p>
                  </div>
                ) : (
                  <SettingsForm userEmail={userEmail} />
                )}
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
