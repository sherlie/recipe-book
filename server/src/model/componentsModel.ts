import { v4 as uuidv4 } from "uuid";
import { database } from "../db.ts";
import type {
  CreateComponent,
  Component,
  UpdateComponent,
  FullComponent,
  DbComponent,
  PatchComponents,
} from "../types/components.ts";
import {
  createIngredients,
  deleteIngredients,
  getIngredientsByComponents,
  updateIngredients,
} from "./ingredientsModel.ts";
import type { Knex } from "knex";
import type {
  CreateIngredient,
} from "../types/ingredients.ts";

export async function getComponent(id: string): Promise<Component> {
  const component = await database
    .select("id", "name", "unit", "amount")
    .from("components")
    .where("id", id)
    .first();
  return component;
}

export async function getComponents(
  recipeId: string,
): Promise<FullComponent[]> {
  const components = await database
    .select("id", "name")
    .from("components")
    .where("recipe_id", recipeId);

  if (components.length === 0) {
    return [];
  }

  const ingredientsByComponent = await getIngredientsByComponents(
    components.map((component) => component.id),
  );

  return components.map((component) => ({
    ...component,
    ingredients: ingredientsByComponent[component.id] ?? [],
  }));
}

export async function createComponent(
  recipeId: string,
  { name }: CreateComponent,
) {
  const createdComponent = {
    id: uuidv4(),
    recipe_id: recipeId,
    name,
  };

  await database("components").insert(createdComponent);

  return createdComponent;
}

export async function createComponents(
  recipeId: string,
  components: CreateComponent[],
  conn?: Knex,
) {
  const createdComponents: DbComponent[] = [];
  const ingredients: Record<string, CreateIngredient[]> = {};
  for (const component of components) {
    const componentId = uuidv4();
    createdComponents.push({
      id: componentId,
      recipe_id: recipeId,
      name: component.name,
    });

    ingredients[componentId] = component.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }));
  }

  const connection = conn ?? database;
  await connection("components").insert(createdComponents);
  await createIngredients(ingredients, connection);

  return createdComponents;
}

export async function updateComponent(
  id: string,
  { recipeId, name }: UpdateComponent,
) {
  const editedComponent = await database("components").where({ id }).update({
    recipe_id: recipeId,
    name,
  });
  return editedComponent;
}

export async function updateComponents(
  patches: PatchComponents[],
  conn?: Knex,
): Promise<void> {
  if (patches.length === 0) {
    return;
  }

  const connection = conn ?? database;

  const ingredientsToAdd: Record<string, CreateIngredient[]> = {};
  const componentsToAdd: DbComponent[] = [];

  for (const patch of patches) {
    switch (patch.op) {
      case "add":
        for (const component of patch.components) {
          const componentId = uuidv4();
          componentsToAdd.push({
            id: componentId,
            recipe_id: patch.recipeId,
            name: component.name,
          });

          ingredientsToAdd[componentId] = component.ingredients.map(
            (ingredient) => ({
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
            }),
          );
        }
        await connection("components").insert(componentsToAdd);
        await createIngredients(ingredientsToAdd, connection);
        break;

      case "update":
        for (const component of patch.components) {
          const { id, recipeId, name } = component;

          await updateIngredients(component.patchIngredients, connection);

          await connection("components")
            .where("id", id)
            .update({
              ...(recipeId !== undefined && {
                component_id: recipeId,
              }),
              name,
            });
        }
        break;

      case "remove":
        if (patch.componentsIds.length > 0) {
          await connection("ingredients")
            .whereIn("id", patch.componentsIds)
            .delete();
        }
        break;
    }
  }
}

export async function deleteComponent(id: string) {
  await database("components").where({ id }).delete();
}

export async function deleteComponents(recipeId: string, conn?: Knex) {
  const connection = conn ?? database;

  const componentsIds = (
    await connection
      .select("id")
      .from("components")
      .where("recipe_id", recipeId)
  ).map((row) => row.id);

  console.log(recipeId, componentsIds);

  await connection("components").where("recipe_id", recipeId).delete();

  deleteIngredients(componentsIds, connection);
}
