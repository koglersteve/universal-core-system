// src/os/os.routes.ts
import { Hono } from "hono";
import { attention } from "./attention";
import { boundary } from "./boundary";
import { cognitive } from "./cognitive";
import { emotion } from "./emotion";
import { energy } from "./energy";
import { ethics } from "./ethics";
import { harmony } from "./harmony";
import { identity } from "./identity";
import { intent } from "./intent";
import { memory } from "./memory";
import { persona } from "./persona";
import { signal } from "./signal";
import { state } from "./state";
import { tempo } from "./tempo";
import { world } from "./world";

export const registerOSRoutes = (app: Hono) => {
  const os = new Hono();

  os.get("/", (c: any) => {
    const universeId = c.get("universeId");

    return c.json({
      message: "OS namespace online",
      canonical: true,
      version: "1.0.0",
      activeUniverse: universeId,
      modules: [
        "attention",
        "boundary",
        "cognitive",
        "emotion",
        "energy",
        "ethics",
        "harmony",
        "identity",
        "intent",
        "memory",
        "persona",
        "signal",
        "state",
        "tempo",
        "world",
      ],
    });
  });

  os.get("/health", (c: any) =>
    c.json({
      status: "ok",
      modules: 15,
      activeUniverse: c.get("universeId"),
      timestamp: Date.now(),
    })
  );

  os.route("/attention", attention);
  os.route("/boundary", boundary);
  os.route("/cognitive", cognitive);
  os.route("/emotion", emotion);
  os.route("/energy", energy);
  os.route("/ethics", ethics);
  os.route("/harmony", harmony);
  os.route("/identity", identity);
  os.route("/intent", intent);
  os.route("/memory", memory);
  os.route("/persona", persona);
  os.route("/signal", signal);
  os.route("/state", state);
  os.route("/tempo", tempo);
  os.route("/world", world);

  app.route("/os", os);
};
