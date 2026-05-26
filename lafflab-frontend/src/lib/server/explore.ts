import { LaffLabApi } from "@/lib/api";

export async function getExploreFeed() {
  return LaffLabApi.getExplore();
}
