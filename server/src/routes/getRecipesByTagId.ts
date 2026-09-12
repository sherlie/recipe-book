import { getRecipesByTagId as getRecipesByTagIdModel } from "../model/recipesModel.ts";
import { RecipePage } from "../types/replies.ts";
import { GetRecipesQuerystring, type Route } from "../types/queries.ts";

export const getRecipesByTagId: Route<{
  Querystring: GetRecipesQuerystring;
  Reply: RecipePage;
}> = {
  method: "GET",
  url: "/recipes/tags/:id",
  schema: {
    querystring: GetRecipesQuerystring,
    response: {
      200: RecipePage,
    },
  },
  handler: async (request) => {
    const { id } = request.params as { id: string };
    const { cursor, limit = 10 } = request.query;

    const page = await getRecipesByTagIdModel(id, limit, cursor);

    return page;
  },
};
