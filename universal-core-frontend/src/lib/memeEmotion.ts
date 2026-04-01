// src/lib/memeemotions.ts

export type MoodKey =
  | "happy"
  | "sad"
  | "stressed"
  | "angry"
  | "tired"
  | "excited"
  | "romantic"
  | "flirty"
  | "annoyed"
  | "frustrated"
  | "overwhelmed"
  | "bored"
  | "chaotic"
  | "confident"
  | "delulu"
  | "petty"
  | "dramatic"
  | "unbothered";

export function getMoodCaption(mood?: string | null): string {
  const m = (mood || "").toLowerCase() as MoodKey;

  const map: Partial<Record<MoodKey, string>> = {
    happy: "This is fine. Actually, this is great.",
    sad: "It be like that sometimes.",
    stressed: "Everything is on fire, but it’s fine.",
    angry: "I’m not mad, just disappointed. And mad.",
    tired: "Powered by vibes and caffeine.",
    excited: "Let’s make this a core memory.",
    romantic: "Soft launch of my feelings.",
    flirty: "This meme is a red flag and I support it.",
    annoyed: "I’m not arguing, I’m just explaining why I’m right.",
    frustrated: "Why is everything like this.",
    overwhelmed: "Too many tabs open in my brain.",

    // New moods
    bored: "I have nothing to do and somehow still no time.",
    chaotic: "I didn’t choose chaos. Chaos chose me.",
    confident: "I fear nothing. Except maybe my inbox.",
    delulu: "If delusion is a crime, lock me up.",
    petty: "I’m not petty. I’m strategically reactive.",
    dramatic: "This is not a big deal. But also it is.",
    unbothered: "Inner peace activated. Notifications ignored."
  };

  return map[m] || "Emotional OS: mood detected, chaos contained.";
}

export function getMoodStickers(mood?: string | null): string[] {
  const m = (mood || "").toLowerCase() as MoodKey;

  const map: Partial<Record<MoodKey, string[]>> = {
    happy: ["✨", "😄", "🌈"],
    sad: ["💧", "💔", "😢"],
    stressed: ["🔥", "💣", "🧨"],
    angry: ["💢", "😡", "🧨"],
    tired: ["😴", "☕", "🛌"],
    excited: ["🎉", "🚀", "⚡"],
    romantic: ["❤️", "💌", "🌹"],
    flirty: ["😉", "💋", "💘"],
    annoyed: ["🙄", "😑", "🧱"],
    frustrated: ["🤯", "💢", "🧨"],
    overwhelmed: ["🌊", "📚", "🌀"],

    // New moods
    bored: ["😐", "🕒", "💤"],
    chaotic: ["🌀", "⚡", "🔥"],
    confident: ["😎", "💪", "⭐"],
    delulu: ["🌈", "✨", "🦄"],
    petty: ["🧂", "😏", "📌"],
    dramatic: ["🎭", "💋", "🌧️"],
    unbothered: ["😌", "🌿", "🧘"]
  };

  return map[m] || ["✨", "🔥", "😂"];
}
