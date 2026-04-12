import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";
import { ProposalList } from "@/components/dashboard/ProposalList";
import { Bot, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProposalsHistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  
  // Transform the MongoDB documents to plain objects properly
  const docGenerations = await GenerationModel.find({ 
    userId: session.user.id,
    isHidden: { $ne: true }
  })
    .sort({ createdAt: -1 })
    .lean();

  const crypto = require("crypto");

  // Lazy-migration: Ensure all legacy documents have a viewId
  const generations = await Promise.all(docGenerations.map(async (gen: any) => {
    let viewId = gen.viewId;
    if (!viewId) {
      viewId = crypto.randomUUID();
      // Update the DB asynchronously in the background so legacy docs are fixed permanently
      GenerationModel.updateOne({ _id: gen._id }, { $set: { viewId } }).exec();
    }
    
    return {
      _id: gen._id.toString(),
      clientName: gen.clientName,
      industry: gen.industry,
      service: gen.service,
      challenge: gen.challenge,
      tone: gen.tone,
      output: gen.output,
      viewId: viewId,
      analytics: gen.analytics || { views: 0, totalTimeSeconds: 0 },
      createdAt: gen.createdAt.toISOString(),
    };
  }));

  const isPro = session.user.plan === "pro" || session.user.plan === "agency";

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-[28px] md:text-[40px] tracking-tighter font-bold text-white uppercase">
            Generation History
          </h1>
          <p className="text-[13px] text-zinc-500 mt-2 font-medium">
            Review and copy past AI-generated pitch packages.
          </p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-[2px] px-4 py-2 flex items-center gap-2">
          <Bot size={14} className="text-zinc-400" />
          <span className="text-[12px] font-bold text-white">{generations.length}</span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Total</span>
        </div>
      </div>

      {generations.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center border border-white/5 rounded-[2px] bg-[#141414]">
          <FileText size={48} className="text-zinc-800 mb-4" />
          <h3 className="text-[16px] font-bold text-white">No proposals yet</h3>
          <p className="text-[13px] text-zinc-500 mt-2 max-w-sm text-center">
            Go to the Overview dashboard and generate your first pitch package to see it here.
          </p>
        </div>
      ) : (
        <ProposalList generations={generations} isPro={isPro} />
      )}
    </div>
  );
}
