import { getCurrentTimestamp } from "../utils/timestamp";
import { DEFAULT_INTENSITY } from "../utils/constants";

export function createMoodPacket({ userId = "demo-user", mood, memeReference }) {
  return {
    userId,
    mood,
    intensity: DEFAULT_INTENSITY,
    timestamp: getCurrentTimestamp(),
    memeReference: memeReference || null,
    sourceApp: "moodcheck-app",
    type: "MOOD_STATE",
  };
}
