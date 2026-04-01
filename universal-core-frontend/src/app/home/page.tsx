"use client";

import { EmotionalHomeHeader } from "@/components/home/EmotionalHomeHeader";
import { EmotionalStateCard } from "@/components/home/EmotionalStateCard";
import { EmotionalHistoryPreview } from "@/components/home/EmotionalHistoryPreview";
import { EmotionalRitualPreview } from "@/components/home/EmotionalRitualPreview";
import { EmotionalWorldSwitcher } from "@/components/EmotionalWorldSwitcher";
import { EmotionalWorldDiff } from "@/components/EmotionalWorldDiff";
import { EmotionalWorldMerge } from "@/components/EmotionalWorldMerge";

export default function HomePage() {
  return (
    <div className="emotional-home">
      <EmotionalHomeHeader />

      <div className="home-grid">
        <EmotionalStateCard />
        <EmotionalHistoryPreview />
        <EmotionalRitualPreview />
      </div>

      <div className="home-multiverse">
        <EmotionalWorldSwitcher />
        <EmotionalWorldDiff />
        <EmotionalWorldMerge />
      </div>
    </div>
  );
}
