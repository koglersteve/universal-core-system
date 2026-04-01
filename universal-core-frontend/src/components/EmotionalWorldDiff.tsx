"use client";

interface EmotionalWorld {
  vector: Record<string, number>;
  physics: Record<string, number>;
}

export function EmotionalWorldDiff({
  worldA,
  worldB
}: {
  worldA: EmotionalWorld | null;
  worldB: EmotionalWorld | null;
}) {
  if (!worldA || !worldB) {
    return <div className="world-diff-empty">Select two worlds to compare.</div>;
  }

  const vectorDiff = diff(worldA.vector, worldB.vector);
  const physicsDiff = diff(worldA.physics, worldB.physics);

  return (
    <div className="world-diff">
      <h3 className="world-diff-title">World Diff</h3>

      <section className="world-diff-section">
        <h4>Emotional Vector</h4>
        {Object.entries(vectorDiff).map(([k, v]) => (
          <DiffRow key={k} label={k} value={v} />
        ))}
      </section>

      <section className="world-diff-section">
        <h4>Physics</h4>
        {Object.entries(physicsDiff).map(([k, v]) => (
          <DiffRow key={k} label={k} value={v} />
        ))}
      </section>
    </div>
  );
}

function diff(a: Record<string, number>, b: Record<string, number>) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: Record<string, number> = {};

  keys.forEach(k => {
    const av = a[k] ?? 0;
    const bv = b[k] ?? 0;
    out[k] = bv - av;
  });

  return out;
}

function DiffRow({ label, value }: { label: string; value: number }) {
  const color =
    value > 0 ? "var(--diff-positive)" :
    value < 0 ? "var(--diff-negative)" :
    "var(--diff-neutral)";

  return (
    <div className="diff-row">
      <span className="diff-label">{label}</span>
      <span className="diff-value" style={{ color }}>
        {value.toFixed(2)}
      </span>
    </div>
  );
}
