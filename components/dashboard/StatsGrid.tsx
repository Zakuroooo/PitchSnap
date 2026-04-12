interface StatsGridProps {
  proposalsThisMonth: number;
  totalProposals: number;
  daysUntilReset: number;
  totalViews?: number;
  totalTime?: number;
  recentActivity?: Array<{
    _id: string;
    clientName: string;
    service: string;
    createdAt: string;
  }>;
}

export function StatsGrid({ proposalsThisMonth, totalProposals, daysUntilReset, totalViews = 0, totalTime = 0, recentActivity = [] }: StatsGridProps) {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Global Intent Pulse (Telemetry Overview) */}
      <div className="bg-[#141414] border border-white/5 p-6 rounded-[2px] flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8FF57]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-1000 group-hover:bg-[#B8FF57]/20" />
        
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            Global Intent Pulse
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF57] animate-pulse" />
          </div>
          <span className="text-[9px] text-[#B8FF57]/60">LIVE</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57] mb-1">Total Views</span>
            <span className="text-[32px] font-bold text-white tracking-tighter leading-none">{totalViews}</span>
          </div>
           <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">Avg Dwell</span>
            <span className="text-[32px] font-bold text-gray-300 tracking-tighter leading-none">
              {totalViews > 0 ? `${Math.round(totalTime / totalViews)}s` : '0s'}
            </span>
          </div>
        </div>

        {/* Visual Sparkline Graph */}
        <div className="mt-8 pt-6 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#B8FF57]/5 to-transparent pointer-events-none" />
          <div className="flex items-end justify-between h-16 gap-1 px-1">
            {[20, 35, 25, 45, 30, 60, 45, 80, 50, 95, 70, 85, 60, 100, 80, 90].map((height, i) => (
              <div key={i} className="relative w-full flex flex-col justify-end h-full flex-1 group/bar">
                <div 
                  className="w-full bg-white/5 border-t border-white/10 transition-all duration-500 group-hover/bar:bg-[#B8FF57] group-hover/bar:border-[#B8FF57] hover:shadow-[0_0_10px_rgba(184,255,87,0.5)]" 
                  style={{ height: `${height}%`, opacity: 0.3 + (i * 0.04) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Output */}
      <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-[2px] flex flex-col">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-white/5 pb-3">
          Production Ledger
        </h3>
        
        <div className="flex items-end justify-between mb-8">
           <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">This Month</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[56px] font-bold text-white tracking-tighter leading-none">{proposalsThisMonth}</span>
            </div>
          </div>
           <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-1">All Time</span>
            <span className="text-[20px] font-bold text-zinc-400 tracking-tighter">{totalProposals}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-[#141414] px-4 py-3 rounded-[2px] border border-white/5">
          <span>Cycle Reset</span>
          <span className="text-zinc-400">{daysUntilReset} Days</span>
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="bg-[#141414] border border-white/5 p-6 rounded-[2px] flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 border-b border-white/5 pb-3">
            Recent Deployment
          </h3>
          <div className="flex flex-col gap-3">
            {recentActivity.map((activity) => (
              <div key={activity._id} className="flex items-center justify-between bg-[#0c0c0c] border border-white/5 px-4 py-3 rounded-[2px]">
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-white tracking-widest uppercase">{activity.clientName}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{activity.service}</span>
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-600">
                  {new Date(activity.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
