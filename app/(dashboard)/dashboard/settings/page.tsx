import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();

  // Use email lookup to be adapter-agnostic (works for both OAuth and credentials)
  const user = await UserModel.findOne({ email: session.user.email }).lean().catch(() => null);

  const isOAuthUser = !user || !("hashedPassword" in user) || !user.hashedPassword;

  const planLabels: Record<string, string> = {
    free: "Free",
    pro: "Pro",
    agency: "Agency",
  };

  const planLimits: Record<string, number> = {
    free: 5,
    pro: 50,
    agency: 500,
  };

  const plan = user?.plan ?? "free";
  const generationsThisMonth = user?.generationsThisMonth ?? 0;
  const limit = planLimits[plan] ?? 5;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-2xl">
      <h1 className="text-[24px] md:text-[32px] font-bold tracking-tighter text-white uppercase">
        Settings
      </h1>

      {/* Account Info */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
          Account
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Name</div>
              <div className="text-[14px] font-bold text-white">{user?.name ?? "—"}</div>
            </div>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Email</div>
              <div className="text-[14px] font-bold text-white">{user?.email ?? "—"}</div>
            </div>
            {isOAuthUser && (
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 border border-white/5 px-2 py-1 rounded-[2px]">
                OAuth
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
          Usage This Month
        </h2>
        <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-zinc-400">Proposals Generated</span>
            <span className="text-[13px] font-bold text-white">{generationsThisMonth} / {limit === 500 ? "∞" : limit}</span>
          </div>
          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-700"
              style={{ width: `${Math.min((generationsThisMonth / limit) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Current Plan</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{planLabels[plan]}</span>
          </div>
        </div>
      </section>

      {/* Change Password (credentials users only) */}
      {!isOAuthUser && (
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
            Change Password
          </h2>
          <SettingsForm userEmail={session.user.email ?? ""} />
        </section>
      )}

      {/* Plan */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-3">
          Plan
        </h2>
        <div className="bg-[#141414] border border-white/5 rounded-[2px] p-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Current Plan</div>
            <div className="text-[18px] font-bold text-white uppercase tracking-widest">{planLabels[plan]}</div>
          </div>
          {plan === "free" && (
            <a
              href="#pricing"
              className="px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-zinc-200 transition-colors"
            >
              Upgrade
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
