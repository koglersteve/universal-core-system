"use client";

import { useRitualStore } from "@/state/useRitualStore";  // ← FIXED

export function TodayRitualCard() {
  const { todayRitual } = useRitualStore();  // ← FIXED (renamed from useRitual)

  if (!todayRitual) return null;

  return (
    <div className="ritual-card">
      <h3 className="ritual-title">Today’s Ritual</h3>
      <p className="ritual-name">{todayRitual.title}</p>
      <div className="ritual-desc">{todayRitual.description}</div>
    </div>
  );
}

