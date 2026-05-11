"use client";

import { LaffLabApi } from "@/lib/api";

export async function fetchDailyRitual() {
  return LaffLabApi.getRitual();
}

export async function setDailyRitualMessage(message: string) {
  return fetch("/api/daily-ritual", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  }).then((r) => r.json());
}
