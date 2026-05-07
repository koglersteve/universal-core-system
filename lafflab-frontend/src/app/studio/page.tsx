import StudioHome from "@components/studio/StudioHome";
import ErrorState from "@components/ui/ErrorState";
import { getCreatorDashboard } from "@lib/server/studio";

export default async function StudioPage() {
  try {
    const data = await getCreatorDashboard();

    return (
      <div className="p-4">
        <StudioHome data={data} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load creator studio." />;
  }
}
