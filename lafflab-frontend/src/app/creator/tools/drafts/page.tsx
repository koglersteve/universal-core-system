"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import { EmptyState, EmptyFeedIcon } from "@/components/ui/EmptyState";

export default function DraftsTool() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDrafts() {
      // TODO: wire real drafts API
      setLoading(false);
    }

    loadDrafts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white page-shell">
        <LoadingState message="Loading drafts…" />
      </div>
    );
  }

  const hasDrafts = drafts.length > 0;

  return (
    <div className="p-6 text-white space-y-6 page-shell">
      <h1 className="text-2xl font-bold">Drafts</h1>

      {!hasDrafts && (
        <EmptyState
          title="No drafts yet"
          subtitle="Start creating and your in‑progress work will appear here."
          icon={EmptyFeedIcon}
        />
      )}

      {hasDrafts && (
        <div className="space-y-4 animate-fadeIn">
          {/* TODO: render real drafts list */}
        </div>
      )}
    </div>
  );
}
