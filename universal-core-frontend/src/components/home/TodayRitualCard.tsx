"use client";

import { useRitual } from "@/context/RitualContext";

export function TodayRitualCard() {
  const ritual = useRitual(); // { title, description }

  if (!ritual) return null;

  return (
    <div className="ritual-card">
      <h3 className="ritual-title">Today’s Ritual</h3>
      <p className="ritual-name">{ritual.title}</p>
      <div className="ritual-desc">{ritual.description}</div>
    </div>
  );
}
