"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createStabilityTracker } from "@/lib/analytics/stability";
import { MoodCheckHome } from "@/plugins/moodcheck";

export const dynamic = "force-dynamic";

function MoodCheckPageInner() {
  const params = useSearchParams();
  const stability = createStabilityTracker("moodcheck");

  // Read query params
  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  // Track time spent on page
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return (
    <div className="moodcheck-container">
      <MoodCheckHome
        mood={mood}
        world={world}
        trait={trait}
        agent={agent}
      />
    </div>
  );
}

export default function MoodCheckPage() {
  return (
    <Suspense>
      <MoodCheckPageInner />
    </Suspense>
  );
}
