import { LaffLabApi } from "@/lib/LaffLabApi";
import ExploreFeed from "@/components/ExploreFeed";

export default async function ExplorePage() {
  const items = await LaffLabApi.getExplore();

  return (
    <div className="max-w-xl mx-auto">
      <ExploreFeed posts={items} />
    </div>
  );
}
