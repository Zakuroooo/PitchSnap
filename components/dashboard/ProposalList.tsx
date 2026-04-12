"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Calendar, X, Copy, Check, Download, ChevronRight, Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { exportProposalPDF } from "@/lib/exportPDF";

interface Generation {
  _id: string;
  clientName: string;
  industry: string;
  service: string;
  challenge: string;
  tone: string;
  output: {
    coldEmail: string;
    linkedinMessage: string;
    proposal: string;
    followUpSequence: string;
    pricingRange: string;
    qualityScore?: {
      score: number;
      grade: string;
      strengths: string[];
      improvements: string[];
      verdict: string;
    };
  };
  viewId: string;
  analytics: {
    views: number;
    totalTimeSeconds: number;
  };
  createdAt: string;
}

interface ProposalListProps {
  generations: Generation[];
  isPro: boolean;
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));
}

const TABS = {
  coldEmail: "Cold Email",
  linkedinMessage: "LinkedIn",
  proposal: "Proposal",
  followUpSequence: "Follow-Ups",
  pricingRange: "Pricing",
} as const;

export function ProposalList({ generations, isPro }: ProposalListProps) {
  const router = useRouter();
  const [localGenerations, setLocalGenerations] = useState(generations);
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [activeTab, setActiveTab] = useState<keyof typeof TABS>("coldEmail");
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Sync with server updates
  useEffect(() => {
    setLocalGenerations(generations);
  }, [generations]);

  // Reset delete confirm state when clicking anywhere else
  useEffect(() => {
    const handleGlobalClick = () => setDeleteConfirmId(null);
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent opening the modal
    
    // Step 1: Request confirmation inline
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }

    // Step 2: Execute deletion
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/generate/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete remotely");
      
      setLocalGenerations(prev => prev.filter(g => g._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete", err);
      // Optional: User feedback could go here
    } finally {
      setIsDeleting(null);
    }
  };

  const handleCopy = () => {
    if (!selectedGen) return;
    navigator.clipboard.writeText(selectedGen.output[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (!selectedGen) return;
    const url = `${window.location.origin}/view/${selectedGen.viewId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportPDF = () => {
    if (!selectedGen) return;
    exportProposalPDF({
      clientName: selectedGen.clientName,
      service: selectedGen.service,
      coldEmail: selectedGen.output.coldEmail,
      linkedinOutreach: selectedGen.output.linkedinMessage,
      fullProposal: selectedGen.output.proposal,
      followUpSequence: selectedGen.output.followUpSequence,
      pricingRange: selectedGen.output.pricingRange,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {localGenerations.map((gen) => (
          <div
            key={gen._id}
            onClick={() => {
              setSelectedGen(gen);
              setActiveTab("coldEmail");
            }}
            className={`group bg-[#141414] border border-white/5 rounded-[2px] p-6 flex flex-col cursor-pointer hover:border-white/20 transition-all duration-300 relative overflow-hidden ${
              isDeleting === gen._id ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-6 pr-8">
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
              <div className="flex flex-col items-end gap-3 translate-y-[2px] transition-all">
                <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(gen.createdAt)}
                  </div>
                  
                  <button 
                    onClick={(e) => handleDelete(e, gen._id)}
                    className={`rounded-[2px] border transition-colors flex items-center justify-center -mr-2 ${
                      deleteConfirmId === gen._id 
                        ? "text-[#FF4444] border-[#FF4444]/30 bg-[#FF4444]/10 hover:bg-[#FF4444]/20 py-1.5 px-3 gap-2 opacity-100" 
                        : "text-zinc-500 hover:text-red-500 bg-[#0C0C0C] border-white/5 py-1.5 px-1.5 opacity-0 group-hover:opacity-100"
                    }`}
                    title={deleteConfirmId === gen._id ? "Confirm Deletion" : "Remove Card"}
                  >
                    {deleteConfirmId === gen._id ? (
                      <>
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Delete</span>
                      </>
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
                
                {gen.output.qualityScore && (
                  <div
                    className="text-[11px] font-bold tracking-widest uppercase mt-1"
                    style={{
                      color:
                        gen.output.qualityScore.score >= 90
                          ? "#B8FF57"
                          : gen.output.qualityScore.score >= 75
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,100,100,0.8)",
                    }}
                  >
                    Score: {gen.output.qualityScore.score}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pr-8">
              <div className="p-4 bg-[#0C0C0C] border border-white/5 rounded-[2px] group-hover:border-white/10 transition-colors">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  Challenge
                </h4>
                <p className="text-[13px] text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap">
                  {gen.challenge}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[11px] text-zinc-500">
                  Tone: <strong className="text-white">{gen.tone}</strong>
                </span>

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57] group-hover:text-white transition-colors">
                  View Details &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Detail View */}
      <AnimatePresence>
        {selectedGen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGen(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transform-gpu"
              style={{ WebkitTransform: 'translateZ(0)' }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#0C0C0C] border-l border-white/5 shadow-2xl z-[9999] flex flex-col font-inter"
            >
              {/* Header */}
              <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/5 bg-[#141414]">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">
                    {formatDate(selectedGen.createdAt)}
                  </div>
                  <h2 className="text-[20px] font-bold text-white flex items-center gap-3">
                    {selectedGen.clientName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedGen(null)}
                  className="p-2 text-zinc-500 hover:text-white bg-[#0C0C0C] hover:bg-white/5 border border-white/5 rounded-[2px] transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex-shrink-0 bg-[#141414] border-b border-white/5 px-6 pt-4 flex flex-col gap-4">
                <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8FF57] bg-white/5 px-2 py-1 rounded-[2px] whitespace-nowrap">
                    {selectedGen.service}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-[#0C0C0C] px-2 py-1 rounded-[2px] whitespace-nowrap border border-white/5">
                    {selectedGen.industry}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-[#0C0C0C] px-2 py-1 rounded-[2px] whitespace-nowrap border border-white/5">
                    Tone: {selectedGen.tone}
                  </span>
                </div>

                {/* Telemetry intent bar */}
                <div className="flex items-center justify-between py-3 border-y border-white/5 bg-[#1a1a1a]/50 rounded-[2px] px-4 my-2">
                  <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Views</span>
                      <span className="text-white">{selectedGen.analytics.views}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Avg Read Time</span>
                      <span className="text-white">
                        {selectedGen.analytics.views > 0 
                          ? `${Math.round(selectedGen.analytics.totalTimeSeconds / selectedGen.analytics.views)}s` 
                          : '0s'}
                      </span>
                    </div>
                  </div>
                  <div>
                    {isPro ? (
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-black hover:bg-zinc-200 border border-transparent rounded-[2px] text-[10px] font-bold uppercase tracking-widest transition-colors"
                      >
                        {copiedLink ? <Check size={12} /> : <Copy size={12} />}
                        {copiedLink ? "Copied Link" : "Share Link"}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1.5 border border-[#B8FF57]/20 bg-[#B8FF57]/5 rounded-[2px]">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-[#B8FF57]">Upgrade to track client intent</span>
                      </div>
                    )}
                  </div>
                </div>

                 {/* Navigation Tabs */}
                 <div className="flex overflow-x-auto hide-scrollbar">
                  {(Object.keys(TABS) as Array<keyof typeof TABS>).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-shrink-0 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors border-b-2 ${
                        activeTab === tab
                          ? "text-white border-[#B8FF57]"
                          : "text-zinc-500 border-transparent hover:text-zinc-300"
                      }`}
                    >
                      {TABS[tab]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#0C0C0C] relative">
                <div className="absolute top-6 right-6 flex items-center gap-2">
                   <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-white transition-colors"
                  >
                    {copied ? <Check size={12} className="text-[#B8FF57]" /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  
                  {isPro && (
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Download size={12} /> PDF
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    Generated {TABS[activeTab]}
                  </h3>
                  <div className="bg-[#141414] border border-white/5 p-6 rounded-[2px]">
                    <pre className="text-[13px] text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans min-h-[200px]">
                      {selectedGen.output[activeTab]}
                    </pre>
                  </div>
                </div>

                 {/* Challenge Refresher */}
                 <div className="mt-8 pt-8 border-t border-white/5">
                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                    Original Challenge
                  </h3>
                   <p className="text-[13px] text-zinc-400 leading-relaxed max-w-xl">
                    {selectedGen.challenge}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
