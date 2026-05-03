"use client";

import AppShell from "@/components/AppShell";
import EmotionalWave from "@/components/EmotionalWave";

export default function EmotionalWavePage() {
  return (
    <AppShell title="Emotional Wave">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Real-time emotional activity across LAFFLab and connected surfaces.
        </p>
        <EmotionalWave />
      </div>
    </AppShell>
  );
}
