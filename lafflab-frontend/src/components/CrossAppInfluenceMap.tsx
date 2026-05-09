"use client";

import { useMemo } from "react";

export default function CrossAppInfluenceMap({ log }: { log: any[] }) {
  const grouped = useMemo(() => {
    const map: Record<string, number> = {
      forYou: 0,
      trending: 0,
      following: 0,
      creatorHub: 0,
      global: 0,
      notifications: 0,
    };

    log.forEach((entry) => {
      entry.actions.forEach((action: any) => {
        if (map[action.to] !== undefined) {
          map[action.to] += action.weight;
        }
      });
    });

    return map;
  }, [log]);

  return (
    <div className="space-y-2 text-white">
      {Object.entries(grouped).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
