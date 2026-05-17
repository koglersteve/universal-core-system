import { runHealthChecks } from "./checks";
import { eventBus } from "../../os/eventbus/bus";

export class KernelHealthMonitor {
  private interval: NodeJS.Timeout | null = null;

  constructor(private config: { interval: number }) {}

  start() {
    console.log("[HealthMonitor] Starting...");
    this.interval = setInterval(() => this.tick(), this.config.interval);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
  }

  private async tick() {
    try {
      const status = await runHealthChecks();

      if (status.critical.length > 0) {
        await eventBus.emit("kernel:health_critical", {
          message: status.critical.join("; "),
        });
      } else if (status.warnings.length > 0) {
        await eventBus.emit("kernel:health_warning", {
          message: status.warnings.join("; "),
        });
      }
    } catch (err) {
      console.error("[HealthMonitor] Error:", err);
    }
  }
}

