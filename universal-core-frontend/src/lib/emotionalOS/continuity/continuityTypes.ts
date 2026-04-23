export interface ContinuitySnapshot {
  timestamp: number;
  mood: number;
  tension: number;
  worldName: string;
  reactionSignature: string;
  volatility: number;
}

export interface ContinuityState {
  history: ContinuitySnapshot[];
  arcs: ContinuityArc[];
}

export interface ContinuityArc {
  id: string;
  start: number;
  end: number;
  dominantMood: "low" | "neutral" | "high";
  dominantVolatility: "stable" | "mixed" | "chaotic";
  dominantWorld?: string;
}

export interface ContinuitySignal {
  mood: number;
  tension: number;
  worldName: string;
  reactionSignature: string;
  volatility: number;
}

export interface ContinuityEvent {
  id: string;
  timestamp: number;
  state: ContinuityState;
}
