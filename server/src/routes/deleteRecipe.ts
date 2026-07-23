import type { RouteOptions } from "fastify";
import Type from "typebox";
import { UpdateRecipe } from "../types/recipes.ts";
import { EmptyReply, RecipeReply } from "../types/replies.ts";
import { getRecipe, deleteRecipe as deleteRecipeModel } from "../model/recipesModel.ts";

export const deleteRecipe: RouteOptions = {
  method: 'DELETE',
  url: '/recipes/:id',
  schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: EmptyReply,
    },
  },
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };

    const recipe = await getRecipe(id);

    if (!recipe) {
      reply.code(404);

      return { success: false, message: 'Recipe not found' };
    }

    deleteRecipeModel(id);

    return { success: true, data: null };
  }
};