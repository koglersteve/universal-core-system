import CreateForm from "@components/CreateForm";
import SectionHeader from "@components/SectionHeader";
import ErrorState from "@components/ui/ErrorState";

export default function CreatePage() {
  try {
    return (
      <div className="p-4 space-y-6">
        <SectionHeader title="Create" />
        <CreateForm />
      </div>
    );
  } catch {
    return <ErrorState message="Unable to load create tools." />;
  }
}

