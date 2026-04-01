"use client";

import { useEffect } from "react";
import { createStabilityTracker } from "@/lib/analytics/stability";
import { MoodCheckHome } from "@/plugins/moodcheck";

export default function MoodCheckPage() {
  const stability = createStabilityTracker("moodcheck");

  // Track download / load time
  useEffect(() => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return <MoodCheckHome />;
}

