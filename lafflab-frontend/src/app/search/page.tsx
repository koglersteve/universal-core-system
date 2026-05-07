import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { search } from "@/lib/server/search";

export default async function SearchPage({ searchParams }: any) {
  const query = searchParams?.q || "";
  const results = query ? await search(query) : [];

  return (
    <div className="p-4 space-y-6">
      <SearchBar />
      <SearchResults results={results} />
    </div>
  );
}

