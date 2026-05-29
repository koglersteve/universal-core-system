import type { EmotionalOSSnapshot } from "./os-engine";

export type EnergySnapshot = {
  level: "low" | "medium" | "high";
  notes: string[];
};

export class Energy {
  static derive(os: EmotionalOSSnapshot): EnergySnapshot {
    const { tempo, emotion } = {
      tempo: os.tempo,
      emotion: EmotionFallback(os),
    };

    if (tempo.band === "fast" || emotion.arousal === "high") {
      return {
        level: "high",
        notes: [
          "system is highly activated",
          "lean into dynamic experiences",
        ],
      };
    }

    if (tempo.band === "slow" || emotion.arousal === "low") {
      return {
        level: "low",
        notes: [
          "system is in low-energy mode",
          "prefer gentle, low-friction flows",
        ],
      };
    }

    return {
      level: "medium",
      notes: [
        "system is balanced",
        "flexible to either calm or active flows",
      ],
    };
  }
}

// small helper to reuse Emotion logic without circular import
import type { EmotionSnapshot } from "./emotion";
import { Emotion as EmotionModule } from "./emotion";

function EmotionFallback(os: EmotionalOSSnapshot): EmotionSnapshot {
  return EmotionModule.derive(os);
}
