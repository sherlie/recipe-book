import Fastify from 'fastify'
import { routes } from './routes/index.ts';
import { initDatabase } from './db.ts';
import { populateDB } from './util/populateDB.ts';

const fastify = Fastify({
  logger: true,
}).register(routes).register(initDatabase);

try {
  await fastify.listen({ host: '0.0.0.0', port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}