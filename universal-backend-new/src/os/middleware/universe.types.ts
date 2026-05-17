export interface UniverseTenant {
  id: string;
  name: string;
  slug: string;
}

export interface UniverseApp {
  id: string;
  name: string;
  slug: string;
  basePath: string;
}

export interface UniverseUser {
  id: string | null;
  isAuthenticated: boolean;
  roles: string[];
}

export interface UniverseLocale {
  locale: string;
  timezone: string;
}

export interface UniverseFlags {
  [key: string]: boolean;
}

export interface UniverseContext {
  tenant: UniverseTenant;
  app: UniverseApp;
  user: UniverseUser;
  locale: UniverseLocale;
  flags: UniverseFlags;
  requestId: string;
  channel: "web" | "mobile" | "api" | "internal";
}
