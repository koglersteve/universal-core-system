import SearchBar from "@components/search/SearchBar";
import SearchResults from "@components/search/SearchResults";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { searchAll } from "@lib/server/search";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || "";

  if (!query) {
    return (
      <div className="p-4 space-y-4">
        <SearchBar />
        <EmptyState title="Start Searching" message="Type something to begin." />
      </div>
    );
  }

  try {
    const results = await searchAll(query);

    if (!results || results.length === 0) {
      return (
        <div className="p-4 space-y-4">
          <SearchBar initialValue={query} />
          <EmptyState title="No Results" message="Try a different search." />
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        <SearchBar initialValue={query} />
        <SearchResults results={results} />
      </div>
    );
  } catch {
    return (
      <div className="p-4 space-y-4">
        <SearchBar initialValue={query} />
        <ErrorState message="Search failed." />
      </div>
    );
  }
}
