export interface AdaptationSignal {
  mood: number;
  tension: number;
  identityDrift: number;
  worldSwitchCount: number;
  volatility: number;
  reactions: Record<string, number>;
  viewHistory: any[];
  ritualsCompleted: number;
  safetyEvents: any[];
}

export interface AdaptationMetrics {
  emotionalSlope: number;
  chaosAffinity: number;
  comfortSeeking: number;
  worldStability: number;
  reactionSignature: string;
  volatilityIndex: number;
}

export interface AdaptationOutputs {
  pacing: "slow" | "normal" | "fast";
  worldVolatilityBias: number;
  safetySensitivity: number;
  feedBias: "chaos" | "comfort" | "neutral";
  ritualRecommendation: boolean;
}

export interface AdaptationEvent {
  id: string;
  timestamp: number;
  metrics: AdaptationMetrics;
  outputs: AdaptationOutputs;
}
