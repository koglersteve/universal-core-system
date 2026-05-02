"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function DraftsTool() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with LaffLabApi.getDrafts()
    setTimeout(() => {
      setDrafts([]);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) return <LoadingState message="Loading drafts…" />;

  if (drafts.length === 0) {
    return (
      <EmptyState
        title="No drafts yet"
        description="Your saved drafts will appear here."
      />
    );
  }

  return (
    <div className="p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Drafts</h1>
    </div>
  );
}
