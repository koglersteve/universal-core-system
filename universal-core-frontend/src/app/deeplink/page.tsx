"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";

export const dynamic = "force-dynamic";

function DeeplinkPageInner() {
  const params = useSearchParams();
  const stability = createStabilityTracker("deeplink");

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
    <div className="deeplink-container">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(
          { mood, world, trait, agent, emotionalState },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default function DeeplinkPage() {
  return (
    <Suspense>
      <DeeplinkPageInner />
    </Suspense>
  );
}
