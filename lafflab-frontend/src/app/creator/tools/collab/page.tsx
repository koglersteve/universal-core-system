"use client";

import EmptyState from "@/components/ui/EmptyState";

export default function CollaborationTool() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Collaboration</h1>

      <EmptyState
        title="Collaboration coming soon"
        description="Invite editors, share drafts, and manage team workflows."
      />
    </div>
  );
}
