"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";

export default function DraftsTool() {
  return (
    <AppShell title="Drafts">
      <CreatorCard
        title="Drafts"
        subtitle="Your in-progress work"
      >
        <p className="text-white/60 text-[var(--text-sm)]">
          Draft management tools will appear here.
        </p>
      </CreatorCard>
    </AppShell>
  );
}
