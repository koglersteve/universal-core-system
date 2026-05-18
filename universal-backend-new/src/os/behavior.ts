export interface BehaviorState {
  tendency: "neutral" | "approach" | "avoid" | "explore";
  activation: number; // 0–1
  lastUpdated: number;
}

export const Behavior = {
  default(): BehaviorState {
    return { tendency: "neutral", activation: 0, lastUpdated: Date.now() };
  },

  updateFromEmotionAndIntent(
    state: BehaviorState,
    emotionIntensity: number,
    intentStrength: number,
    now: number = Date.now()
  ): BehaviorState {
    let tendency: BehaviorState["tendency"] = "neutral";

    if (intentStrength > 0.6 && emotionIntensity <= 0.5) tendency = "approach";
    if (emotionIntensity > 0.7) tendency = "avoid";
    if (intentStrength > 0.4 && emotionIntensity > 0.4) tendency = "explore";

    const activation = Math.max(intentStrength, emotionIntensity);

    return { tendency, activation, lastUpdated: now };
  }
};
