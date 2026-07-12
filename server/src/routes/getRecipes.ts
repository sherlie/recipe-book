import type { RouteOptions } from "fastify";
import Type from "typebox";
import { getRecipes as getRecipesModel } from "../model/recipesModel.ts";
import { RecipePage } from "../types/replies.ts";

export const getRecipes: RouteOptions = {
  method: 'GET',
  url: '/recipes',
  schema: {
    querystring: Type.Object({
      start: Type.Integer({ minimum: 0 }),
    }),
    response: {
      200: RecipePage,
    },
  },
  handler: async (request, reply) => {
    /* todo - params */
    const offset = 0;
    const pageSize = 5;

    const page = await getRecipesModel(offset, pageSize);

    return page;
  },
};