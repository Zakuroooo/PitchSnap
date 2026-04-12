import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

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
    <div className="w-full">
      <SettingsClient 
        user={{ name: user?.name ?? null, email: user?.email ?? null }}
        isOAuthUser={isOAuthUser}
        plan={plan}
        planLabel={planLabels[plan]}
        generationsThisMonth={generationsThisMonth}
        limit={limit}
        userEmail={session.user.email ?? ""}
      />
    </div>
  );
}
