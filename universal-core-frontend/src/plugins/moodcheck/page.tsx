"use client";

import { useSearchParams } from "next/navigation";
import { MoodCheckHome, MoodCheckResult } from "@/plugins/moodcheck";

export default function Page() {
  const params = useSearchParams();
  const mood = params.get("mood");

  // If a mood is present, show the result screen
  if (mood) {
    return <MoodCheckResult mood={mood} />;
  }

  // Otherwise show the home screen
  return <MoodCheckHome />;
}
