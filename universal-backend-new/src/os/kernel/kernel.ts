import { state } from "@/os/state.js";

export function createKernel() {
  return {
    state,

    getEmotion() {
      return state.emotion;
    },

    getCognitive() {
      return state.cognitive;
    },

    getMemory() {
      return state.memory;
    },

    getBehavior() {
      return state.behavior;
    },

    getIntent() {
      return state.intent;
    },

    getIdentity() {
      return state.identity;
    }
  };
}
