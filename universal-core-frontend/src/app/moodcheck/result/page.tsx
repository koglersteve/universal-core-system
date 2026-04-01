"use client";

import { useSearchParams } from "next/navigation";
import { MoodCheckResult } from "@/plugins/moodcheck/MoodCheckResult";

export default function MoodCheckResultPage() {
  const params = useSearchParams();
  const mood = params.get("mood");

  return <MoodCheckResult mood={mood} />;
}
