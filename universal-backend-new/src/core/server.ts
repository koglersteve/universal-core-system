import express from "express";
import helmet from "helmet";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import { loadConfig } from "./config/config";
import { createCoreRouter } from "./routes";
import { makeBasicChecks } from "./health/checks";
import { HealthMonitor } from "./health/monitor";

const config = loadConfig();
const logger = pino({ level: config.LOG_LEVEL });

export const createServer = () => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(
    pinoHttp({
      logger,
      autoLogging: config.NODE_ENV !== "test",
    })
  );

  // Health
  const healthMonitor = new HealthMonitor(makeBasicChecks());

  app.get("/health", async (_req, res) => {
    const snapshot = await healthMonitor.snapshot();
    const statusCode = snapshot.status === "up" ? 200 : 503;
    res.status(statusCode).json(snapshot);
  });

  // Core routes
  app.use("/api", createCoreRouter());

  // 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not found", path: req.path });
  });

  // Error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({ err }, "Unhandled error");
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
};

if (require.main === module) {
  const app = createServer();
  app.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT} (${config.NODE_ENV})`);
  });
}

