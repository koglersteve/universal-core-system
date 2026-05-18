export interface SignalState {
  tone: "soft" | "warm" | "direct" | "urgent";
  intensity: number; // 0–1
  lastUpdated: number;
}

export const Signal = {
  default(): SignalState {
    return {
      tone: "soft",
      intensity: 0.3,
      lastUpdated: Date.now()
    };
  },

  fromEmotionAndCognition(
    emotionLabel: string,
    emotionIntensity: number,
    clarity: number
  ): SignalState {
    let tone: SignalState["tone"] = "soft";

    if (emotionIntensity > 0.7) tone = "urgent";
    else if (clarity > 0.7) tone = "direct";
    else if (emotionLabel === "joy") tone = "warm";

    const intensity = Math.max(0, Math.min(1, (emotionIntensity + (1 - clarity)) / 2));

    return { tone, intensity, lastUpdated: Date.now() };
  }
};
