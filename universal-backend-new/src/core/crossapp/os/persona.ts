import type { EmotionalOSSnapshot } from "./os-engine";

export type PersonaSnapshot = {
  style: "playful" | "calm" | "serious" | "supportive";
  notes: string[];
};

export class Persona {
  static derive(os: EmotionalOSSnapshot): PersonaSnapshot {
    const { harmony, tempo, identity } = os;

    const emojiCounts = identity.emojiCounts;
    const laughCount = emojiCounts["laugh"] ?? 0;
    const angryCount = emojiCounts["angry"] ?? 0;

    if (laughCount > angryCount && harmony.score > 0.2) {
      return {
        style: "playful",
        notes: [
          "user responds well to lightness",
          "tone can be more humorous and relaxed",
        ],
      };
    }

    if (harmony.score < -0.2 || angryCount > laughCount) {
      return {
        style: "supportive",
        notes: [
          "user may need reassurance",
          "tone should be gentle and stabilizing",
        ],
      };
    }

    if (tempo.band === "fast") {
      return {
        style: "serious",
        notes: [
          "user is moving quickly",
          "tone should be direct and efficient",
        ],
      };
    }

    return {
      style: "calm",
      notes: [
        "maintain a steady, neutral tone",
        "avoid unnecessary intensity",
      ],
    };
  }
}
