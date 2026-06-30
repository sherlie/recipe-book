import type { RouteOptions } from "fastify";
import { connection } from "../db.ts";

export const getRecipesId: RouteOptions = {
  method: 'GET',
  url: '/recipes/:id',
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };

    /* todo -- not a full recipe! */
    const recipe = await connection
      .select('id', 'name', 'method')
      .from('recipes')
      .where('id', id)
      .first();

    if (!recipe) {
        return reply.code(404).send({ success: false, message: 'Recipe not found' });
    }

    return { success: true, data: recipe};
  },
};