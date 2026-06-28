import type { RouteOptions } from "fastify";
import { lastId, recipes } from "./mockData.ts";
import { CreateRecipe, Recipe, UpdateRecipe } from "../types/recipes.ts";

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
    const { name, method, ingredients = [] } = request.body as PostRecipeRoute["Body"];

    const recipe = { name, method, ingredients, id: `${(recipes[recipes.length-1]?.id ?? 0 + 1)}`};
    recipes.push(recipe);
    reply.status(200).send(recipe);
  }
};