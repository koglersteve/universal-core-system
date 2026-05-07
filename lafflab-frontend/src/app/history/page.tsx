import HistoryList from "@components/history/HistoryList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { getHistory } from "@lib/server/history";

export default async function HistoryPage() {
  try {
    const items = await getHistory();

    if (!items || items.length === 0) {
      return (
        <EmptyState
          title="No History Yet"
          message="Your viewed posts will appear here."
        />
      );
    }

    return (
      <div className="p-4">
        <HistoryList items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load history." />;
  }
}
