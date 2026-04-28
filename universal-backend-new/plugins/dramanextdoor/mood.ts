import { getUserMood } from "../../shared/moodHelpers";

export function getDramaLevel(userId: string): string {
  const mood = getUserMood(userId);

  if (!mood) return "Drama level: baseline.";

  switch (mood.mood) {
    case "chaotic":
      return "Drama level: UNHINGED. Buckle up.";
    case "annoyed":
      return "Drama level: passive‑aggressive.";
    case "playful":
      return "Drama level: mischievous.";
    default:
      return "Drama level: normal.";
  }
}
