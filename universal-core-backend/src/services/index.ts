import { healthService } from "./health.service";
import { envService } from "./env.service";
import { logService } from "./log.service";
import { timeService } from "./time.service";

export const services = {
  health: healthService,
  env: envService,
  log: logService,
  time: timeService,
};
