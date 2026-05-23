import { LaffLabApi } from "@/lib/LaffLabApi";
import Feed from "@/components/feed/Feed";

export default async function FeedPage() {
  const feed = await LaffLabApi.fetchFeed();

  return (
    <div className="max-w-xl mx-auto">
      <Feed posts={feed} />
    </div>
  );
}
