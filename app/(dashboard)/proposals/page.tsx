import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";

export const dynamic = "force-dynamic";

export default async function ProposalsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();

  const proposals = await GenerationModel.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-[24px] md:text-[32px] font-bold tracking-tighter text-white uppercase mb-8">
        Generation History
      </h1>

      {proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-white/5 bg-[#141414] rounded-[2px]">
          <p className="text-zinc-500 text-[13px] font-bold uppercase tracking-widest">No proposals generated yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proposals.map((prop: any) => (
            <div key={prop._id.toString()} className="border border-white/5 bg-[#141414] p-6 rounded-[2px] hover:border-white/20 transition-colors flex flex-col">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57] mb-2">
                {new Date(prop.createdAt).toLocaleDateString()}
              </div>
              <h2 className="text-[18px] font-bold text-white mb-1 truncate">{prop.clientName}</h2>
              <p className="text-[12px] text-zinc-500 mb-4">{prop.service} • {prop.industry}</p>
              
              <div className="mt-auto">
                {prop.output?.qualityScore ? (
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Quality Score</span>
                    <span className="text-[14px] font-bold text-white">{prop.output.qualityScore.score}%</span>
                  </div>
                ) : (
                   <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Status</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Generated</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
