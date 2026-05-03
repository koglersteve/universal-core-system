"use client";

import { useEffect, useMemo, useState } from "react";

type PropagationLogEntry = {
  event: {
    id: string;
    postId: string;
    emoji: string;
    surface: string;
    createdAt: string;
    userId: string | null;
  };
  action: {
    targetSurface: string;
    channel: string;
    weight: number;
  };
  timestamp: string;
};

type Edge = {
  from: string;
  to: string;
  weight: number;
};

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
      if (!map.has(key)) {
        map.set(key, {
          from: entry.event.surface,
          to: entry.action.targetSurface,
          weight: 0,
        });
      }
      const edge = map.get(key)!;
      edge.weight += entry.action.weight;
    }

    return Array.from(map.values()).sort((a, b) => b.weight - a.weight);
  }, [log]);

  const nodes = useMemo(() => {
    const set = new Set<string>();
    edges.forEach((e) => {
      set.add(e.from);
      set.add(e.to);
    });
    return Array.from(set.values());
  }, [edges]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-[var(--text-md)]">
          Cross-App Influence Map
        </h2>
        <p className="text-white/60 text-[var(--text-xs)]">
          How emotional signals propagate between surfaces.
        </p>
      </div>

      {loading && (
        <p className="text-white/60 text-[var(--text-sm)]">
          Loading influence data…
        </p>
      )}

      {!loading && nodes.length === 0 && (
        <p className="text-white/60 text-[var(--text-sm)]">
          No propagation data yet. Once reactions flow, this map will light up.
        </p>
      )}

      {!loading && nodes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <h3 className="text-white/80 text-[var(--text-sm)] mb-2">
              Surfaces
            </h3>
            <div className="flex flex-wrap gap-2">
              {nodes.map((node) => (
                <span
                  key={node}
                  className="px-3 py-1 bg-white/10 rounded-full text-[var(--text-xs)] text-white/80"
                >
                  {node}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <h3 className="text-white/80 text-[var(--text-sm)] mb-2">
              Influence Edges
            </h3>
            <div className="space-y-1 max-h-64 overflow-y-auto text-[var(--text-xs)] text-white/70">
              {edges.map((edge) => (
                <div
                  key={`${edge.from}->${edge.to}`}
                  className="flex justify-between items-center px-2 py-1 bg-white/5 rounded"
                >
                  <span>
                    {edge.from} → {edge.to}
                  </span>
                  <span className="text-white/60">
                    weight: {edge.weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
