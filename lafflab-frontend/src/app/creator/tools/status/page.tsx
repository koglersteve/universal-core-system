"use client";

import { EmptyState, EmptyHistoryIcon } from "@/components/ui/EmptyState";

export default function ProcessingStatusTool() {
  return (
    <div className="p-6 text-white space-y-6 page-shell">
      <h1 className="text-2xl font-bold">Processing Status</h1>

      <EmptyState
        title="No active processing"
        subtitle="When uploads or jobs are processing, you’ll see their status here."
        icon={EmptyHistoryIcon}
      />
    </div>
  );
}
