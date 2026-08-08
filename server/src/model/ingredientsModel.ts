import { v4 as uuidv4 } from "uuid";
import { database } from "../db.ts";
import type {
  CreateIngredient,
  FullIngredient,
  GroupedIngredients,
  PatchIngredients,
  UpdateIngredient,
} from "../types/ingredients.ts";
import type { Knex } from "knex";

export async function getIngredient(id: string): Promise<FullIngredient> {
  const ingredient = await database
    .select("id", "name", "unit", "amount")
    .from("ingredients")
    .where("id", id)
    .first();
  return ingredient;
}

export async function getIngredientsByComponent(
  componentId: string,
): Promise<FullIngredient[]> {
  const ingredients = await database
    .select("id", "name", "unit", "amount")
    .from("ingredients")
    .where("component_id", componentId);
  return ingredients;
}

export async function getIngredientsByComponents(
  componentIds: string[],
): Promise<GroupedIngredients> {
  if (componentIds.length === 0) {
    return {};
  }

  const ingredients = await database
    .select("id", "name", "unit", "amount", "component_id")
    .from("ingredients")
    .where("component_id", "in", componentIds);

  const groupedIngredients: GroupedIngredients = {};

  for (const ingredient of ingredients) {
    (groupedIngredients[ingredient.component_id] ??= []).push({
      id: ingredient.id,
      name: ingredient.name,
      unit: ingredient.unit,
      amount: ingredient.amount,
    });
  }

  return groupedIngredients;
}

export async function createIngredient(
  componentId: string,
  { name, unit, amount }: CreateIngredient,
) {
  const createdIngredient = {
    id: uuidv4(),
    component_id: componentId,
    name,
    unit,
    amount,
  };

  await database("ingredients").insert(createdIngredient);

  return createdIngredient;
}

export async function createIngredients(
  ingredients: Record<string, CreateIngredient[]>,
  conn?: Knex,
) {
  const createdIngredients = Object.entries(ingredients).flatMap(
    ([componentId, ingredients]) =>
      ingredients.map((ingredient) => ({
        id: uuidv4(),
        component_id: componentId,
        name: ingredient.name,
        unit: ingredient.unit,
        amount: ingredient.amount,
      })),
  );

  await (conn ?? database)("ingredients").insert(createdIngredients);

  return createdIngredients;
}

export async function updateIngredient(
  id: string,
  { componentId, name, unit, amount }: UpdateIngredient,
) {
  const editedIngredient = await database("ingredients").where({ id }).update({
    component_id: componentId,
    name,
    unit,
    amount,
  });
  return editedIngredient;
}

export async function deleteIngredient(id: string) {
  await database("ingredients").where({ id }).delete();
}

export async function updateIngredients(
  patches: PatchIngredients[],
  conn?: Knex,
): Promise<void> {
  if (patches.length === 0) {
    return;
  }

  const connection = conn ?? database;
  for (const patch of patches) {
    switch (patch.op) {
      case "add": {
        const ingredients = patch.ingredients.map((ingredient) => ({
          id: uuidv4(),
          component_id: patch.componentId,
          name: ingredient.name,
          unit: ingredient.unit,
          amount: ingredient.amount,
        }));

        if (ingredients.length > 0) {
          await connection("ingredients").insert(ingredients);
        }
        break;
      }
      case "update":
        for (const ingredient of patch.ingredients) {
          const { id, componentId, ...updates } = ingredient;

          await connection("ingredients")
            .where("id", id)
            .update({
              ...(componentId !== undefined && {
                component_id: componentId,
              }),
              ...updates,
            });
        }
        break;

      case "remove":
        if (patch.ingredientsIds.length > 0) {
          await connection("ingredients")
            .whereIn("id", patch.ingredientsIds)
            .delete();
        }
        break;
    }
  }
}

export async function deleteIngredients(componentsIds: string[], conn?: Knex) {
  const connection = conn ?? database;
  await connection("ingredients")
    .whereIn("component_id", componentsIds)
    .delete();
}
