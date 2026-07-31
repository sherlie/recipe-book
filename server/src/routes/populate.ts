import type { RouteOptions } from "fastify";
import { EmptyReply } from "../types/replies.ts";
import { populateDB } from "../util/populateDB.ts";

export const populate: RouteOptions = {
  method: 'POST',
  url: '/populate',
  schema: {
    response: {
      200: EmptyReply,
    },
  },
  handler: async (request, reply) => {
    await populateDB();
  }
};