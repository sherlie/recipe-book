import type { RouteOptions } from "fastify";
import { getRecipe as getRecipeModel } from "../model/recipesModel.ts";

export const getRecipe: RouteOptions = {
  method: "GET",
  url: "/recipes/:id",
  handler: async (request, reply) => {
    const { id } = request.params as { id: string };

    /* todo -- not a full recipe! */
    const recipe = await getRecipeModel(id);

    if (!recipe) {
      return reply
        .code(404)
        .send({ success: false, message: "Recipe not found" });
    }

    return { success: true, data: recipe };
  },
};
