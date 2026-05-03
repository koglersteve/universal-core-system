"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function DataSettings() {
  const [cacheSize] = useState("24 MB");
  const [draftSize] = useState("8 MB");
  const [mediaSize] = useState("112 MB");

  return (
    <AppShell title="Data & Storage">
      <div className="space-y-[var(--space-6)]">

        {/* Storage Overview */}
        <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg space-y-[var(--space-2)]">
          <h2 className="text-[var(--text-lg)] font-semibold">Storage Usage</h2>
          <p className="text-white/60 text-[var(--text-sm)]">Cache: {cacheSize}</p>
          <p className="text-white/60 text-[var(--text-sm)]">Drafts: {draftSize}</p>
          <p className="text-white/60 text-[var(--text-sm)]">Media: {mediaSize}</p>
        </div>

        {/* Clear Cache */}
        <button className="w-full p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg text-left text-white/80">
          Clear Cache
        </button>

        {/* Clear Drafts */}
        <button className="w-full p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg text-left text-white/80">
          Clear Drafts
        </button>

        {/* Clear Media */}
        <button className="w-full p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg text-left text-white/80">
          Clear Media
        </button>

        {/* Reset App */}
        <button className="w-full p-[var(--space-4)] bg-red-500/20 border border-red-500/30 rounded-lg text-left text-red-300">
          Reset App Data
        </button>
      </div>
    </AppShell>
  );
}
