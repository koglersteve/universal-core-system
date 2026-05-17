// src/config/config.ts

export const config = {
  appName: process.env.APP_NAME,

  env: process.env.NODE_ENV,
  osEnv: process.env.OS_ENV,

  port: process.env.PORT,

  database: {
    url: process.env.DATABASE_URL,
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    sessionCookieName: process.env.SESSION_COOKIE_NAME,
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(",").map(o => o.trim()),
  },

  frontend: {
    origin: process.env.FRONTEND_ORIGIN,
    lafflab: process.env.LAFFLAB_FRONTEND_URL,
  },

  public: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    frontendUrl: process.env.NEXT_PUBLIC_URL,
  },
};
