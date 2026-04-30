import { AutonomyPolicies } from "./policies";

export async function planNextAction(
  state: any,
  policies: AutonomyPolicies
): Promise<
  | { status: "idle"; reason: string }
  | { status: "execute"; action: any; args: any; goalId: string }
> {
  const goal = globalThis.goals.top();
  if (!goal) return { status: "idle", reason: "no_goals" };

  const allowed = policies.filterActions(goal, state);
  if (!allowed.length)
    return { status: "idle", reason: "no_allowed_actions" };

  const best = allowed[0];

  return {
    status: "execute",
    action: best,
    args: best.defaultArgs || {},
    goalId: goal.id,
  };
}
