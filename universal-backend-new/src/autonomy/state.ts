export async function getSystemState() {
  return {
    memory: await globalThis.memory.getSnapshot(),
    mood: await globalThis.mood.getCurrent(),
    persona: await globalThis.persona.getActive(),
    kernel: await globalThis.kernel.getStatus(),
    goals: await globalThis.goals.getActiveGoals(),
  };
}
