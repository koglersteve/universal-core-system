import state, { OSState } from "./state.js";

export interface World {
  state: OSState;
}

const world: World = {
  state
};

export default world;
