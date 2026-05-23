import { LaffLabApi } from "@/lib/api";

export async function getFeed() {
  const data = await LaffLabApi.fetchFeed();
  return data.posts ?? [];
}

export async function getForYouFeed() {
  const data = await LaffLabApi.fetchFeed({ app: "lafflab" });
  return data.posts ?? [];
}
