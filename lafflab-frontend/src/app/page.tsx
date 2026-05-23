import { LaffLabApi } from "@/lib/LaffLabApi";
import Feed from "@/components/feed/Feed";

export default async function HomePage() {
  const posts = await LaffLabApi.fetchFeed();

  return <Feed posts={posts} />;
}

