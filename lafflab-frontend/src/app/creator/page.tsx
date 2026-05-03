"use client";

import AppShell from "@/components/AppShell";

export default function CreatorHomePage() {
  return (
    <AppShell title="Creator Studio">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Welcome to Creator Studio. Choose a tool to get started.
        </p>

        <div className="space-y-[var(--space-3)]">
          <a
            href="/creator/analytics"
            className="block p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-white/90"
          >
            <div className="text-[var(--text-md)] font-medium">📊 Creator Analytics</div>
            <div className="text-[var(--text-xs)] text-white/60 mt-1">
              Emotional heatmaps, velocity, and reaction insights.
            </div>
          </a>

          <a
            href="/creator/dashboard"
            className="block p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-white/90"
          >
            <div className="text-[var(--text-md)] font-medium">🛠 Creator Dashboard</div>
            <div className="text-[var(--text-xs)] text-white/60 mt-1">
              Manage posts, drafts, and performance (coming soon).
            </div>
          </a>

          <a
            href="/creator/tools"
            className="block p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-white/90"
          >
            <div className="text-[var(--text-md)] font-medium">🧰 Creator Tools</div>
            <div className="text-[var(--text-xs)] text-white/60 mt-1">
              Upload, edit, and optimize content (coming soon).
            </div>
          </a>
        </div>
      </div>
    </AppShell>
  );
}
