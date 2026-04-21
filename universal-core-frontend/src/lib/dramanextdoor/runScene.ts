import { scenes } from "./scenes";
import { SceneContext } from "./sceneTypes";

export function runScene(sceneId: string, ctx: SceneContext) {
  const scene = scenes[sceneId];
  if (!scene) return null;

  // Apply emotional effects from beats
  let mood = ctx.mood;
  let tension = ctx.tension;

  for (const beat of scene.beats) {
    if (beat.moodEffect) mood += beat.moodEffect;
    if (beat.tensionEffect) tension += beat.tensionEffect;
  }

  // Apply scene-level emotional deltas
  if (scene.emotional.moodDelta) mood += scene.emotional.moodDelta;
  if (scene.emotional.tensionDelta) tension += scene.emotional.tensionDelta;

  const identityState = scene.emotional.identityShift || ctx.identityState;
  const worldName = ctx.worldName;

  const updatedCtx: SceneContext = {
    mood,
    tension,
    identityState,
    worldName,
  };

  // Determine next transition
  for (const t of scene.transitions) {
    if (t.condition(updatedCtx)) {
      return {
        scene,
        nextSceneId: t.targetScene,
        crossApp: t.crossApp || null,
        updatedCtx,
      };
    }
  }

  return { scene, nextSceneId: null, crossApp: null, updatedCtx };
}
