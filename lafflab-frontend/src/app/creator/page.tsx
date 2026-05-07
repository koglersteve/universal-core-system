import CreatorDashboardCard from "@/components/CreatorDashboardCard";

export default function CreatorHomePage() {
  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-xl font-semibold">Creator Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CreatorDashboardCard
          title="Dashboard"
          description="Your creator overview"
          href="/creator/dashboard"
        />
        <CreatorDashboardCard
          title="New Post"
          description="Create new content"
          href="/creator/tools/new"
        />
        <CreatorDashboardCard
          title="Drafts"
          description="Continue working on drafts"
          href="/creator/tools/drafts"
        />
        <CreatorDashboardCard
          title="Templates"
          description="Use or customize templates"
          href="/creator/tools/templates"
        />
        <CreatorDashboardCard
          title="Collab"
          description="Collaborate with creators"
          href="/creator/tools/collab"
        />
        <CreatorDashboardCard
          title="Status"
          description="Submission status"
          href="/creator/tools/status"
        />
      </div>
    </div>
  );
}
