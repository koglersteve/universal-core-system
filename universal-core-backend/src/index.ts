import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok", message: "Kernel online" };
});

app.listen({ port: Number(process.env.PORT) || 3000 }, () => {
  console.log("Kernel running");
});
