import InfluenceMap from "@components/ops/InfluenceMap";
import ErrorState from "@components/ui/ErrorState";
import { getInfluenceGraph } from "@lib/server/ops";

export default async function InfluenceMapPage() {
  try {
    const graph = await getInfluenceGraph();

    return (
      <div className="p-4">
        <InfluenceMap data={graph} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load influence map." />;
  }
}
