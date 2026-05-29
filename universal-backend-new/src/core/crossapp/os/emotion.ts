import type { EmotionalOSSnapshot } from "./os-engine";

export type EmotionSnapshot = {
  valence: "positive" | "neutral" | "negative";
  arousal: "low" | "medium" | "high";
};

export class Emotion {
  static derive(os: EmotionalOSSnapshot): EmotionSnapshot {
    const { harmony, tempo } = os;

    let valence: EmotionSnapshot["valence"] = "neutral";
    if (harmony.score > 0.2) valence = "positive";
    else if (harmony.score < -0.2) valence = "negative";

    let arousal: EmotionSnapshot["arousal"] = "medium";
    if (tempo.bpm <= 5) arousal = "low";
    else if (tempo.bpm >= 20) arousal = "high";

    return { valence, arousal };
  }
}
