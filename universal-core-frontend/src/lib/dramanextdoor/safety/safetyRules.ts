import { SafetyRule } from "./safetyTypes";

export const safetyRules: SafetyRule[] = [

  // High tension rule
  ({ tension }) => {
    if (tension > 0.7) {
      return {
        id: crypto.randomUUID(),
        type: "High Tension",
        message: "Your emotional tension has been elevated for a while.",
        timestamp: Date.now(),
        details: { tension }
      };
    }
    return null;
  },

  // Low mood rule
  ({ mood }) => {
    if (mood < 25) {
      return {
        id: crypto.randomUUID(),
        type: "Low Mood",
        message: "Your mood has been low across several scenes.",
        timestamp: Date.now(),
        details: { mood }
      };
    }
    return null;
  },

  // Identity drift rule
  ({ identityDrift }) => {
    if (identityDrift > 0.7) {
      return {
        id: crypto.randomUUID(),
        type: "Identity Drift",
        message: "Identity continuity is being actively stabilized.",
        timestamp: Date.now(),
        details: { identityDrift }
      };
    }
    return null;
  },

  // Rapid world switching
  ({ worldSwitchCount }) => {
    if (worldSwitchCount >= 4) {
      return {
        id: crypto.randomUUID(),
        type: "Frequent World Switching",
        message: "You've been switching worlds frequently.",
        timestamp: Date.now(),
        details: { worldSwitchCount }
      };
    }
    return null;
  },

  // Emotional volatility
  ({ canonicalHistory }) => {
    if (canonicalHistory.length >= 2) {
      const last = canonicalHistory[0];
      const prev = canonicalHistory[1];

      if (Math.abs(last.mood - prev.mood) > 30) {
        return {
          id: crypto.randomUUID(),
          type: "Emotional Volatility",
          message: "Your emotional state has shifted sharply.",
          timestamp: Date.now(),
          details: { last, prev }
        };
      }
    }
    return null;
  }
];
