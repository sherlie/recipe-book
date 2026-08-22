import { getTags } from "../model/tagModel.ts";
import { GetTagsQuerystring, type Route } from "../types/queries.ts";
import { TagsReply } from "../types/replies.ts";

export const findTags: Route<{
  Querystring: GetTagsQuerystring,
  Reply: TagsReply,
}> = {
  method: "GET",
  url: "/tags",
  schema: {
    querystring: GetTagsQuerystring,
    response: {
      200: TagsReply,
    },
  },
  handler: async (request) => {
    const namePrefix = request.query.name;
    const tags = await getTags(namePrefix);

    return { success: true, data: tags };
  },
};
