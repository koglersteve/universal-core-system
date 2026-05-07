import ExploreFeed from "@components/ExploreFeed";
import SectionHeader from "@components/SectionHeader";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getExploreFeed } from "@lib/server/explore";

export default async function ExplorePage() {
  try {
    const items = await getExploreFeed();

    if (!items || items.length === 0) {
      return <EmptyState title="Nothing to Explore" message="Check back soon." />;
    }

    return (
      <div className="p-4 space-y-6">
        <SectionHeader title="Explore" />
        <ExploreFeed items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load explore feed." />;
  }
}

