export interface SafetySignal {
  mood: number;
  tension: number;
  identityDrift: number;
  worldSwitchCount: number;
  canonicalHistory: any[];
}

export interface SafetyEvent {
  id: string;
  type: string;
  message: string;
  timestamp: number;
  details?: any;
}

export type SafetyRule = (signals: SafetySignal) => SafetyEvent | null;
