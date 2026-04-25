"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { MoodCheckResult } from "@/plugins/moodcheck";

export const dynamic = "force-dynamic";

function MoodCheckResultInner() {
  const params = useSearchParams();
  const stability = createStabilityTracker("moodcheck-result");

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

  // Track time spent on page
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return (
    <div className="moodcheck-result-container">
      <MoodCheckResult
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
      />
    </div>
  );
}

export default function MoodCheckResultPage() {
  return (
    <Suspense>
      <MoodCheckResultInner />
    </Suspense>
  );
}
