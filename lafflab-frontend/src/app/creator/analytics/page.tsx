import AnalyticsPanel from "@components/creator/AnalyticsPanel";
import SectionHeader from "@components/SectionHeader";

export default function CreatorAnalyticsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Creator Analytics" />
      <AnalyticsPanel />
    </div>
  );
}
