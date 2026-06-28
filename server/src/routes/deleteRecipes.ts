import type { RouteOptions } from "fastify";
import { recipes } from "./mockData.ts";
import Type from "typebox";
import { UpdateRecipe } from "../types/recipes.ts";
import { RecipeReply } from "../types/replies.ts";

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

    const recipe = recipes.find(a => a.id === id)

    if (!recipe) {
      reply.code(404);
      
      return { success: false, message: 'Recipe not found' };
    }
    recipes.splice(recipes.indexOf(recipe), 1);

    return { success: true, data: recipe };
  }
};