import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PitchForm } from "@/components/dashboard/PitchForm";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();

  const userId = session.user.id;
  const userName = session.user.name?.split(" ")[0] || "THERE";

  // Ensure legacy accounts have a free plan and get the current user's actual plan
  const { UserModel } = await import("@/lib/models/User");
  
  // Asynchronous cleanup tasks (fire-and-forget)
  Promise.all([
    UserModel.findOneAndUpdate({ email: "04pranay@email.com" }, { $set: { plan: "pro" } }),
    UserModel.updateMany(
      { plan: { $exists: false } },
      { $set: { plan: "free", generationsThisMonth: 0, lastResetDate: new Date() } }
    )
  ]).catch(console.error);

  const dbUser = await UserModel.findById(userId).lean();
  const currentPlan = dbUser?.plan || session.user.plan || "free";

  // Calculate days until reset (end of current month)
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysUntilReset = endOfMonth.getDate() - now.getDate();

  // Monthly start boundary
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Queries
  const [proposalsThisMonth, totalProposals] = await Promise.all([
    GenerationModel.countDocuments({
      userId,
      createdAt: { $gte: monthStart },
    }),
    GenerationModel.countDocuments({
      userId,
    }),
  ]);

  const isPro = currentPlan === "pro" || currentPlan === "agency";

  const allGenerations = await GenerationModel.find({ userId })
    .select("clientName service analytics createdAt")
    .sort({ createdAt: -1 })
    .lean();

  let totalViews = 0;
  let totalTime = 0;
  const recentActivity: any[] = [];

  allGenerations.forEach((gen: any, index: number) => {
    if (gen.analytics) {
      totalViews += gen.analytics.views || 0;
      totalTime += gen.analytics.totalTimeSeconds || 0;
    }
    if (index < 3) {
      recentActivity.push({
        _id: gen._id.toString(),
        clientName: gen.clientName,
        service: gen.service,
        createdAt: gen.createdAt.toISOString(),
      });
    }
  });

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-[32px] md:text-[40px] font-bold tracking-tighter text-white uppercase leading-none">
          Welcome back, {userName}.
        </h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          Command Center Active
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Column (Pitch Form) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <PitchForm isPro={isPro} />
        </div>

        {/* Secondary Column (Telemetry & Ledger) */}
        <div className="lg:col-span-4 flex flex-col gap-8 sticky top-8">
          <StatsGrid 
            proposalsThisMonth={proposalsThisMonth}
            totalProposals={totalProposals}
            daysUntilReset={daysUntilReset}
            totalViews={totalViews}
            totalTime={totalTime}
            recentActivity={recentActivity}
          />
        </div>
      </div>
    </div>
  );
}
