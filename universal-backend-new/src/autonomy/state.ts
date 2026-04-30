export async function getSystemState() {
  return {
    memory: globalThis.memory?.getSnapshot?.() ?? null,
    mood: globalThis.emotion?.getCurrent?.() ?? null,
    persona: globalThis.persona?.getActive?.() ?? null,
    kernel: globalThis.kernel?.getStatus?.() ?? null,
    goals: globalThis.goals.list(),
  };
}
