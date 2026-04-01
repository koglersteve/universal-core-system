// src/plugins/dramanextdoor/narrativeTemplates.ts

export type NarrativeContext = {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
};

type Template = (ctx: NarrativeContext) => string;

const baseOpeners: Template[] = [
  ({ world }) =>
    `You step outside into your neighborhood${world ? `, in World ${world}` : ""}.`,
  ({ world }) =>
    `The air feels heavier than usual${world ? ` in World ${world}` : ""}.`,
  ({ world }) =>
    `It’s just another day on your street${world ? ` in World ${world}` : ""}… or so it seems.`,
  ({ world }) =>
    `Something feels slightly off${world ? ` in this version of your world` : ""}.`
];

// --- Expanded Mood Beats ---
const moodBeats: Template[] = [
  ({ mood }) => {
    if (!mood) return "Something subtle shifts in the atmosphere.";

    const map: Record<string, string> = {
      angry: "Your patience is gone — every small thing feels like a spark.",
      frustrated: "You’re tired of letting things slide — today feels different.",
      stressed: "Your nerves are frayed, and the smallest noise feels too loud.",
      annoyed: "You’re already on edge, and the neighborhood isn’t helping.",
      overwhelmed: "Everything feels like too much — even the quiet moments.",
      bored: "You’re desperate for something — anything — to happen.",
      chaotic: "Your energy is unpredictable, and the world seems to match it.",
      petty: "You’re ready to notice — and judge — every tiny detail.",
      dramatic: "Every moment feels like it could turn into a monologue."
    };

    return map[mood] || "Your emotions are closer to the surface than usual.";
  }
];

// --- Expanded Trait Flavors ---
const traitFlavors: Template[] = [
  ({ trait }) => {
    const map: Record<string, string> = {
      calm: "Even so, a part of you stays grounded, watching it all unfold.",
      playful: "A mischievous part of you almost enjoys the chaos.",
      sensitive: "Every glance, every word, feels amplified and personal.",
      reactive: "You can feel yourself ready to snap at any moment.",
      dramatic: "You feel the urge to turn this into a full performance.",
      petty: "You’re cataloging every micro‑expression like evidence."
    };

    return map[trait || ""] || "";
  }
];

// --- Expanded Agent Twists ---
const agentTwists: Template[] = [
  ({ agent }) => {
    const map: Record<string, string> = {
      trickster: "Somewhere nearby, a trickster energy nudges things toward chaos.",
      guardian: "There’s a quiet, protective presence making sure things don’t go too far.",
      companion: "You’re not alone in this — someone is emotionally in your corner.",
      observer: "Someone watches quietly from a distance, taking everything in.",
      instigator: "Someone is definitely stirring the pot — and enjoying it."
    };

    return map[agent || ""] || "";
  }
];

// --- Expanded Closers ---
const closers: Template[] = [
  () =>
    "The moment hangs in the air, waiting to see whether this becomes a story you’ll tell later.",
  () =>
    "You can feel the scene building — but you still have a say in how it ends.",
  () =>
    "Somewhere between petty and profound, this moment asks: how dramatic will you let it become?",
  () =>
    "The neighborhood holds its breath, sensing something is about to shift."
];

// --- Utility ---
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Builder ---
export function buildNarrativeScene(ctx: NarrativeContext): string {
  const parts: string[] = [];

  parts.push(pick(baseOpeners)(ctx));
  parts.push(pick(moodBeats)(ctx));
  parts.push(pick(traitFlavors)(ctx));
  parts.push(pick(agentTwists)(ctx));
  parts.push(pick(closers)(ctx));

  return parts.filter(Boolean).join(" ");
}

