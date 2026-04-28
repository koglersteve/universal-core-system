import { getUserMood } from "../../shared/moodHelpers";

export function getIdlyilyPrompt(userId: string): string {
  const mood = getUserMood(userId);

  if (!mood) return "How are you feeling today?";

  switch (mood.mood) {
    case "romantic":
      return "Romantic mood detected. Here's a soft, loving prompt.";
    case "playful":
      return "Playful mood? Let's flirt with chaos.";
    case "tired":
      return "Tired? Let's keep it gentle and supportive.";
    default:
      return "Here's something thoughtful for you.";
  }
}
