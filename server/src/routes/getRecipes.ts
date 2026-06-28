import type { RouteOptions } from "fastify";
import { Page, Recipe } from "../types/recipes.ts";
import { PAGE_SIZE, recipes } from "./mockData.ts";
import Type from "typebox";

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
    const { start } = request.query as { start: number };

    const end = start + PAGE_SIZE;
    const data = recipes.slice(start, end);

    reply.status(200);

    return {
      data,
      hasMore: end < recipes.length,
    };
  },
};