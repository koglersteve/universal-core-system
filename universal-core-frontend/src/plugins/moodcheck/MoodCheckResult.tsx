"use client";

import { useCrossApp } from "@/hooks/useCrossApp";

type Suggestion = {
  app: string;
  label: string;
  params?: Record<string, string>;
};

export function MoodCheckResult({ mood }: { mood: string }) {
  const { openApp } = useCrossApp();

  // Canonical Emotional Routing Map (full palette)
  const suggestions: Record<string, Suggestion> = {
    // Positive / high‑energy
    happy: {
      app: "lafflab",
      label: "Keep the good vibes going",
      params: { mood: "happy" }
    },
    excited: {
      app: "idlyily",
      label: "Share the excitement",
      params: { mood: "excited" }
    },
    flirty: {
      app: "idlyily",
      label: "Lean into the moment",
      params: { mood: "flirty" }
    },
    romantic: {
      app: "idlyily",
      label: "Let’s make something sweet",
      params: { mood: "romantic" }
    },

    // Low‑energy / comfort
    sad: {
      app: "mememydog",
      label: "Here’s something uplifting",
      params: { mood: "sad" }
    },
    tired: {
      app: "mememycat",
      label: "Soft, cozy cat energy",
      params: { mood: "tired" }
    },
    overwhelmed: {
      app: "mememycat",
      label: "Gentle comfort incoming",
      params: { mood: "overwhelmed" }
    },

    // Stress / tension
    stressed: {
      app: "lafflab",
      label: "A calming laugh might help",
      params: { mood: "stressed" }
    },
    angry: {
      app: "dramanextdoor",
      label: "Let’s dramatize this safely",
      params: { mood: "angry" }
    },
    frustrated: {
      app: "dramanextdoor",
      label: "Channel that frustration into a scene",
      params: { mood: "frustrated" }
    },
    annoyed: {
      app: "hoa-meme",
      label: "Turn that annoyance into a masterpiece",
      params: { mood: "annoyed" }
    }
  };

  const suggestion = suggestions[mood];

  return (
    <div className="moodcheck-result">
      <h2>Your Mood</h2>

      <div className="moodcheck-result-value">{mood}</div>

      {suggestion && (
        <button
          className="moodcheck-button"
          onClick={() => openApp(suggestion.app as any, suggestion.params)}
        >
          {suggestion.label}
        </button>
      )}
    </div>
  );
}
