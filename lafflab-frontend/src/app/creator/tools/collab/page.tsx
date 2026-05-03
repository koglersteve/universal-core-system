"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";

export default function CollaborationTool() {
  return (
    <AppShell title="Collaboration">
      <CreatorCard
        title="Collaboration"
        subtitle="Invite collaborators and share work"
      >
        <p className="text-white/60 text-[var(--text-sm)]">
          Collaboration features will appear here.
        </p>
      </CreatorCard>
    </AppShell>
  );
}
