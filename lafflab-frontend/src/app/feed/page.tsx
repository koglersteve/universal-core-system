import { LaffLabApi } from "@/lib/LaffLabApi";
import Feed from "@/components/feed/Feed"; // or FeedList / ForYouFeed, etc.

export default async function FeedPage() {
  const feed = await LaffLabApi.fetchFeed();

  return (
    <div className="max-w-xl mx-auto">
      <Feed posts={feed} />
    </div>
  );
}
