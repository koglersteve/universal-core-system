import { LaffLabApi } from "@/lib/LaffLabApi";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";

type Props = { searchParams: { q?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q || "";
  const results = q ? await LaffLabApi.search(q) : [];

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <SearchBar initialQuery={q} />
      <SearchResults results={results} />
    </div>
  );
}


