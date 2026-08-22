import type { FastifyInstance } from "fastify";
import { getRecipes } from "./getRecipes.ts";
import { getRecipe } from "./getRecipe.ts";
import { putRecipe } from "./putRecipe.ts";
import { postRecipe } from "./postRecipe.ts";
import { deleteRecipe } from "./deleteRecipe.ts";
import { populate } from "./populate.ts";
import { populateTags } from "./populateTags.ts";
import { findTags } from "./getTags.ts";

export async function routes(fastify: FastifyInstance) {
  fastify.route(getRecipes);
  fastify.route(getRecipe);
  fastify.route(putRecipe);
  fastify.route(postRecipe);
  fastify.route(deleteRecipe);
  fastify.route(populate);
  fastify.route(populateTags);
  fastify.route(findTags);
}
