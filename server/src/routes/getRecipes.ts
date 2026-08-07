import { getRecipes as getRecipesModel } from "../model/recipesModel.ts";
import { RecipePage } from "../types/replies.ts";
import { GetRecipesQuerystring, type Route } from "../types/queries.ts";

export const getRecipes: Route<{
    Querystring: GetRecipesQuerystring,
    Reply: RecipePage, 
}> = {
  method: 'GET',
  url: '/recipes',
  schema: {
    querystring: GetRecipesQuerystring,
    response: {
      200: RecipePage,
    },
  },
  handler: async (request, reply) => {
    /* todo - params */
    const { cursor, limit = 10} = request.query;

    const page = await getRecipesModel(limit, cursor);

    return page;
  },
};