"use client";

import { useMemo } from "react";
import type { SurfaceId, PropagationAction } from "@/types/os";

type Props = {
  log: {
    actions: PropagationAction[];
  }[];
};

const SURFACES: SurfaceId[] = [
  "forYou",
  "trending",
  "following",
  "creatorHub",
  "global",
];

export default function CrossAppInfluenceMap({ log }: Props) {
  const grouped = useMemo(() => {
    const map: Record<SurfaceId, number> = {
      forYou: 0,
      trending: 0,
      following: 0,
      creatorHub: 0,
      global: 0,
    };

    log.forEach((entry) => {
      entry.actions.forEach((action) => {
        const target = action.targetSurface;
        map[target] += action.weight;
      });
    });

    return map;
  }, [log]);

  return (
    <div className="grid grid-cols-5 gap-4">
      {SURFACES.map((s) => (
        <div key={s} className="p-4 bg-white rounded shadow">
          <div className="text-lg font-semibold capitalize">{s}</div>
          <div className="text-3xl font-bold">{grouped[s]}</div>
        </div>
      ))}
    </div>
  );
}
