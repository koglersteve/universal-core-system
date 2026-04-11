"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { createStabilityTracker } from "@/lib/analytics/stability";
import { IdlyilyHome } from "@/plugins/idlyily";

export const dynamic = "force-dynamic";

function IdlyilyPageInner() {
  const params = useSearchParams();
  const stability = createStabilityTracker("idlyily");

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
    <div className="idlyily-container">
      <IdlyilyHome
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
      />
    </div>
  );
}

export default function IdlyilyPage() {
  return (
    <Suspense>
      <IdlyilyPageInner />
    </Suspense>
  );
}
