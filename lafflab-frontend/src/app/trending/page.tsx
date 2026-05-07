import TrendingList from "@components/trending/TrendingList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getTrending } from "@lib/server/trending";

export default async function TrendingPage() {
  try {
    const items = await getTrending();

    if (!items || items.length === 0) {
      return (
        <EmptyState
          title="No Trending Posts"
          message="Check back soon for what's rising."
        />
      );
    }

    return (
      <div className="p-4">
        <TrendingList items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load trending posts." />;
  }
}
