import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export async function fetchHistory(): Promise<Joke[]> {
  return LaffLabApi.get("/history");
}

export async function addToHistory(jokeId: string): Promise<void> {
  await LaffLabApi.post("/history/add", { jokeId });
}

export async function clearHistory(): Promise<void> {
  await LaffLabApi.post("/history/clear");
}
