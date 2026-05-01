import { LaffLabApi } from "@/lib/api";

export async function fetchJokes() {
  return LaffLabApi.getJokes();
}

export async function fetchJoke(id: string) {
  return LaffLabApi.getJoke(id);
}
