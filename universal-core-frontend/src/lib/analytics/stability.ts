"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { createStabilityTracker } from "@/lib/analytics/stability";
import { DramaNextDoorHome } from "@/plugins/dramanextdoor";

export const dynamic = "force-dynamic";

function DramaNextDoorPageInner() {
  const params = useSearchParams();
  const stability = createStabilityTracker("dramanextdoor");

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const token = params.get("et");
  let emotionalState = null;

  if (token) {
    try {
      emotionalState = decodeEmotionalState(token);
    } catch (e) {
      console.warn("Invalid emotional token", e);
    }
  }

  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return (
    <div className="dramanextdoor-container">
      <DramaNextDoorHome
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
      />
    </div>
  );
}

export default function DramaNextDoorPage() {
  return (
    <Suspense>
      <DramaNextDoorPageInner />
    </Suspense>
  );
}


