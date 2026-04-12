"use client";

import { useState } from "react";

export function SettingsForm({ userEmail }: { userEmail: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      } else {
        setStatus("success");
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  const inputClass =
    "w-full h-[44px] bg-[#0C0C0C] border border-white/5 rounded-[2px] px-4 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-700";

  return (
    <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 rounded-[2px] p-5 space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="Min. 8 characters"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      {message && (
        <p className={`text-[12px] font-medium ${status === "success" ? "text-[#B8FF57]" : "text-red-400"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="h-[40px] px-8 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-zinc-200 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "UPDATING..." : "UPDATE PASSWORD"}
      </button>
    </form>
  );
}
