import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export async function fetchJokes(): Promise<Joke[]> {
  return LaffLabApi.get("/jokes");
}

export async function fetchJoke(id: string): Promise<Joke> {
  return LaffLabApi.get(`/jokes/${id}`);
}
