"use client";

import { useRouter } from "next/router";
import { useMood } from "@/hooks/useMood";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useCrossApp } from "@/hooks/useCrossApp";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token;

  // Emotional Engine Hooks
  const mood = useMood();
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const multiverse = useEmotionalMultiverse();
  const crossApp = useCrossApp();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>DramaNextDoor</h1>
      <p>Token: {token}</p>

      <p>DramaNextDoor is now running in Pages Router mode.</p>

      <div style={{ marginTop: "2rem" }}>
        <h3>Emotional Engine Status</h3>
        <pre style={{ background: "#111", padding: "1rem", borderRadius: "8px" }}>
{JSON.stringify(
  {
    mood: mood?.value,
    identity: identity?.state,
    physics: physics?.tension,
    world: multiverse?.currentWorld,
  },
  null,
  2
)}
        </pre>
      </div>
    </div>
  );
}
