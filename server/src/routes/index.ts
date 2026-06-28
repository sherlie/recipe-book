import type { FastifyInstance } from "fastify";
import { getRecipes } from "./getRecipes.ts";
import { getRecipesId } from "./getRecipesId.ts";
import { putRecipes } from "./putRecipes.ts";
import { postRecipes } from "./postRecipes.ts";
import { deleteRecipes } from "./deleteRecipes.ts";

export async function routes(fastify: FastifyInstance) {
  fastify.route(getRecipes);
  fastify.route(getRecipesId);
  fastify.route(putRecipes);
  fastify.route(postRecipes);
  fastify.route(deleteRecipes);
}
