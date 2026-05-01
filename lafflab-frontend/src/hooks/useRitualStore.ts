"use client";

// Backend‑driven ritual module (no Zustand)

export async function fetchDailyRitual() {
  const res = await fetch("/api/daily-ritual", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load daily ritual");
  return res.json();
}

export async function setDailyRitualMessage(msg: string) {
  const res = await fetch("/api/daily-ritual", {
    method: "POST",
    body: JSON.stringify({ message: msg }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) throw new Error("Failed to update ritual message");
  return res.json();
}
