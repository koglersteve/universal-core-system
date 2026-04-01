// src/lib/analytics/stabilityScore.ts
export function computeStabilityScore(metrics: {
  crashes: number;
  freezes: number;
  anrs: number;
  avgLatency: number;      // ms
  droppedFrames: number;   // count
}) {
  const {
    crashes = 0,
    freezes = 0,
    anrs = 0,
    avgLatency = 0,
    droppedFrames = 0
  } = metrics;

  // Core penalties (non-linear where appropriate)
  const crashPenalty = Math.min(crashes * 0.3, 1);
  const freezePenalty = Math.min(freezes * 0.2, 1);
  const anrPenalty = Math.min(anrs * 0.3, 1);

  // Latency: soft curve, max 0.1
  const latencyPenalty = Math.min(
    0.1 * (1 - Math.exp(-avgLatency / 1500)),
    0.1
  );

  // Dropped frames: soft curve, max 0.1
  const framePenalty = Math.min(
    0.1 * (1 - Math.exp(-droppedFrames / 100)),
    0.1
  );

  // Weighted stability score
  const score =
    1 -
    (crashPenalty +
      freezePenalty +
      anrPenalty +
      latencyPenalty +
      framePenalty);

  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, score));
}
