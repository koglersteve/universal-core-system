export interface IntentSignal {
  chaosAffinity: number;
  comfortSeeking: number;
  volatility: number;
  emotionalSlope: number;
  worldStability: number;
  reactionSignature: string;
  continuityArcs: any[];
  adaptationOutputs: any;
}

export type IntentCategory =
  | "chaos"
  | "comfort"
  | "distraction"
  | "validation"
  | "novelty"
  | "identity"
  | "release"
  | "exploration";

export interface IntentResult {
  category: IntentCategory;
  confidence: number;
}

export interface IntentProjection {
  feedBias: "chaos" | "comfort" | "neutral";
  worldBias: "stable" | "volatile" | "neutral";
  pacing: "slow" | "normal" | "fast";
  safetySensitivity: number;
  ritualRecommendation: boolean;
}

export interface IntentEvent {
  id: string;
  timestamp: number;
  intent: IntentResult;
  projection: IntentProjection;
}
