"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

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

export function PitchForm() {
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [challenge, setChallenge] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<PitchOutput | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<keyof PitchOutput>("coldEmail");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, industry, service, challenge, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate pitch.");
      } else {
        setOutput(data);
        setActiveTab("coldEmail");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabLabels: Record<keyof PitchOutput, string> = {
    coldEmail: "Cold Email",
    linkedinMessage: "LinkedIn",
    proposal: "Proposal",
    followUpSequence: "Follow-Ups",
    pricingRange: "Pricing",
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-[#141414] border border-white/5 rounded-[2px]">
        <div className="px-6 pt-6 pb-4 border-b border-white/5">
          <h2 className="text-[16px] font-bold tracking-tight text-white">Generate Pitch Package</h2>
          <p className="text-[12px] text-zinc-500 mt-1">Fill in client details to generate a full proposal package in 10 seconds.</p>
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

          {error && <p className="text-red-500 text-[12px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto h-[40px] px-8 bg-white text-black rounded-[2px] text-[13px] font-bold tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={14} /> Generate Package</>
            )}
          </button>
        </form>
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-[#141414] border border-white/5 rounded-[2px]">
          {/* Tabs */}
          <div className="flex border-b border-white/5 overflow-x-auto">
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
            <div className="flex-1" />
            <button
              onClick={handleCopy}
              className="flex-shrink-0 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <pre className="text-[13px] text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">
              {output[activeTab]}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
