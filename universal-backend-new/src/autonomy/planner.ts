export async function planNextAction(state, policies) {
  const goal = state.goals[0];
  if (!goal) return { status: "idle", reason: "no_goals" };

  const allowed = policies.filterActions(goal, state);
  if (allowed.length === 0)
    return { status: "idle", reason: "no_allowed_actions" };

  const best = allowed[0]; // v1 heuristic: pick first safe action

  return {
    status: "execute",
    action: best,
    args: best.defaultArgs || {},
  };
}
