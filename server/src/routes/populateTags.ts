import type { RouteOptions } from "fastify";
import { EmptyReply } from "../types/replies.ts";
import { populateDBTags } from "../util/populateDB.ts";

export const populateTags: RouteOptions = {
  method: "POST",
  url: "/populatetags",
  schema: {
    response: {
      200: EmptyReply,
    },
  },
  handler: async () => {
    await populateDBTags();
  },
};
