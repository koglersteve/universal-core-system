import { useState } from "react";
import { computeIdentityDrift, repairIdentity } from "./identityContinuity";

export function useIdentityContinuity() {
  const [lastIdentity, setLastIdentity] = useState<any>(null);
  const [report, setReport] = useState<any>(null);

  function evaluate(worldId: string, identity: any) {
    const drift = computeIdentityDrift(lastIdentity, identity);

    const repaired = drift > 0.5;

    const finalIdentity = repaired ? repairIdentity(identity) : identity;

    setReport({
      worldId,
      identityState: finalIdentity.state,
      drift,
      repaired,
    });

    setLastIdentity(finalIdentity);

    return finalIdentity;
  }

  return {
    report,
    evaluate,
  };
}
