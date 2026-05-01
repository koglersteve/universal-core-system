import { LaffLabApi } from "@/lib/api";

export async function fetchHistory() {
  return LaffLabApi.getHistory();
}

export async function addToHistory(jokeId: string) {
  return LaffLabApi.addHistory(jokeId);
}

export async function clearHistory() {
  return LaffLabApi.clearHistory();
}
