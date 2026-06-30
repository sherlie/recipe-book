import type { RouteOptions } from "fastify";
import { Page, Recipe } from "../types/recipes.ts";
import Type from "typebox";
import { connection } from "../db.ts";

export const getRecipes: RouteOptions = {
  method: 'GET',
  url: '/recipes',
  schema: {
    querystring: Type.Object({
      start: Type.Integer({ minimum: 0 }),
    }),
    response: {
      200: Page(Recipe),
    },
  },
  handler: async (request, reply) => {
    /* todo - params */
    const page = 1;
    const pageSize = 5;

    const rows = await connection
      .select('id', 'name')
      .from('recipes')
      .orderBy('name')
      .limit(pageSize + 1)
      .offset((page - 1) * pageSize);

    const hasMore = rows.length > pageSize;
    const recipes = rows.slice(0, pageSize);

    return {
      recipes,
      hasMore,
    };
  },
};