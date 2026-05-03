"use client";

import AppShell from "@/components/AppShell";
import CreatorCard from "@/components/CreatorCard";

export default function TemplatesTool() {
  return (
    <AppShell title="Templates">
      <CreatorCard
        title="Templates"
        subtitle="Reusable formats for faster creation"
      >
        <p className="text-white/60 text-[var(--text-sm)]">
          Template tools will appear here.
        </p>
      </CreatorCard>
    </AppShell>
  );
}
