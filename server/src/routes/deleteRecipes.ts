import type { RouteOptions } from "fastify";
import Type from "typebox";
import { UpdateRecipe } from "../types/recipes.ts";
import { RecipeReply } from "../types/replies.ts";
import { connection } from "../db.ts";

export const deleteRecipes: RouteOptions = {
  method: 'DELETE',
  url: '/recipes/:id',
  schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: UpdateRecipe,
      response: {
        200: RecipeReply,
    },
  },
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };

    const recipe = await connection
      .select('id')
      .from('recipes')
      .where('id', id)
      .first();

    if (!recipe) {
      reply.code(404);

      return { success: false, message: 'Recipe not found' };
    }

    await connection('recipes')
      .where({ id })
      .delete();

    return { success: true, data: recipe };
  }
};