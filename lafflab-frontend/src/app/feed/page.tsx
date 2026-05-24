import { LaffLabApi } from "@/lib/LaffLabApi";
import FeedList from "@/components/ui/lafflab/FeedList";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const initialFeed = await LaffLabApi.fetchFeed();

  return (
    <div style={{ padding: "12px 12px 32px" }}>
      <FeedList initialPosts={initialFeed} loadMore={LaffLabApi.fetchFeed} />
    </div>
  );
}
