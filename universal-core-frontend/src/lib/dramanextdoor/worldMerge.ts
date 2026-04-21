export function mergeWorlds(a: any, b: any, name: string) {
  return {
    id: crypto.randomUUID(),
    name,
    mood: ((a.mood ?? 50) + (b.mood ?? 50)) / 2,
    tension: ((a.tension ?? 0) + (b.tension ?? 0)) / 2,
    identity: b.identity ?? a.identity,
    traits: {
      ...(a.traits || {}),
      ...(b.traits || {}),
    },
    lineage: {
      from: [a.id, b.id],
      createdAt: Date.now(),
    },
  };
}
