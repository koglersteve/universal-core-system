import FeedList from "@/components/FeedList";
import { getFeed } from "@/lib/server/feed";

export default async function FeedPage() {
  const items = await getFeed();

  return (
    <div className="p-4">
      <FeedList items={items} />
    </div>
  );
}
