"use client";

import { useState, useEffect } from "react";
import { Loader2, Sparkles, RotateCcw, Download } from "lucide-react";
import { exportProposalPDF } from "@/lib/exportPDF";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "E-commerce", "SaaS", "Real Estate", "Healthcare", "Finance",
  "Education", "Agency", "Consulting", "Retail", "Other"
];

const SERVICES = [
  "Web Development", "Mobile App", "UI/UX Design", "AI Integration",
  "Automation", "Copywriting", "SEO & Content", "Social Media",
  "Video Editing", "Branding", "Email Marketing", "Other"
];

const TONES = ["Professional", "Friendly", "Bold"];

interface PitchOutput {
  coldEmail: string;
  linkedinMessage: string;
  proposal: string;
  followUpSequence: string;
  pricingRange: string;
}

interface PitchPackage extends PitchOutput {
  qualityScore?: {
    score: number;
    grade: string;
    strengths: string[];
    improvements: string[];
    verdict: string;
  };
}

const STORAGE_KEY = "pitchsnap_form_draft";

export function PitchForm({ isPro = false }: { isPro?: boolean }) {
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [challenge, setChallenge] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<PitchPackage | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<keyof PitchOutput>("coldEmail");
  const [copied, setCopied] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const router = useRouter();

  // Restore form from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.clientName || draft.industry || draft.service || draft.challenge) {
          if (draft.clientName) setClientName(draft.clientName);
          if (draft.industry) setIndustry(draft.industry);
          if (draft.service) setService(draft.service);
          if (draft.challenge) setChallenge(draft.challenge);
          if (draft.tone) setTone(draft.tone);
          setHasDraft(true);
        }
      } catch {}
    }
  }, []);

  // Save form to localStorage on every change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ clientName, industry, service, challenge, tone })
    );
  }, [clientName, industry, service, challenge, tone]);

  const handleReset = () => {
    setClientName("");
    setIndustry("");
    setService("");
    setChallenge("");
    setTone("Professional");
    setOutput(null);
    setError("");
    setHasDraft(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const [loadingStep, setLoadingStep] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(1); // ANALYZING CLIENT PROFILE...
    setError("");
    setOutput(null);

    // Simulated Loading Step Timers (to mask the expected 15s latency of Dual Groq Calls)
    const timers = [
      setTimeout(() => setLoadingStep(2), 3000), // GENERATING PROPOSAL PACKAGE...
      setTimeout(() => setLoadingStep(3), 8000), // RUNNING QUALITY REVIEW...
      setTimeout(() => setLoadingStep(4), 13000), // OPTIMIZING FOR CONVERSION...
    ];

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, industry, service, challenge, tone }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("Rate limit reached. You've hit your monthly proposal limit. Upgrade to Pro for more.");
        } else if (res.status === 401) {
          setError("Session expired. Please refresh the page and sign in again.");
        } else if (res.status === 503) {
          setError("AI service is temporarily unavailable. Please try again in a moment.");
        } else {
          setError(json.error || "Failed to generate pitch. Please try again.");
        }
      } else {
        setOutput(json.data);
        setActiveTab("coldEmail");
        localStorage.removeItem(STORAGE_KEY);
        setHasDraft(false);
        router.refresh();
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!output) return;
    exportProposalPDF({
      clientName,
      service,
      coldEmail: output.coldEmail,
      linkedinOutreach: output.linkedinMessage,
      fullProposal: output.proposal,
      followUpSequence: output.followUpSequence,
      pricingRange: output.pricingRange
    });
  };

  const tabLabels: Record<keyof PitchOutput, string> = {
    coldEmail: "Cold Email",
    linkedinMessage: "LinkedIn",
    proposal: "Proposal",
    followUpSequence: "Follow-Ups",
    pricingRange: "Pricing",
  };

  const loadingText = [
    "",
    "ANALYZING CLIENT PROFILE...",
    "GENERATING PROPOSAL PACKAGE...",
    "RUNNING QUALITY REVIEW...",
    "OPTIMIZING FOR CONVERSION..."
  ][loadingStep];

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-[#141414] border border-white/5 rounded-[2px]">
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-start justify-between">
          <div className="flex items-center h-full gap-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">GENERATE</h2>
            {hasDraft && (
              <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                DRAFT RESTORED
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            title="Clear form"
            className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 mt-1"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Client Business Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                required
                placeholder="e.g. Acme Corp"
                className="w-full h-[40px] bg-[#0C0C0C] border border-white/5 rounded-[2px] px-4 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-700"
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Industry
              </label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                required
                className="w-full h-[40px] bg-[#0C0C0C] border border-white/5 rounded-[2px] px-4 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors appearance-none"
              >
                <option value="" disabled>Select industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Service You're Pitching
              </label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                required
                className="w-full h-[40px] bg-[#0C0C0C] border border-white/5 rounded-[2px] px-4 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors appearance-none"
              >
                <option value="" disabled>Select service</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Tone
              </label>
              <div className="flex gap-2 h-[40px]">
                {TONES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`flex-1 h-full rounded-[2px] text-[11px] font-bold uppercase tracking-widest transition-colors border ${
                      tone === t
                        ? "bg-white text-black border-white"
                        : "bg-[#0C0C0C] text-zinc-500 border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Problem — Textarea per PRD */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Client's Main Problem
            </label>
            <textarea
              value={challenge}
              onChange={e => setChallenge(e.target.value)}
              required
              rows={3}
              placeholder="Describe the client's main challenge or pain point in detail..."
              className="w-full bg-[#0C0C0C] border border-white/5 rounded-[2px] px-4 py-3 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-700 resize-none"
            />
          </div>

          {error && (
            <div className="flex items-start justify-between gap-4 bg-red-950/30 border border-red-500/20 rounded-[2px] px-4 py-3">
              <p className="text-red-400 text-[12px] leading-relaxed">{error}</p>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-500/60 hover:text-red-400 text-[16px] leading-none flex-shrink-0 mt-0.5"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto h-[40px] px-8 bg-white text-black rounded-[2px] text-[13px] font-bold tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> <span className="text-[10px] uppercase tracking-widest ml-1">{loadingText}</span></>
            ) : (
              <><Sparkles size={14} /> Generate Package</>
            )}
          </button>
        </form>
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-6">
          {output.qualityScore && (
            <div className="bg-[#141414] border border-white/5 rounded-[2px] p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-shrink-0 text-center md:border-r border-white/5 md:pr-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                  Conversion Probability
                </div>
                <div 
                  className="text-[56px] font-bold leading-none tracking-tighter"
                  style={{
                    color: output.qualityScore.score >= 90 ? "#FFFFFF" :
                           output.qualityScore.score >= 75 ? "rgba(255,255,255,0.8)" :
                           output.qualityScore.score >= 60 ? "rgba(255,255,255,0.5)" :
                           "rgba(255,100,100,0.8)"
                  }}
                >
                  {output.qualityScore.score}%
                </div>
                <div className="text-[13px] font-bold mt-2 text-zinc-400">
                  GRADE: {output.qualityScore.grade}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="text-[13px] text-white">
                  {output.qualityScore.verdict}
                </div>
                <div className="space-y-2">
                  {output.qualityScore.strengths?.slice(0, 2).map((s: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-zinc-400">
                      <span className="text-[#B8FF57] mt-0.5">✓</span>
                      {s}
                    </div>
                  ))}
                  {output.qualityScore.improvements?.slice(0, 1).map((imp: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-red-400/80 mt-1">
                      <span className="mt-0.5 text-[10px]">↳</span>
                      {imp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        <div className="bg-[#141414] border border-white/5 rounded-[2px]">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-white/5 pr-4">
            <div className="flex overflow-x-auto hide-scrollbar">
              {(Object.keys(tabLabels) as Array<keyof PitchOutput>).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors border-b-2 ${
                    activeTab === tab
                      ? "text-white border-white"
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              
              <div className="w-[1px] h-4 bg-white/10" />

              {isPro ? (
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                >
                  <Download size={12} /> ExPORT PDF
                </button>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 px-3 py-1.5 border border-white/5 rounded-[2px] text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-[#0C0C0C] cursor-not-allowed"
                >
                  <Download size={12} className="opacity-50" /> PRO FEATURE
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <pre className="text-[13px] text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">
              {output[activeTab]}
            </pre>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
