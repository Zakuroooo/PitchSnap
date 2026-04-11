"use client";

import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PitchForm } from "@/components/dashboard/PitchForm";

export default function DashboardOverview() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-[28px] font-bold tracking-tight text-white">Dashboard.</h1>
      
      <StatsGrid />
      
      <PitchForm />
    </div>
  );
}
