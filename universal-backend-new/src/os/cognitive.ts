export interface CognitiveState {
  focus: string;
  load: number;
}

const cognitive: CognitiveState = {
  focus: "idle",
  load: 0
};

export default cognitive;
