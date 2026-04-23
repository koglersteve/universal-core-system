"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useMood } from "@/hooks/useMood";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useCrossApp } from "@/hooks/useCrossApp";

import { runScene } from "@/lib/dramanextdoor/runScene";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";
import { diffWorlds } from "@/lib/dramanextdoor/worldDiff";
import { mergeWorlds } from "@/lib/dramanextdoor/worldMerge";
import { useWorldTransition } from "@/lib/dramanextdoor/useWorldTransition";
import { useIdentityContinuity } from "@/lib/dramanextdoor/useIdentityContinuity";
import { useCanonicalization } from "@/lib/dramanextdoor/useCanonicalization";

import { SceneViewer } from "@/components/dramanextdoor/SceneViewer";
import { WorldSwitcher } from "@/components/dramanextdoor/WorldSwitcher";
import { RitualPanel } from "@/components/dramanextdoor/RitualPanel";
import { NotificationPanel } from "@/components/dramanextdoor/NotificationPanel";
import { IdentityContinuityPanel } from "@/components/dramanextdoor/IdentityContinuityPanel";
import { CanonicalTimelinePanel } from "@/components/dramanextdoor/CanonicalTimelinePanel";
import { WorldDiffMergePanel } from "@/components/dramanextdoor/WorldDiffMergePanel";
import { EmotionalEngineStatus } from "@/components/dramanextdoor/EmotionalEngineStatus";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token as string | undefined;

  // Emotional OS hooks
  const mood = useMood();
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const multiverse = useEmotionalMultiverse();
  const crossApp = useCrossApp();

  // Engines
  const ritualEngine = useRitualEngine();
  const notificationEngine = useNotificationEngine();
  const worldTransition = useWorldTransition();
  const identityContinuity = useIdentityContinuity();
  const canonicalization = useCanonicalization();

  // Scene state
  const [currentSceneId, setCurrentSceneId] = useState("intro");
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [sceneOutput, setSceneOutput] = useState<any>(null);

  // World diff/merge state
  const [worldA, setWorldA] = useState<string | null>(null);
  const [worldB, setWorldB] = useState<string | null>(null);
  const [mergeName, setMergeName] = useState("");
  const [diffResult, setDiffResult] = useState<any>(null);

  // World switching state
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);

  // Emotional context
  const ctx = {
    mood: mood?.value ?? 50,
    tension: physics?.tension ?? 0,
    identityState: identity?.state ?? "stable",
    worldName: multiverse?.currentWorld?.name ?? "default",
  };

  // Scene engine
  useEffect(() => {
    const result = runScene(currentSceneId, ctx);
    setSceneOutput(result);
    setCurrentBeatIndex(0);

    // Canonicalize on scene change
    canonicalization.record(ctx, identity, multiverse.currentWorld);

    if (result?.crossApp) {
      crossApp.route(result.crossApp.appId, result.crossApp.payload || {});
    }

    if (ctx.tension > 0.6) {
      notificationEngine.pushNotification(
        "Tension Rising",
        "Your emotional tension is increasing. Scenes may escalate.",
        undefined,
        +0.05
      );
    }

    if (ctx.mood < 25) {
      notificationEngine.pushNotification(
        "Low Mood Detected",
        "Your mood is dipping. Consider a grounding ritual.",
        +2,
        undefined
      );
    }
  }, [currentSceneId]);

  if (!sceneOutput) {
    return <div style={{ padding: "2rem", color: "#fff" }}>Loading scene…</div>;
  }

  const { scene, nextSceneId, updatedCtx } = sceneOutput;

  function handleNextBeat() {
    const beats = scene.beats || [];
    if (currentBeatIndex < beats.length - 1) {
      setCurrentBeatIndex((i) => i + 1);
    } else if (nextSceneId) {
      setCurrentSceneId(nextSceneId);
    }
  }

  function handleComputeDiff() {
    const a = multiverse.worlds.find((w) => w.id === worldA);
    const b = multiverse.worlds.find((w) => w.id === worldB);
    setDiffResult(diffWorlds(a, b));
  }

  function handleMergeWorlds() {
    const a = multiverse.worlds.find((w) => w.id === worldA);
    const b = multiverse.worlds.find((w) => w.id === worldB);
    const merged = mergeWorlds(a, b, mergeName || "Merged World");
    multiverse.addWorld(merged);
  }

  function handleSwitchWorld() {
    if (!selectedWorldId) return;

    const target = multiverse.worlds.find((w) => w.id === selectedWorldId);
    if (!target) return;

    identityContinuity.evaluate(target.id, identity);
    canonicalization.record(ctx, identity, multiverse.currentWorld);

    worldTransition.startTransition(() => {
      multiverse.setWorld(target.id);
      canonicalization.record(ctx, identity, target);
    });
  }

  return (
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        background: "#050509",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <SceneViewer
        scene={scene}
        currentBeatIndex={currentBeatIndex}
        onNextBeat={handleNextBeat}
        token={token ?? null}
      />

      <WorldSwitcher
        worlds={multiverse.worlds}
        selectedWorldId={selectedWorldId}
        onSelectWorld={setSelectedWorldId}
        onSwitchWorld={handleSwitchWorld}
        isTransitioning={worldTransition.isTransitioning}
      />

      <RitualPanel
        rituals={ritualEngine.rituals}
        completed={ritualEngine.completed}
        onComplete={ritualEngine.completeRitual}
      />

      <NotificationPanel notifications={notificationEngine.notifications} />

      <IdentityContinuityPanel report={identityContinuity.report} />

      <CanonicalTimelinePanel history={canonicalization.history} />

      <WorldDiffMergePanel
        worlds={multiverse.worlds}
        worldA={worldA}
        worldB={worldB}
        onSelectWorldA={setWorldA}
        onSelectWorldB={setWorldB}
        onDiff={handleComputeDiff}
        diffResult={diffResult}
        mergeName={mergeName}
        onChangeMergeName={setMergeName}
        onMerge={handleMergeWorlds}
      />

      <EmotionalEngineStatus updatedCtx={updatedCtx} />
    </div>
  );
}
