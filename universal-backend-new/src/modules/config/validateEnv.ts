// src/config/validateEnv.ts

const required = [
  "APP_NAME",
  "NODE_ENV",
  "OS_ENV",
  "PORT",
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "SESSION_COOKIE_NAME",
  "CORS_ORIGIN",
  "FRONTEND_ORIGIN",
  "LAFFLAB_FRONTEND_URL",
  "NEXT_PUBLIC_API_BASE_URL",
  "NEXT_PUBLIC_URL",
];

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    for (const key of missing) console.error(` - ${key}`);
    process.exit(1);
  }
}
