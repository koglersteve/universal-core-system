"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMoodCaption } from "@/lib/memeemotions";

type CoupleMoodProps = {
  mood?: string;
  partnerMood?: string;
  world?: string;
  trait?: string;
  agent?: string;
};

export function CoupleMoodScreen() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const partnerMood = params.get("partnerMood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const [banner, setBanner] = useState<string | null>(null);
  const [combinedMessage, setCombinedMessage] = useState<string | null>(null);

  // Mood banner for the primary user
  useEffect(() => {
    if (!mood) return;

    const moodMessages: Record<string, string> = {
      excited: "You’re glowing — let’s see how that mixes with your partner.",
      flirty: "The energy is playful — perfect for connection.",
      romantic: "Soft hearts, warm vibes — let’s lean in.",
      happy: "You’re in a good place — let’s build on it.",
      tired: "Gentle energy today — let’s keep things soft.",
      overwhelmed: "Let’s slow things down together.",
      bored: "Maybe the spark just needs a nudge.",
      chaotic: "Chaotic energy detected — let’s see how it blends.",
      dramatic: "This could turn into a whole moment."
    };

    setBanner(moodMessages[mood] || null);
  }, [mood]);

  // Combined couple mood synthesis
  useEffect(() => {
    if (!mood || !partnerMood) return;

    const synthesis = synthesizeCoupleMood(mood, partnerMood);
    setCombinedMessage(synthesis);
  }, [mood, partnerMood]);

  const caption = mood ? getMoodCaption(mood) : null;

  return (
    <div className="couplemood-container">
      {banner && (
        <div className="couplemood-banner">
          {banner}
        </div>
      )}

      <div className="couplemood-card">
        <h2>Your Mood</h2>
        <p>{mood || "Unknown"}</p>

        <h2>Partner’s Mood</h2>
        <p>{partnerMood || "Unknown"}</p>

        {combinedMessage && (
          <div className="couplemood-synthesis">
            <h3>Shared Vibe</h3>
            <p>{combinedMessage}</p>
          </div>
        )}

        {caption && (
          <p className="couplemood-caption">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

// -----------------------------
// Couple Mood Synthesis Engine
// -----------------------------
function synthesizeCoupleMood(m1: string, m2: string): string {
  const pair = `${m1}-${m2}`;

  const map: Record<string, string> = {
    "excited-excited": "Both of you are buzzing — perfect for a shared adventure.",
    "excited-tired": "One spark, one soft vibe — balance incoming.",
    "romantic-romantic": "This is peak cozy‑movie‑night energy.",
    "romantic-happy": "Warm, open, and connected — a great moment to share.",
    "flirty-flirty": "The chemistry is definitely mutual.",
    "chaotic-chaotic": "This could be fun… or a small disaster. Either way, memorable.",
    "chaotic-tired": "One whirlwind, one blanket — proceed gently.",
    "overwhelmed-romantic": "One heart is heavy, one is open — support flows naturally.",
    "bored-excited": "One spark can pull the other into motion.",
    "dramatic-romantic": "This could turn into a whole cinematic moment."
  };

  return (
    map[pair] ||
    map[`${m2}-${m1}`] || // symmetric fallback
    "Your moods blend into something uniquely yours."
  );
}
