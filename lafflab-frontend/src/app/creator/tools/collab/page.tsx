"use client";

import { EmptyState, EmptyHistoryIcon } from "@/components/ui/EmptyState";

export default function CollaborationTool() {
  return (
    <div className="p-6 text-white space-y-6 page-shell">
      <h1 className="text-2xl font-bold">Collaboration</h1>

      <EmptyState
        title="Collaboration tools coming soon"
        subtitle="Invite collaborators, share drafts, and manage creative workflows from here."
        icon={EmptyHistoryIcon}
      />
    </div>
  );
}
