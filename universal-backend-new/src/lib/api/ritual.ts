import { apiPost } from "./client";

export function generateDailyRitual(mood?: string) {
  return apiPost("/daily-ritual/generate", { mood });
}
