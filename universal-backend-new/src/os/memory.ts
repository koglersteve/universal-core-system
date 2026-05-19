export interface MemoryState {
  shortTerm: string[];
  longTerm: string[];
}

const memory: MemoryState = {
  shortTerm: [],
  longTerm: []
};

export default memory;

