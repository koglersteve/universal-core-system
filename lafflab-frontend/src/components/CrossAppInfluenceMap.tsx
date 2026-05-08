// src/components/CrossAppInfluenceMap.tsx
"use client";

import { useMemo } from "react";
"use client";

import { useMemo } from "react";

type Props = {
  log: {
    app: string;
    influence: number;
  }[];
};

export default function CrossAppInfluenceMap({ log }: Props) {
  const grouped = useMemo(() => {
    const map: Record<string, number> = {};
    for (const entry of log) {
      map[entry.app] = (map[entry.app] ?? 0) + entry.influence;
    }
    return map;
  }, [log]);

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white">
      <h2 className="font-semibold mb-3 text-lg">Cross‑App Influence</h2>

      {Object.entries(grouped).map(([app, value]) => (
        <div key={app} className="flex justify-between py-1 text-white/80">
          <span>{app}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
