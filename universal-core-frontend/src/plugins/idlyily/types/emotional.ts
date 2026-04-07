// src/plugins/idlyily/types/emotional.ts

export interface EmotionalContext {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
}

export interface MoodScoreResult {
  mood: string;
  score: number;
  interpretation: string;
}
