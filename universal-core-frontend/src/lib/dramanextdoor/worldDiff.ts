export function diffWorlds(a: any, b: any) {
  if (!a || !b) return null;

  return {
    moodDelta: (b.mood ?? 0) - (a.mood ?? 0),
    tensionDelta: (b.tension ?? 0) - (a.tension ?? 0),
    identityShift: a.identity !== b.identity,
    traitChanges: {
      added: Object.keys(b.traits || {}).filter((t) => !a.traits?.[t]),
      removed: Object.keys(a.traits || {}).filter((t) => !b.traits?.[t]),
    },
  };
}
