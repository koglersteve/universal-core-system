import { LaffLabApi } from "@/lib/api";

export async function getFavorites() {
  return LaffLabApi.getFavorites();
}
