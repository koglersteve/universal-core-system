"use client";

import { LaffLabApi } from "@/lib/api";

export async function fetchDailyRitual() {
  return LaffLabApi.getRitual();
}

export async function setDailyRitualMessage(msg: string) {
  return LaffLabApi.post("/ritual/update", { message: msg });
}

