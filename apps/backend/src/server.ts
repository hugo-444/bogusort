import Fastify from "fastify";
import { env } from "./env";
import { registerHealthRoutes } from "./routes/health";
import { registerApiRoutes } from "./routes";

export function buildServer() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "development" ? "debug" : "info"
    }
  });

  app.register(registerHealthRoutes);
  app.register(registerApiRoutes);

  return app;
}

async function start() {
  const app = buildServer();

  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT
    });
    app.log.info(`API ready on http://${env.HOST}:${env.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

if (env.NODE_ENV !== "test") {
  start();
}

