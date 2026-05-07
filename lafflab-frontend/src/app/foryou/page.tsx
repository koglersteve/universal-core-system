import ForYouFeed from "@components/ForYouFeed";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getForYouFeed } from "@lib/server/feed";

export default async function ForYouPage() {
  try {
    const items = await getForYouFeed();

    if (!items || items.length === 0) {
      return (
        <EmptyState
          title="No Recommendations Yet"
          message="Engage with posts to personalize your feed."
        />
      );
    }

    return (
      <div className="p-4">
        <ForYouFeed items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load personalized feed." />;
  }
}
