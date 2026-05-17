export const config = {
  port: process.env.PORT || 8080,

  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
  },
};
