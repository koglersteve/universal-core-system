"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";

export default function ProcessingStatusTool() {
  return (
    <AppShell title="Processing Status">
      <CreatorCard
        title="Processing Status"
        subtitle="Track uploads and background jobs"
      >
        <p className="text-white/60 text-[var(--text-sm)]">
          Processing status and job tracking will appear here.
        </p>
      </CreatorCard>
    </AppShell>
  );
}
