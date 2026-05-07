import CreatorDashboardCard from "@components/CreatorDashboardCard";
import SectionHeader from "@components/SectionHeader";

export default function CreatorPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Creator Home" />
      <CreatorDashboardCard />
    </div>
  );
}
