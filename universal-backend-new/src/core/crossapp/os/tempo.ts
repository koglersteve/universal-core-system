export type TempoSnapshot = {
  bpm: number;
  band: "slow" | "normal" | "fast";
};

export class Tempo {
  private static events: number[] = [];
  private static windowMs = 60_000;

  static markEvent(now: number = Date.now()) {
    this.events.push(now);
    const cutoff = now - this.windowMs;
    this.events = this.events.filter((t) => t >= cutoff);
  }

  static snapshot(now: number = Date.now()): TempoSnapshot {
    const cutoff = now - this.windowMs;
    const recent = this.events.filter((t) => t >= cutoff);
    const perMinute = recent.length;
    let band: TempoSnapshot["band"] = "normal";

    if (perMinute <= 5) band = "slow";
    else if (perMinute >= 20) band = "fast";

    return {
      bpm: perMinute,
      band,
    };
  }
}
