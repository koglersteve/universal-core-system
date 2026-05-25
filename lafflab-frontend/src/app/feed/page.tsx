import { LaffLabApi } from "@/lib/LaffLabApi";
import FeedList from "@/components/ui/lafflab/FeedList";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  // Server-side fetch for initial posts
  const initialFeed = await LaffLabApi.fetchFeed();

  return <FeedList initialPosts={initialFeed} />;
}
