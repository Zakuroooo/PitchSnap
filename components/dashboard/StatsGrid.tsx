interface StatsGridProps {
  proposalsThisMonth: number;
  totalProposals: number;
  daysUntilReset: number;
}

export function StatsGrid({ proposalsThisMonth, totalProposals, daysUntilReset }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 mb-4 border-y border-white/5">
      {/* Stat 1: Proposals This Month */}
      <div className="flex flex-col">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Proposals This Month
        </h3>
        <p className="text-[56px] font-bold text-white tracking-tighter leading-none">
          {proposalsThisMonth}
        </p>
      </div>

      {/* Stat 2: Total Proposals */}
      <div className="flex flex-col">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Total Proposals
        </h3>
        <p className="text-[56px] font-bold text-white tracking-tighter leading-none">
          {totalProposals}
        </p>
      </div>

      {/* Stat 3: Days Until Reset */}
      <div className="flex flex-col">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Days Until Reset
        </h3>
        <div className="flex items-end gap-3">
          <p className="text-[56px] font-bold text-white tracking-tighter leading-none">
            {daysUntilReset}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 pb-2">
            Until Monthly Reset
          </span>
        </div>
      </div>
    </div>
  );
}
