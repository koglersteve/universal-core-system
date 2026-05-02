// src/lib/logger.ts

export const logger = {
  info: (...args: any[]) => {
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("[INFO]", new Date().toISOString(), ...args);
    }
  },

  warn: (...args: any[]) => {
    console.warn("[WARN]", new Date().toISOString(), ...args);
  },

  error: (...args: any[]) => {
    console.error("[ERROR]", new Date().toISOString(), ...args);
  },
};
