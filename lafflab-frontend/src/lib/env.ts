function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  siteUrl: getEnv("NEXT_PUBLIC_SITE_URL"),
  apiBaseUrl: getEnv("NEXT_PUBLIC_API_BASE_URL"),
  resendKey: getEnv("RESEND_API_KEY"),
  databaseUrl: getEnv("DATABASE_URL"),
};
