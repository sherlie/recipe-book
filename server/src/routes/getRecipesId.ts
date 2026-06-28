import type { RouteOptions } from "fastify";
import { recipes } from "./mockData.ts";

export const getRecipesId: RouteOptions = {
  method: 'GET',
  url: '/recipes/:id',
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };

    const recipe = recipes.find(a => a.id === id);

    if (!recipe) {
        return reply.code(404).send({ success: false, message: 'Recipe not found' });
    }

    return { success: true, data: recipe};
  },
};