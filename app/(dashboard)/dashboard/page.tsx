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

  // HOTFIX: Upgrade Pranay to Pro and fetch updated plan directly from DB
  const user = await import("@/lib/models/User").then(async m => {
    // 1. Force Pranay to Pro
    const pranay = await m.UserModel.findOneAndUpdate(
      { email: "04pranay@gmail.com" },
      { $set: { plan: "pro" } },
      { returnDocument: "after" }
    );
    // 2. Retroactively fix ALL legacy OAuth accounts who have missing plans
    await m.UserModel.updateMany(
      { plan: { $exists: false } },
      { $set: { plan: "free", generationsThisMonth: 0, lastResetDate: new Date() } }
    );
    return pranay;
  });
  
  const currentPlan = user?.plan || session.user.plan || "free";

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

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-[32px] md:text-[40px] font-bold tracking-tighter text-white uppercase">
        Welcome back, {userName}.
      </h1>
      
      <StatsGrid 
        proposalsThisMonth={proposalsThisMonth}
        totalProposals={totalProposals}
        daysUntilReset={daysUntilReset}
      />
      
      <PitchForm isPro={currentPlan === "pro" || currentPlan === "agency"} />
    </div>
  );
}
