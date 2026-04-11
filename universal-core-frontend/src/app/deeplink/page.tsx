"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { stability } from "@/lib/stability"; // adjust path if needed

export const dynamic = "force-dynamic";

export default function DeeplinkPage() {
  const params = useSearchParams();

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
    <div className="deeplink-container">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(
          {
            mood,
            world,
            trait,
            agent,
            emotionalState,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
