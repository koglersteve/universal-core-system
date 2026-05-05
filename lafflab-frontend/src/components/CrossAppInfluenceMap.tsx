// src/components/CrossAppInfluenceMap.tsx

import { useEffect, useMemo, useState } from "react";
import type {
  ReactionEvent,
  PropagationAction,
  SurfaceId,
  ReactionChannel,
} from "@/types/os";

type PropagationLogEntry = {
  event: ReactionEvent;
  action: PropagationAction;
};

export default function CrossAppInfluenceMap() {
  const [log, setLog] = useState<PropagationLogEntry[]>([]);

  useEffect(() => {
    // Placeholder: attach to real stream later
    setLog([]);
  }, []);

  const grouped = useMemo(() => {
    const map: Record<SurfaceId, number> = {
      forYou: 0,
      trending: 0,
      following: 0,
      creatorHub: 0,
      global: 0,
    };

    log.forEach((entry) => {
      map[entry.action.targetSurface] += entry.action.weight;
    });

    return map;
  }, [log]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Cross‑App Influence Map</h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(grouped).map(([surface, score]) => (
          <div
            key={surface}
            className="p-3 rounded bg-gray-100 border border-gray-300"
          >
            <div className="font-medium">{surface}</div>
            <div className="text-xl font-bold">{score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
