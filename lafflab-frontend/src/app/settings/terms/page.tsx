import TermsContent from "@components/settings/TermsContent";
import SectionHeader from "@components/SectionHeader";

export default function TermsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Terms of Service" />
      <TermsContent />
    </div>
  );
}
