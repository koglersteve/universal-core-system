"use client";

import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";

export function EmotionalHomeHeader() {
  const { dominantMood } = useEmotionalPhysics();

  const greetings: Record<string, string> = {
    happy: "You're glowing today.",
    sad: "I'm here with you.",
    stressed: "Let’s take a breath.",
    angry: "Let’s channel that safely.",
    tired: "Soft energy today.",
    excited: "Let’s ride the wave.",
    romantic: "Love is in the air.",
    flirty: "Feeling playful.",
    overwhelmed: "One step at a time."
  };

  const message = dominantMood
    ? greetings[dominantMood] || "How are you feeling?"
    : "How are you feeling?";

  return (
    <header className="emotional-home-header">
      <h1 className="home-title">Emotional OS</h1>
      <p className="home-greeting">{message}</p>
    </header>
  );
}
