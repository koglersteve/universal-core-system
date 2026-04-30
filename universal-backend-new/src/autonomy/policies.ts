export class AutonomyPolicies {
  constructor(private config: any = {}) {}

  filterActions(goal: any, state: any) {
    return globalThis.actions
      .list()
      .filter((a: any) => a.preconditions(goal, state))
      .filter((a: any) => !a.risk?.high);
  }
}

export function loadPolicies() {
  return new AutonomyPolicies({
    maxDepth: 3,
    forbidden: ["modify_core", "self_rewrite"],
  });
}
