import { LaffLabApi } from "@/lib/api";

export async function fetchHistory() {
  return LaffLabApi.getHistory();
}

export async function addToHistory(postId: string) {
  return LaffLabApi.addHistory(postId);
}

export async function clearHistory() {
  return LaffLabApi.clearHistory();
}
