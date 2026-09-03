import type { RouteOptions } from "fastify";
import Type from "typebox";
import { UpdateRecipe } from "../types/recipes.ts";
import { RecipeReply } from "../types/replies.ts";
import { getRecipe, updateRecipe } from "../model/recipesModel.ts";

type PutRecipeRoute = {
  Params: {
    id: string;
  };
  Body: UpdateRecipe;
};

export const putRecipe: RouteOptions = {
  method: "PUT",
  url: "/recipes/:id",
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
    const { name, method, components, tags } = request.body as PutRecipeRoute["Body"];

    const recipe = await getRecipe(id);

    if (!recipe) {
      reply.code(404);

      return { success: false, message: "Recipe not found" };
    }

    const editedRecipe = await updateRecipe(id, { name, method, components, tags });

    return { success: true, data: editedRecipe };
  },
};
