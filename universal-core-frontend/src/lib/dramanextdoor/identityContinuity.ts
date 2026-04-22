export interface IdentityContinuityReport {
  worldId: string;
  identityState: string;
  drift: number;
  repaired: boolean;
}

export function computeIdentityDrift(prevIdentity: any, nextIdentity: any) {
  if (!prevIdentity || !nextIdentity) return 0;

  let drift = 0;

  if (prevIdentity.state !== nextIdentity.state) drift += 0.4;

  const prevTraits = prevIdentity.traits || {};
  const nextTraits = nextIdentity.traits || {};

  const allTraits = new Set([...Object.keys(prevTraits), ...Object.keys(nextTraits)]);

  for (const t of allTraits) {
    if (prevTraits[t] !== nextTraits[t]) drift += 0.1;
  }

  return Math.min(drift, 1);
}

export function repairIdentity(identity: any) {
  return {
    ...identity,
    state: "stable",
  };
}
