import type { RouteOptions } from "fastify";
import { CreateRecipe, Recipe, UpdateRecipe } from "../types/recipes.ts";
import { connection } from "../db.ts";

type PostRecipeRoute = {
  Body: UpdateRecipe; 
};

export const postRecipes: RouteOptions = {
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

    const recipe = {
      id: crypto.randomUUID(),
      name: name,
      method: method,
    };

    await connection('recipes').insert(recipe);

    reply.status(200).send(recipe);
  }
};