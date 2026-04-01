// src/app/idlyily/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { IdlyilyHome } from "@/plugins/idlyily";
import { useEffect } from "react";

export default function IdlyilyPage() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  let emotionalState = null;
  const token = params.get("et");

  if (token) {
    try {
      emotionalState = decodeEmotionalState(token);
    } catch (e) {
      console.warn("Invalid emotional token", e);
    }
  }

  return (
    <div className="idlyily-container">
      <SessionDurationTracker />
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

function SessionDurationTracker() {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return null;
}
