"use client";

import { useMoodStore } from "@/state/useMoodStore";

export function MoodGreeting() {
  const mood = useMoodStore((state) => state.mood);

  const greetings: Record<string, string> = {
    happy: "You're glowing today.",
    sad: "Soft landing mode activated.",
    stressed: "Let’s slow the world down a bit.",
    angry: "Breathing room enabled.",
    tired: "Gentle mode online.",
    excited: "The world is wide open.",
    romantic: "Everything feels softer today.",
    flirty: "You’re trouble in the best way.",
    annoyed: "We’ll keep things simple.",
    frustrated: "Let’s untangle the knots.",
    overwhelmed: "One step at a time."
  };

  const text = greetings[mood] || "Welcome back.";

  return <div className="mood-greeting">{text}</div>;
}

