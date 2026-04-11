import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";
import { FileText, Bot, Briefcase, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}

export default async function ProposalsHistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  
  const generations = await GenerationModel.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-white">Generated Proposals.</h1>
          <p className="text-[14px] text-zinc-500 mt-1">View and manage your past AI-generated pitch packages.</p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-[2px] px-4 py-2 flex items-center gap-2">
          <Bot size={14} className="text-zinc-400" />
          <span className="text-[12px] font-bold text-white">{generations.length}</span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Total</span>
        </div>
      </div>

      {generations.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2px] bg-[#0C0C0C]">
          <FileText size={48} className="text-zinc-800 mb-4" />
          <h3 className="text-[16px] font-bold text-white">No proposals yet</h3>
          <p className="text-[13px] text-zinc-500 mt-2 max-w-sm text-center">
            Go to the Overview dashboard and generate your first pitch package to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {generations.map((gen: any) => (
            <div key={gen._id.toString()} className="bg-[#141414] border border-white/5 rounded-[2px] p-6 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
                    <Briefcase size={14} className="text-zinc-400" />
                    {gen.clientName}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white/5 px-2 py-1 rounded-[2px]">
                      {gen.service}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white/5 px-2 py-1 rounded-[2px]">
                      {gen.industry}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 text-[11px]">
                  <Calendar size={12} />
                  {formatDate(gen.createdAt)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#0C0C0C] border border-white/5 rounded-[2px]">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Challenge</h4>
                  <p className="text-[13px] text-zinc-300 line-clamp-2">{gen.challenge}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[11px] text-zinc-500">Tone: <strong className="text-white">{gen.tone}</strong></span>
                  
                  {/* Note: In a real app we would use a minimal accordion or dialog to view outputs.
                      For now, we'll guide the user to rely on immediate generation view, 
                      or build a detailed view page later if PRD specifies. */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57]">
                    5 Items Generated
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
