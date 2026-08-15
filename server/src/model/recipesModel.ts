import { v4 as uuidv4 } from "uuid";
import { database } from "../db.ts";
import type {
  CreateRecipe,
  FullRecipe,
  UpdateRecipe,
} from "../types/recipes.ts";
import type { RecipePage } from "../types/replies.ts";
import {
  createComponents,
  deleteComponents,
  getComponents,
  updateComponents,
} from "./componentsModel.ts";
import type { Knex } from "knex";

export async function getRecipe(id: string, conn?: Knex): Promise<FullRecipe> {
  const recipe = await (conn ?? database)
    .select("id", "name", "method")
    .from("recipes")
    .where("id", id)
    .first();

  const components = await getComponents(recipe.id);

  return {
    id: recipe.id,
    name: recipe.name,
    method: recipe.method,
    components: components,
  };
}

export async function getRecipes(
  pageSize: number,
  cursor?: string,
): Promise<RecipePage> {
  const query = database
    .select("id", "name")
    .from("recipes")
    .orderBy("id")
    .limit(pageSize + 1);

  if (cursor) {
    query.where(database.raw("id"), ">=", cursor);
  }

  const rows = await query;

  const recipes = rows.slice(0, pageSize);
  const hasMore = rows.length > pageSize;
  const nextCursor = hasMore ? rows[rows.length - 1].id : undefined;

  return {
    items: recipes,
    nextCursor,
  };
}

export async function createRecipe({ name, method, components }: CreateRecipe) {
  const createdRecipe = {
    id: uuidv4(),
    name,
    method,
  };
  await database.transaction(async (trx) => {
    /* todo - handle tags */
    await trx("recipes").insert(createdRecipe);
    if (components) {
      console.log("creating components........", components)
      await createComponents(createdRecipe.id, components, trx);
    }
  });

  return createdRecipe;
}

export async function updateRecipe(
  id: string,
  { name, method, components }: UpdateRecipe,
) {
  const updatedRecipe = await database.transaction(async (trx) => {
    await trx("recipes").where({ id }).update({
      name,
      method,
    });
    if (components) {
      await updateComponents(components, trx);
    }

    return getRecipe(id, trx);
  });
  return updatedRecipe;
}

export async function deleteRecipe(id: string) {
  await database.transaction(async (trx) => {
    await trx("recipes").where({ id }).delete();

    await deleteComponents(id, trx);
  });
}
