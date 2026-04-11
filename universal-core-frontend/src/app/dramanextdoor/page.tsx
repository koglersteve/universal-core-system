"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";
import { DramaNextDoorScene } from "@/plugins/dramanextdoor/DramaNextDoorScene";
import { stability } from "@/lib/stability"; // <-- if this exists in your project

export const dynamic = "force-dynamic";

export default function DramaNextDoorPage() {
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
    <div className="drama-nextdoor-container">
      <DramaNextDoorScene
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
        emotionalState={emotionalState}
      />
    </div>
  );
}
