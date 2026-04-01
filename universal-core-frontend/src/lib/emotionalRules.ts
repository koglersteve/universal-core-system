// src/lib/emotionalRules.ts

export const emotionalRules = {
  version: 1,

  // --- Intensity + Momentum ---
  maxIntensity: 1.0,
  minIntensity: 0.0,
  maxMomentum: 0.85,
  negativeMoodCap: 0.7,

  // --- Emotional Physics ---
  physics: {
    minDecay: 0.01,
    maxDecay: 0.25,
    minInertia: 0.1,
    maxInertia: 0.9,
    maxBlendDelta: 0.5
  },

  // --- Notifications ---
  notifications: {
    minInterval: 30 * 1000, // 30s
    maxPerHour: 6,
    maxPerSession: 20,
    highRiskOverride: true
  },

  // --- Rituals ---
  rituals: {
    minInterval: 12 * 60 * 60 * 1000, // 12h
    maxPerDay: 2,
    highRiskAllowed: false
  },

  // --- World Rules ---
  worlds: {
    maxWorldDelta: 0.6,
    maxDriftPerHour: 0.15,
    maxMergeFrequency: 5, // per session
    requireStabilityForMerge: true
  },

  // --- Transitions ---
  transitions: {
    minInterval: 2000, // 2s
    forbidden: [
      ["angry", "excited"],
      ["overwhelmed", "playful"]
    ],
    softened: {
      angry: "tired",
      frustrated: "sad",
      overwhelmed: "tired"
    }
  },

  // --- High-Risk Moods ---
  highRiskMoods: ["angry", "frustrated", "overwhelmed"],

  // --- Identity Rules ---
  identity: {
    traitSoftening: {
      sensitive: 0.8,
      reactive: 0.6,
      calm: 0.4
    }
  }
};
