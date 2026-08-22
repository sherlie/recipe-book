import { v4 as uuidv4 } from "uuid";
import { database } from "../db.ts";
import type { CreateTag } from "../types/tags.ts";
import type { Knex } from "knex";

export async function getTag(id: string, conn?: Knex) {
  const tag = await (conn ?? database)
    .select("id", "name")
    .from("tags")
    .where("id", id)
    .first();

  return tag;
}

export async function getTags(prefix: string, conn?: Knex) {
  const tag = await (conn ?? database)
    .select("id", "name")
    .from("tags")
    .whereLike("name", `${prefix}%`);

  return tag;
}

export async function createTag({ name }: CreateTag) {
  const createdTag = {
    id: uuidv4(),
    name,
  };
  await database("tags").insert(createdTag);

  return createdTag;
}

export async function updateTag(
  id: string,
  { name }: CreateTag,
) {
  const editedTag = 
    await database("tags")
    .where({ id })
    .update({
        name,
    });
  return editedTag;
}

export async function deleteTag(id: string) {
  await database("tags").where({ id }).delete();
}