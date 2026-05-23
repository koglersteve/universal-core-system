import { LaffLabApi } from "@/lib/LaffLabApi";
import TrendingList from "@/components/trending/TrendingList";

export default async function TrendingPage() {
  const items = await LaffLabApi.getTrending();

  return (
    <div className="max-w-xl mx-auto">
      <TrendingList posts={items} />
    </div>
  );
}
