import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/index.ts";
import { initDatabase } from "./db.ts";

const fastify = Fastify({
  logger: true,
})
  .register(cors, { origin: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] })
  .register(routes)
  .register(initDatabase);

try {
  await fastify.listen({ host: "0.0.0.0", port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
