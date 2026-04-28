import { getUserMood } from "../../shared/moodHelpers";

export function getCatMemeTone(userId: string): string {
  const mood = getUserMood(userId);

  if (!mood) return "Your cat is judging you neutrally.";

  switch (mood.mood) {
    case "annoyed":
      return "Your cat is also annoyed. Obviously.";
    case "playful":
      return "Your cat is in chaos gremlin mode.";
    case "tired":
      return "Your cat is napping in solidarity.";
    default:
      return "Your cat is judging your emotional choices.";
  }
}
