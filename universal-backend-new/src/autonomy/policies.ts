export class AutonomyPolicies {
  constructor(private config = {}) {}

  filterActions(goal, state) {
    return globalThis.actions
      .list()
      .filter(a => a.preconditions(goal, state))
      .filter(a => !a.risk?.high);
  }
}

export function loadPolicies() {
  return new AutonomyPolicies({
    maxDepth: 3,
    forbidden: ["modify_core", "self_rewrite"],
  });
}
