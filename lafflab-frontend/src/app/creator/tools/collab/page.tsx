"use client";

import AppShell from "@/components/AppShell";

export default function CollaborationPage() {
  return (
    <AppShell title="Collaboration">
      <div className="space-y-[var(--space-4)]">
        <div className="p-[var(--space-4)] bg-white/5 border border-white/10 rounded-lg space-y-[var(--space-2)]">
          <h2 className="text-[var(--text-md)] font-semibold text-white">
            Collaboration is coming soon
          </h2>
          <p className="text-white/60 text-[var(--text-sm)]">
            You’ll be able to invite collaborators, share drafts, and work together on
            posts in real time. For now, you can create and manage your own work from the
            Creator Studio.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
