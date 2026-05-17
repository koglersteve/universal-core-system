import { HealthStatus } from "./types";

export async function runHealthChecks(): Promise<HealthStatus> {
  const warnings: string[] = [];
  const critical: string[] = [];

  // Kernel status
  const kernelStatus = await globalThis.kernel?.getStatus?.();
  if (!kernelStatus) {
    critical.push("Kernel did not respond");
  }

  // OS sync
  const osState = await globalThis.os?.getState?.();
  if (!osState) {
    warnings.push("OS state unavailable");
  }

  // Memory engine
  const memorySnapshot = await globalThis.memory?.getSnapshot?.();
  if (!memorySnapshot) {
    warnings.push("Memory snapshot unavailable");
  }

  return {
    ok: warnings.length === 0 && critical.length === 0,
    warnings,
    critical,
  };
}
