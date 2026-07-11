import type { RouteOptions } from "fastify";
import { CreateRecipe, Recipe, UpdateRecipe } from "../types/recipes.ts";
import { createRecipe } from "../model/recipesModel.ts";

type PostRecipeRoute = {
  Body: UpdateRecipe; 
};

export const postRecipe: RouteOptions = {
  method: 'POST',
  url: '/recipes',
  schema: {
    body: CreateRecipe,
    response: {
      200: Recipe,
    },
  },
  handler: async (request, reply) => {
    const { name, method } = request.body as PostRecipeRoute["Body"];

    /* todo - handle ingredients & tags */
    const recipe = await createRecipe({ name, method, ingredients: [] })

    reply.status(200).send(recipe);
  }
};