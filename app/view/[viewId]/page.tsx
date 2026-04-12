import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";
import { TelemetryTracker } from "@/components/telemetry/TelemetryTracker";
import { Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ViewProposalPage({ params }: { params: Promise<{ viewId: string }> }) {
  const { viewId } = await params;

  if (!viewId) return notFound();

  await dbConnect();

  const generation = await GenerationModel.findOne({ viewId }).lean();

  if (!generation) return notFound();

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white font-inter">
      {/* Invisible Tracker */}
      <TelemetryTracker viewId={viewId} />

      {/* Header */}
      <header className="border-b border-white/5 bg-[#141414] py-6 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em]">PITCHSNAP.</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <Briefcase size={16} />
          <span className="text-[11px] font-bold uppercase tracking-widest">{generation.clientName} Proposal</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 md:px-8 space-y-12">
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
            The Proposal
          </h2>
          <div className="bg-[#141414] border border-white/5 rounded-[2px] p-8">
            <pre className="text-[14px] text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">
              {generation.output.proposal}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57] border-b border-white/5 pb-2">
            Investment Summary
          </h2>
          <div className="bg-[#1a1a1a] border border-[#B8FF57]/20 rounded-[2px] p-8">
            <pre className="text-[14px] text-white whitespace-pre-wrap leading-relaxed font-sans font-bold">
              {generation.output.pricingRange}
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
        Powered by PitchSnap
      </footer>
    </div>
  );
}
