"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createStabilityTracker } from "@/lib/analytics/stability";

import { MoodCheckHome } from "@/plugins/moodcheck/MoodCheckHome";
import { MoodCheckResult } from "@/plugins/moodcheck/MoodCheckResult";
import { MoodCheckHistory } from "@/plugins/moodcheck/MoodCheckHistory";

export default function MoodCheckPage() {
  const params = useSearchParams();
  const stability = createStabilityTracker("moodcheck");

  const mood = params.get("mood");
  const history = params.get("history");

  // Track load → unload time
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  // History view
  if (history === "1") {
    return <MoodCheckHistory />;
  }

  // Result view
  if (mood) {
    return <MoodCheckResult mood={mood} />;
  }

  // Default home view
  return <MoodCheckHome />;
}
