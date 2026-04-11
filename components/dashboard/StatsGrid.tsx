import { TrendingUp } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stat 1: Total Pitches */}
      <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6 flex flex-col justify-between h-[140px]">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Total Generated
        </h3>
        <p className="text-[32px] font-bold text-white tracking-tight">
          128
        </p>
      </div>

      {/* Stat 2: Active Clients */}
      <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6 flex flex-col justify-between h-[140px]">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Active Conversations
        </h3>
        <p className="text-[32px] font-bold text-white tracking-tight">
          14
        </p>
      </div>

      {/* Stat 3: Win Rate */}
      <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6 flex flex-col justify-between h-[140px]">
        <div className="flex items-start justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Average Response Rate
          </h3>
          <div className="flex items-center gap-1 text-zinc-400 bg-white/5 px-2 py-1 rounded-[2px]">
            <TrendingUp size={12} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">+12%</span>
          </div>
        </div>
        <p className="text-[32px] font-bold text-white tracking-tight">
          32%
        </p>
      </div>
    </div>
  );
}
