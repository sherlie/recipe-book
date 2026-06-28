import Fastify, { type FastifyInstance } from 'fastify'
import { CreateRecipe, Page, Recipe, UpdateRecipe } from './types/recipes.ts';
import Type from 'typebox';
import { RecipeReply } from './types/replies.ts';
import { routes } from './routes/index.ts';
import { initDatabase } from './db.ts';

const fastify = Fastify({
  logger: true,
}).register(routes).register(initDatabase);

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}