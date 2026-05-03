"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import { EmptyState, EmptyFeedIcon } from "@/components/ui/EmptyState";

export default function TemplatesTool() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      // TODO: wire real templates API
      setLoading(false);
    }

    loadTemplates();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white page-shell">
        <LoadingState message="Loading templates…" />
      </div>
    );
  }

  const hasTemplates = templates.length > 0;

  return (
    <div className="p-6 text-white space-y-6 page-shell">
      <h1 className="text-2xl font-bold">Templates</h1>

      {!hasTemplates && (
        <EmptyState
          title="No templates yet"
          subtitle="Create or import templates to speed up your creative workflow."
          icon={EmptyFeedIcon}
        />
      )}

      {hasTemplates && (
        <div className="space-y-4 animate-fadeIn">
          {/* TODO: render real templates list */}
        </div>
      )}
    </div>
  );
}
