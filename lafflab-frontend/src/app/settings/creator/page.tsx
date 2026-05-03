"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function CreatorSettings() {
  const [creatorMode, setCreatorMode] = useState(true);
  const [advancedTools, setAdvancedTools] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [monetization, setMonetization] = useState(false);

  return (
    <AppShell title="Creator Settings">
      <div className="space-y-[var(--space-6)]">

        {/* Creator Mode */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Creator Mode</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Enables creator tools and dashboard
            </p>
          </div>

          <input
            type="checkbox"
            checked={creatorMode}
            onChange={(e) => setCreatorMode(e.target.checked)}
            className="w-5 h-5 accent-white"
          />
        </div>

        {/* Advanced Tools */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Advanced Tools</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Unlock experimental features
            </p>
          </div>

          <input
            type="checkbox"
            checked={advancedTools}
            onChange={(e) => setAdvancedTools(e.target.checked)}
            className="w-5 h-5 accent-white"
          />
        </div>

        {/* Auto Save */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Auto-Save Drafts</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Automatically save your work as you type
            </p>
          </div>

          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            className="w-5 h-5 accent-white"
          />
        </div>

        {/* Monetization */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Monetization</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Enable earning features (coming soon)
            </p>
          </div>

          <input
            type="checkbox"
            checked={monetization}
            onChange={(e) => setMonetization(e.target.checked)}
            className="w-5 h-5 accent-white"
          />
        </div>
      </div>
    </AppShell>
  );
}
