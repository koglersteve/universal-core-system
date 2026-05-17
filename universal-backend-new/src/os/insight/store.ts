import { Insight } from "./types";

const MAX_INSIGHTS = 200;

class InsightStore {
  private insights: Insight[] = [];

  add(insight: Insight) {
    this.insights.unshift(insight);
    if (this.insights.length > MAX_INSIGHTS) {
      this.insights.pop();
    }
  }

  list(limit = 50): Insight[] {
    return this.insights.slice(0, limit);
  }
}

export const insightStore = new InsightStore();
