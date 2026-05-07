import CreatorDashboard from "@components/creator/CreatorDashboard";
import SectionHeader from "@components/SectionHeader";

export default function CreatorDashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Dashboard" />
      <CreatorDashboard />
    </div>
  );
}


