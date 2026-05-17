export interface Goal {
  id: string;
  type: string;
  priority: number;
  payload?: any;
  createdAt: number;
  completed?: boolean;
}

class GoalManager {
  private goals: Goal[] = [];

  addGoal(type: string, priority = 1, payload = {}) {
    const goal: Goal = {
      id: crypto.randomUUID(),
      type,
      priority,
      payload,
      createdAt: Date.now(),
    };

    this.goals.push(goal);
    return goal;
  }

  getActiveGoals() {
    return this.goals.filter((g) => !g.completed);
  }

  getTopGoal() {
    return this.getActiveGoals().sort((a, b) => b.priority - a.priority)[0];
  }

  completeGoal(id: string) {
    const goal = this.goals.find((g) => g.id === id);
    if (goal) goal.completed = true;
  }

  clearCompleted() {
    this.goals = this.goals.filter((g) => !g.completed);
  }
}

export const goalManager = new GoalManager();
