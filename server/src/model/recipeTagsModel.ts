import { database } from "../db.ts";
import type { Knex } from "knex";
import type { PatchTags, Tag } from "../types/tags.ts";

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


export async function updateRecipeTags(
  patches: PatchTags[],
  conn?: Knex,
): Promise<void> {
  if (patches.length === 0) {
    return;
  }

  const connection = conn ?? database;
  for (const patch of patches) {
    switch (patch.op) {
      case "add": {
        const recipeTags = patch.tags.map((tag) => ({
          recipe_id: patch.recipeId,
          tag_id: tag.id,
        }));

        if (recipeTags.length > 0) {
          await connection("recipe_tags").insert(recipeTags);
        }
        break;
      }

      case "remove":
        if (patch.tagIds.length > 0) {
          await connection("recipe_tags")
            .where("recipe_id", patch.recipeId)
            .whereIn("tag_id", patch.tagIds)
            .delete();
        }
        break;
    }
  }
}


export async function deleteRecipeTag(recipeId: string, tagId: string, conn?: Knex) {
  await (conn ?? database)("recipe_tags")
    .where("recipe_id", recipeId)
    .where("tag_id", tagId)
    .delete();
}

export async function deleteRecipeTags(recipeId: string, conn?: Knex) {
  await (conn ?? database)("recipe_tags")
    .where("recipe_id", recipeId)
    .delete();
}