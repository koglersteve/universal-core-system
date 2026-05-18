import type { MiddlewareHandler } from "hono";
import { nanoid } from "nanoid";
import {
  UniverseContext,
  UniverseTenant,
  UniverseApp,
  UniverseUser,
  UniverseLocale,
  UniverseFlags
} from "./universe.types";

function resolveTenant(host: string | null): UniverseTenant {
  if (!host) {
    return { id: "core", name: "Universal Core", slug: "core" };
  }
  return { id: "core", name: "Universal Core", slug: "core" };
}

function resolveApp(path: string): UniverseApp {
  if (path.startsWith("/lafflab")) {
    return { id: "lafflab", name: "LaffLab", slug: "lafflab", basePath: "/lafflab" };
  }
  if (path.startsWith("/dramanextdoor")) {
    return { id: "dramanextdoor", name: "Drama Next Door", slug: "dramanextdoor", basePath: "/dramanextdoor" };
  }
  if (path.startsWith("/mememycat")) {
    return { id: "mememycat", name: "Meme My Cat", slug: "mememycat", basePath: "/mememycat" };
  }
  if (path.startsWith("/mememydog")) {
    return { id: "mememydog", name: "Meme My Dog", slug: "mememydog", basePath: "/mememydog" };
  }
  return { id: "core", name: "Core Dashboard", slug: "dashboard", basePath: "/" };
}

function resolveUser(): UniverseUser {
  return { id: null, isAuthenticated: false, roles: [] };
}

function resolveLocale(): UniverseLocale {
  return { locale: "en-US", timezone: "America/New_York" };
}

function resolveFlags(appId: string): UniverseFlags {
  return {
    "feature.lafflab": appId === "lafflab",
    "feature.dramanextdoor": appId === "dramanextdoor"
  };
}

export const universeMiddleware: MiddlewareHandler = async (c, next) => {
  const host = c.req.header("host") || null;
  const path = c.req.path;

  const tenant = resolveTenant(host);
  const app = resolveApp(path);
  const user = resolveUser();
  const locale = resolveLocale();
  const flags = resolveFlags(app.id);

  const universe: UniverseContext = {
    tenant,
    app,
    user,
    locale,
    flags,
    requestId: nanoid(),
    channel: "web"
  };

  c.set("universe", universe);

  await next();
};
