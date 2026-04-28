import { Hono } from "hono";
import {
  attention,
  boundary,
  cognitive,
  emotion,
  energy,
  ethics,
  harmony,
  identity,
  intent,
  memory,
  persona,
  signal,
  state,
  tempo,
  world,
} from "../os";

export const registerOSRoutes = (app: Hono) => {
  const os = new Hono();

  // --- OS Root ---
  os.get("/", (c) => {
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

  // --- OS Health ---
  os.get("/health", (c) =>
    c.json({
      status: "ok",
      modules: 15,
      activeUniverse: c.get("universeId"),
      timestamp: Date.now(),
    })
  );

  // --- Mount OS Modules ---
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

  // --- Mount OS namespace ---
  app.route("/os", os);
};
