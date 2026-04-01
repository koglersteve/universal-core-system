// src/lib/emotionalMultiverse/mergeWorlds.ts

export function mergeWorlds(worldA, worldB, options = {}) {
  if (!worldA || !worldB) throw new Error("Two worlds required");

  const {
    weightA = 0.5,
    weightB = 0.5,
    mergeType = "symmetric" // "symmetric" | "dominant" | "weighted"
  } = options;

  const id = crypto.randomUUID();
  const ts = Date.now();

  return {
    id,
    name: `${worldA.name}-${worldB.name}-merged`,
    createdAt: ts,

    mergedFrom: [worldA.id, worldB.id],
    mergeType,
    weights: { a: weightA, b: weightB },

    // Emotional vector blending
    vector: blendVectors(worldA.vector, worldB.vector, weightA, weightB),

    // Physics blending
    physics: {
      momentum: weighted(worldA.physics.momentum, worldB.physics.momentum, weightA, weightB),
      friction: weighted(worldA.physics.friction, worldB.physics.friction, weightA, weightB),
      decay: weighted(worldA.physics.decay, worldB.physics.decay, weightA, weightB),
      velocity: weighted(worldA.physics.velocity, worldB.physics.velocity, weightA, weightB)
    },

    // Identity + trait blending
    traits: mergeTraits(worldA.traits, worldB.traits),
    agents: mergeAgents(worldA.agents, worldB.agents),

    // Timeline merge + merge event
    history: [
      ...worldA.history,
      ...worldB.history,
      { type: "merge", ts, from: [worldA.id, worldB.id] }
    ].sort((a, b) => a.ts - b.ts)
  };
}

function blendVectors(a, b, wa, wb) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out = {};
  keys.forEach(k => {
    out[k] = weighted(a[k] ?? 0, b[k] ?? 0, wa, wb);
  });
  return out;
}

function mergeTraits(a, b) {
  return Array.from(new Set([...(a ?? []), ...(b ?? [])]));
}

function mergeAgents(a, b) {
  return Array.from(new Set([...(a ?? []), ...(b ?? [])]));
}

function weighted(a, b, wa, wb) {
  return a * wa + b * wb;
}
