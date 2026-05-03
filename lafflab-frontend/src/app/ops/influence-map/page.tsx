"use client";

import AppShell from "@/components/AppShell";
import CrossAppInfluenceMap from "@/components/CrossAppInfluenceMap";

export default function InfluenceMapPage() {
  return (
    <AppShell title="Cross-App Influence Map">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Visualize how emotional signals propagate between surfaces and apps.
        </p>
        <CrossAppInfluenceMap />
      </div>
    </AppShell>
  );
}
