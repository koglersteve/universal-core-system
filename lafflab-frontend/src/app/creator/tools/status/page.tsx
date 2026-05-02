"use client";

import EmptyState from "@/components/ui/EmptyState";

export default function ProcessingStatusTool() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Processing Status</h1>

      <EmptyState
        title="No active jobs"
        description="Your processing queue will appear here."
      />
    </div>
  );
}
