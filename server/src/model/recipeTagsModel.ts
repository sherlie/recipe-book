import { database } from "../db.ts";
import type { Knex } from "knex";
import type { Tag } from "../types/tags.ts";

export async function getRecipeTags(recipeId: string, conn?: Knex) {
  conn = conn ?? database;
  const recipeTags = await conn
    .select("id", "name")
    .from("recipe_tags")
    .join("tags", "tag_id", "=", "id")
    .where("recipe_id", recipeId)

  return recipeTags;
}

export async function createRecipeTags(
  recipeId: string,
  tags: Tag[],
  conn?: Knex,
) {
  const createdRecipeTags = [];
  for (const tag of tags) {
    createdRecipeTags.push({
      recipe_id: recipeId,
      tag_id: tag.id,
    });
  }

  await (conn ?? database)("recipe_tags").insert(createdRecipeTags);

  return createdRecipeTags;
}