import { ContinuityState, ContinuitySnapshot, ContinuityArc } from "./continuityTypes";

const MAX_HISTORY = 500;

export class ContinuityStore {
  private state: ContinuityState = { history: [], arcs: [] };

  addSnapshot(snapshot: ContinuitySnapshot) {
    this.state.history.push(snapshot);
    if (this.state.history.length > MAX_HISTORY) {
      this.state.history.shift();
    }
    this.recomputeArcs();
  }

  private recomputeArcs() {
    const history = this.state.history;
    if (history.length < 5) return;

    const window = history.slice(-50); // last N points
    const moods = window.map((h) => h.mood);
    const vols = window.map((h) => h.volatility);

    const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;
    const avgVol = vols.reduce((a, b) => a + b, 0) / vols.length;

    const dominantMood =
      avgMood < 35 ? "low" : avgMood > 65 ? "high" : "neutral";

    const dominantVolatility =
      avgVol < 0.3 ? "stable" : avgVol > 0.7 ? "chaotic" : "mixed";

    const last = window[window.length - 1];

    const arc: ContinuityArc = {
      id: crypto.randomUUID(),
      start: window[0].timestamp,
      end: last.timestamp,
      dominantMood,
      dominantVolatility,
      dominantWorld: last.worldName,
    };

    this.state.arcs = [...this.state.arcs.filter(a => a.end < arc.start), arc];
  }

  getState(): ContinuityState {
    return this.state;
  }
}
