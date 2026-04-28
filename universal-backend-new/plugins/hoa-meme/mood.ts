import { getUserMood } from "../../shared/moodHelpers";

export function getHoaMoodLine(userId: string): string {
  const mood = getUserMood(userId);

  if (!mood) return "The HOA is calm. For now.";

  switch (mood.mood) {
    case "playful":
      return "Playful mood detected. HOA fines now come with glitter.";
    case "annoyed":
      return "Annoyed? Perfect time for a passive‑aggressive notice.";
    case "stressed":
      return "Stressed? HOA will pretend to be understanding.";
    default:
      return "The HOA is watching. Always.";
  }
}
