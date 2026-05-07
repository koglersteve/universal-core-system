import DraftList from "@components/creator/tools/DraftList";
import SectionHeader from "@components/SectionHeader";

export default function DraftsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Drafts" />
      <DraftList />
    </div>
  );
}
