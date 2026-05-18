export interface MemoryItem {
  id: string;
  type: "event" | "thought" | "feeling";
  payload: any;
  createdAt: number;
  weight: number; // 0–1
}

export interface MemoryState {
  shortTerm: MemoryItem[];
  longTerm: MemoryItem[];
}

export const Memory = {
  default(): MemoryState {
    return { shortTerm: [], longTerm: [] };
  },

  add(state: MemoryState, item: Omit<MemoryItem, "createdAt">): MemoryState {
    const createdAt = Date.now();
    const full: MemoryItem = { ...item, createdAt };
    const shortTerm = [full, ...state.shortTerm].slice(0, 50);
    return { ...state, shortTerm };
  },

  consolidate(state: MemoryState): MemoryState {
    const now = Date.now();
    const threshold = now - 60 * 1000;
    const toPromote = state.shortTerm.filter((m) => m.createdAt < threshold && m.weight > 0.5);
    const remaining = state.shortTerm.filter((m) => !toPromote.includes(m));
    const longTerm = [...toPromote, ...state.longTerm].slice(0, 500);
    return { shortTerm: remaining, longTerm };
  }
};
