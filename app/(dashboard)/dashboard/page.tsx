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
      
      <PitchForm isPro={session?.user?.plan === "pro" || session?.user?.plan === "agency"} />
    </div>
  );
}
