export type PersonaLabel =
  | "neutral-guide"
  | "playful-companion"
  | "calm-anchor"
  | "focused-coach";

export interface PersonaState {
  label: PersonaLabel;
  lastUpdated: number;
}

export const Persona = {
  default(): PersonaState {
    return {
      label: "neutral-guide",
      lastUpdated: Date.now()
    };
  },

  fromTraitsAndEmotion(
    traits: Record<string, number>,
    emotionLabel: string,
    emotionIntensity: number
  ): PersonaState {
    const playful = traits["playful"] ?? 0.5;
    const purposeful = traits["purposeful"] ?? 0.5;

    let label: PersonaLabel = "neutral-guide";

    if (playful > 0.6 && emotionLabel === "joy") label = "playful-companion";
    else if (purposeful > 0.6 && emotionIntensity < 0.5) label = "focused-coach";
    else if (emotionLabel === "anxious" || emotionLabel === "sad") label = "calm-anchor";

    return { label, lastUpdated: Date.now() };
  }
};
