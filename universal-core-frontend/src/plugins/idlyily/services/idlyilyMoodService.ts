// src/plugins/idlyily/services/idlyilyMoodService.ts

import { idlyilyApi } from "../api/client";

export const idlyilyMoodService = {
  async getMoodScore(mood: string) {
    try {
      const data = await idlyilyApi.moodScore(mood);

      const interpretation = interpretScore(data.score);

      return {
        mood: data.mood,
        score: data.score,
        interpretation,
      };
    } catch (err) {
      console.error("IDLYILY: Mood scoring failed", err);
      throw new Error("Could not calculate mood score.");
    }
  },
};

function interpretScore(score: number): string {
  if (score >= 85) return "High emotional intensity";
  if (score >= 70) return "Strong emotional presence";
  if (score >= 55) return "Moderate emotional activity";
  if (score >= 40) return "Low emotional activation";
  return "Neutral baseline";
}
