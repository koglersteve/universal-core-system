"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function TemplatesTool() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with LaffLabApi.getTemplates()
    setTimeout(() => {
      setTemplates([]);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) return <LoadingState message="Loading templates…" />;

  if (templates.length === 0) {
    return (
      <EmptyState
        title="No templates yet"
        description="Your clip templates will appear here."
      />
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Clip Templates</h1>
    </div>
  );
}
