import { FastifyInstance } from "fastify";

export async function registerApiRoutes(app: FastifyInstance) {
  app.register(async (api) => {
    api.get("/ping", async () => ({
      message: "pong",
      service: "inventory-backend"
    }));
  }, {
    prefix: "/api"
  });
}

