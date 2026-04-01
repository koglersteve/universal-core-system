export const envService = {
  get(key: string, fallback?: string) {
    return process.env[key] ?? fallback;
  },
  require(key: string) {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
  }
};
