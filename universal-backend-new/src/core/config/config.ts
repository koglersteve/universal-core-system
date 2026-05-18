import { z } from "zod";

const ConfigSchema = z.object({
  PORT: z.string().optional(),
});

export const config = {
  port: process.env.PORT ?? "8080",
};
