import SectionHeader from "@components/SectionHeader";

export default function ForYouLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SectionHeader title="For You" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
