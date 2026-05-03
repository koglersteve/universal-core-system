"use client";

import AppShell from "@/components/AppShell";

export default function CreatorSettings() {
  return (
    <AppShell title="Creator Settings">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Configure your creator preferences, tools, and workflow settings.
        </p>
      </div>
    </AppShell>
  );
}
