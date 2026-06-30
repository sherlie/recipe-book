import type { RouteOptions } from "fastify";
import Type from "typebox";
import { UpdateRecipe } from "../types/recipes.ts";
import { RecipeReply } from "../types/replies.ts";
import { connection } from "../db.ts";

type PutRecipeRoute = {
  Params: {
    id: string;
  };
  Body: UpdateRecipe; 
};

export const putRecipes: RouteOptions = {
  method: 'PUT',
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
  const { id } = request.params as PutRecipeRoute["Params"];
  const { name, method } = request.body as PutRecipeRoute["Body"];

    const recipe = await connection
      .select('id')
      .from('recipes')
      .where('id', id)
      .first();

    if (!recipe) {
      reply.code(404);
      
      return { success: false, message: 'Recipe not found' };
    }

    const editedRecipe = await connection('recipes')
      .where({ id })
      .update({
        name,
        method,
      });

    return { success: true, data: editedRecipe };
  }
};