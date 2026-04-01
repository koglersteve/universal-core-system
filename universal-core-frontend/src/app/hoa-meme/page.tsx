"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { createStabilityTracker } from "@/lib/analytics/stability";
import { HoaMemeHome } from "@/plugins/hoa-meme";

export default function HoaMemePage() {
  const params = useSearchParams();
  const stability = createStabilityTracker("hoa-meme");

  // Read query params
  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  // Emotional token
  const token = params.get("et");
  let emotionalState = null;

  if (token) {
    try {
      emotionalState = decodeEmotionalState(token);
    } catch (e) {
      console.warn("Invalid emotional token", e);
    }
  }

  // Download metric tracking
  useEffect(() => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return (
    <div className="hoa-meme-container">
      <HoaMemeHome
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
      />
    </div>
  );
}
