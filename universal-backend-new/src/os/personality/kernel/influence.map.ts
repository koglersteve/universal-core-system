import type { PersonalityProfile } from "./traits.types.js";

export interface InfluenceWeights {
  identity: number;
  emotionalEngine: number;
  ui: number;
  copy: number;
  transitions: number;
  reactions: number;
}

export interface PersonalityInfluenceMap {
  creativity: InfluenceWeights;
  warmth: InfluenceWeights;
  intensity: InfluenceWeights;
  stability: InfluenceWeights;
  expressiveness: InfluenceWeights;
  symbolicBias: InfluenceWeights;
}

export const DEFAULT_INFLUENCE_MAP: PersonalityInfluenceMap = {
  creativity: {
    identity: 0.95,
    emotionalEngine: 0.7,
    ui: 0.85,
    copy: 0.9,
    transitions: 0.75,
    reactions: 0.8,
  },
  warmth: {
    identity: 0.4,
    emotionalEngine: 0.9,
    ui: 0.6,
    copy: 0.85,
    transitions: 0.7,
    reactions: 0.95,
  },
  intensity: {
    identity: 0.2,
    emotionalEngine: 0.9,
    ui: 0.4,
    copy: 0.7,
    transitions: 0.9,
    reactions: 0.85,
  },
  stability: {
    identity: 0.7,
    emotionalEngine: 0.95,
    ui: 0.6,
    copy: 0.5,
    transitions: 0.9,
    reactions: 0.6,
  },
  expressiveness: {
    identity: 0.6,
    emotionalEngine: 0.75,
    ui: 0.8,
    copy: 0.95,
    transitions: 0.7,
    reactions: 0.85,
  },
  symbolicBias: {
    identity: 0.5,
    emotionalEngine: 0.8,
    ui: 0.7,
    copy: 0.9,
    transitions: 0.75,
    reactions: 0.8,
  },
};

export function getEffectiveInfluence(
  profile: PersonalityProfile,
  map: PersonalityInfluenceMap = DEFAULT_INFLUENCE_MAP
) {
  return {
    identityCreativity:
      profile.traits.creativity.value * map.creativity.identity,
    emotionalCreativity:
      profile.traits.creativity.value * map.creativity.emotionalEngine,
  };
}
