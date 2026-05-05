"use client";

import { useMemo } from "react";
import type {
  ReactionEvent,
  PropagationAction,
  SurfaceId,
  ReactionChannel,
} from "@/types/os";

type Props = {
  log: {
    event: ReactionEvent;
    actions: PropagationAction[];
  }[];
};

const SURFACES: SurfaceId[] = [
  "forYou",
  "trending",
  "following",
  "creatorHub",
  "global",
  "notifications",
];

export default function CrossAppInfluenceMap({ log }: Props) {
  const grouped = useMemo(() => {
    const map: Record<SurfaceId, number> = {
      forYou: 0,
      trending: 0,
      following: 0,
      creatorHub: 0,
      global: 0,
      notifications: 0,
    };

    log.forEach((entry) => {
      entry.actions.forEach((action) => {
        map[action.to] += action.weight;
      });
    });

    return map;
  }, [log]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cross-App Influence Map</h2>

      <div className="grid grid-cols-2 gap-4">
        {SURFACES.map((surface) => (
          <div key={surface} className="p-3 border rounded">
            <div className="font-semibold capitalize">{surface}</div>
            <div className="text-2xl font-bold">{grouped[surface]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
