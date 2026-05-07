import SectionHeader from "@components/SectionHeader";

export default function HistoryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SectionHeader title="History" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
