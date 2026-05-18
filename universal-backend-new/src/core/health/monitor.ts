import { databaseCheck, uptimeCheck, basicCheck } from "./checks";
import type { HealthStatus } from "./types";

export class KernelHealthMonitor {
  interval: number;
  timer: any = null;

  constructor(options: { interval: number }) {
    this.interval = options.interval;
  }

  async runChecks(): Promise<HealthStatus> {
    const checks = {
      ...(await basicCheck()),
      ...(await uptimeCheck()),
      ...(await databaseCheck())
    };

    return {
      status: "ok",
      timestamp: Date.now(),
      checks
    };
  }

  start() {
    this.timer = setInterval(async () => {
      const status = await this.runChecks();
      console.log("Health Monitor:", status);
    }, this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
  }
}
