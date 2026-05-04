"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactionEvent, PropagationAction, SurfaceId, ReactionChannel } from "@/types/os";

type PropagationLogEntry = {
  event: ReactionEvent;
  action: PropagationAction;
  timestamp: string;
};

type Edge = { from: string; to: string; weight: number };

export default function CrossAppInfluenceMap() {
  const [log, setLog] = useState<PropagationLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/reactions/propagation-log");
      const json = await res.json();
      setLog(json.log || []);
      setLoading(false);
    }
    load();
  }, []);

  const edges: Edge[] = useMemo(() => {
    const map = new Map<string, Edge>();
    for (const entry of log) {
      const key = `${entry.event.surface}->${entry.action.targetSurface}`;
      if (!map.has(key)) map.set(key, { from: entry.event.surface, to: entry.action.targetSurface, weight: 0 });
      map.get(key)!.weight += entry.action.weight;
    }
    return Array.from(map.values()).sort((a, b) => b.weight - a.weight);
  }, [log]);

  const nodes = useMemo(() => {
    const set = new Set<string>();
    edges.forEach((e) => { set.add(e.from); set.add(e.to); });
    return Array.from(set.values());
  }, [edges]);

  return (
    <div className="space-y-3">
      {/* ... component JSX unchanged ... */}
    </div>
  );
}
