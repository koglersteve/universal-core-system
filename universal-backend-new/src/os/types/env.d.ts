// src/types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    APP_NAME: string;

    NODE_ENV: "development" | "production";
    OS_ENV: "dev" | "staging" | "prod";

    PORT: string;

    DATABASE_URL: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    SESSION_COOKIE_NAME: string;

    CORS_ORIGIN: string;
    FRONTEND_ORIGIN: string;
    LAFFLAB_FRONTEND_URL: string;

    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_URL: string;
  }
}
