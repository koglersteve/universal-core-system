import { getUserMood } from "../../shared/moodHelpers";

export function getDogMemeTone(userId: string): string {
  const mood = getUserMood(userId);

  if (!mood) return "Your dog is vibing normally.";

  switch (mood.mood) {
    case "happy":
      return "Your dog is wagging uncontrollably.";
    case "stressed":
      return "Your dog brings you emotional support energy.";
    case "playful":
      return "Your dog wants to zoom around the house.";
    default:
      return "Your dog is observing your vibe.";
  }
}
