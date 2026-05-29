import { Hono } from "hono";

const settings = new Hono();

// GET /core/settings
settings.get("/", (c) => {
  return c.json({
    theme: "light",
    version: "1.0.0",
    features: {
      feed: true,
      favorites: true,
      history: true,
      profile: true,
      search: true,
    },
  });
});

export default settings;
