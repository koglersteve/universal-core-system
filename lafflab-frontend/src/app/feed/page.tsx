import FeedList from "@components/FeedList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getFeed } from "@lib/server/feed";

export default async function FeedPage() {
  try {
    const items = await getFeed();

    if (!items || items.length === 0) {
      return <EmptyState title="Your Feed is Empty" message="Follow creators to fill it." />;
    }

    return (
      <div className="p-4">
        <FeedList items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load feed." />;
  }
}
