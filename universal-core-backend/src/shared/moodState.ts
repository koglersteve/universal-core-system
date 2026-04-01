// universal-core/shared/moodState.ts
export type MoodStatePacket = {
  userId: string;
  mood: string;
  intensity: number;
  timestamp: string;
  memeReference?: string | null;
  sourceApp: string;      // "moodcheck-app"
  type: "MOOD_STATE";
};
