import type { Update } from "vite";
import type {
  CreateComponent,
  CreateIngredient,
} from "../../domain/createTypes";
import type { Component, Ingredient, Tag } from "../../domain/types";
import type { AddComponents, AddIngredients, AddTags, PatchComponents, PatchIngredients, PatchTags, RemoveComponents, RemoveIngredients, RemoveTags, UpdateComponent, UpdateComponents, UpdateIngredient, UpdateIngredients } from "../../domain/updateTypes";

export function createIngredient(): CreateIngredient {
  return {
    amount: 1,
    unit: "",
    name: "",
  };
}

export function addIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: [...component.ingredients, createIngredient()],
        }
      : component,
  );
}

export function removeIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
  ingredientIndex: number,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: component.ingredients.filter(
            (_, j) => j !== ingredientIndex,
          ),
        }
      : component,
  );
}

export function updateIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
  ingredientIndex: number,
  updates: Partial<CreateIngredient>,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: component.ingredients.map((ingredient, j) =>
            j === ingredientIndex ? { ...ingredient, ...updates } : ingredient,
          ),
        }
      : component,
  );
}

export function createComponent(): CreateComponent {
  return {
    name: "",
    ingredients: [createIngredient()],
  };
}

export function addComponent(
  currentComponents: CreateComponent[],
): CreateComponent[] {
  return [...currentComponents, createComponent()];
}

export function updateComponent(
  currentComponents: CreateComponent[],
  index: number,
  updates: Partial<CreateComponent>,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === index ? { ...component, ...updates } : component,
  );
}

export function removeComponent(
  currentComponents: CreateComponent[],
  index: number,
): CreateComponent[] {
  return currentComponents.filter((_, i) => i !== index);
}

export function getTagsDiff(
  oldTags: Tag[] | undefined,
  newTags: Tag[],
): PatchTags[] {

  if (!oldTags) {
    return [];
  }

  const tagsToAdd = [];
  for (const tag of newTags) {
    if (!oldTags.some(oldTag => oldTag.id === tag.id)) {
      tagsToAdd.push(tag);
    }
  }

  const tagIdsToRemove = [];
  for (const tag of oldTags) {
    if (!newTags.some(newTag => newTag.id === tag.id)) {
      tagIdsToRemove.push(tag.id);
    }
  }

  const patchTags: PatchTags[] = [];
  
  if (tagsToAdd.length) {
    patchTags.push({
      op: "add",
      tags: tagsToAdd,
    } satisfies AddTags);
  }

  if (tagIdsToRemove.length) {
    patchTags.push({
      op: "remove",
      tagIds: tagIdsToRemove,
    } satisfies RemoveTags);
  }
  
  return patchTags;
}

export function getComponentsDiff(
  recipeId: string,
  oldComponents: Component[] | undefined,
  newComponents: CreateComponent[],
): PatchComponents[] {

  if (!oldComponents) {
    return [];
  }

  const componentsToAdd: CreateComponent[] = [];
  const componentsToUpdate: UpdateComponent[] = [];
  const componentIdsToRemove: string[] = [];

  for (const component of newComponents) {
      if (!component.id) {
        componentsToAdd.push(component);
      } else {
        const oldComponent = oldComponents.filter(oldComp => oldComp.id === component.id)[0];
        const patchIngredients = getIngredientsDiff(component.id, oldComponent.ingredients, component.ingredients);
        if (oldComponent.name !== component.name || patchIngredients.length) {
          const patch: UpdateComponent = { id: component.id };
          if (oldComponent.name !== component.name) {
            patch.name = component.name;
          }
          if (patchIngredients.length) {
            patch.patchIngredients = patchIngredients;
          }
          componentsToUpdate.push(patch);
        }
      }
  }

  for (const oldComponent of oldComponents) {
    if (!newComponents.some(newComponent => newComponent.id === oldComponent.id)) {
      componentIdsToRemove.push(oldComponent.id);
    }
  }

  const patchComponents: PatchComponents[] = [];

  if (componentsToAdd.length) {
    patchComponents.push({
      op: "add",
      recipeId: recipeId,
      components: componentsToAdd,
    } satisfies AddComponents);
  }

  if (componentsToUpdate.length) {
    patchComponents.push({
      op: "update",
      components: componentsToUpdate,
    } satisfies UpdateComponents);
  }
  if (componentIdsToRemove.length) {
    patchComponents.push({
      op: "remove",
      componentsIds: componentIdsToRemove,
    } satisfies RemoveComponents);
  }

  return patchComponents;
}



export function getIngredientsDiff(
  componentId: string,
  oldIngredients: Ingredient[] | undefined,
  newIngredients: CreateIngredient[],
): PatchIngredients[] {

  if (!oldIngredients) {
    return [];
  }

  const ingredientsToAdd: CreateIngredient[] = [];
  const ingredientsToUpdate: UpdateIngredient[] = [];
  const ingredientIdsToRemove: string[] = [];

  for (const ingredient of newIngredients) {
      if (!ingredient.id) {
        ingredientsToAdd.push(ingredient);
      } else {
        const oldIngredient = oldIngredients.find(oldIng => oldIng.id === ingredient.id);
        if (oldIngredient && !isEqualIngredient(oldIngredient, ingredient)) {
          const patch: UpdateIngredient = { id: ingredient.id };
          if (ingredient.amount !== oldIngredient.amount) {
            patch.amount = ingredient.amount;
          }
          if (ingredient.name !== oldIngredient.name) {
            patch.name = ingredient.name;
          }
          if (ingredient.unit !== oldIngredient.unit) {
            patch.unit = ingredient.unit;
          }
          ingredientsToUpdate.push(patch);
        }
      }
  }

  for (const oldIngredient of oldIngredients) {
    if (!newIngredients.some(newIngredient => newIngredient.id === oldIngredient.id)) {
      ingredientIdsToRemove.push(oldIngredient.id);
    }
  }

  const patchIngredients: PatchIngredients[] = [];

  if (ingredientsToAdd.length) {
    patchIngredients.push({
      op: "add",
      componentId: componentId,
      ingredients: ingredientsToAdd,
    } satisfies AddIngredients);
  }

  if (ingredientsToUpdate.length) {
    patchIngredients.push({
      op: "update",
      ingredients: ingredientsToUpdate,
    } satisfies UpdateIngredients);
  }
  if (ingredientIdsToRemove.length) {
    patchIngredients.push({
      op: "remove",
      ingredientsIds: ingredientIdsToRemove,
    } satisfies RemoveIngredients);
  }

  return patchIngredients;
}

function isEqualIngredient(ingredient1: CreateIngredient, ingredient2: CreateIngredient): boolean {
  return ingredient1.name === ingredient2.name 
    && ingredient1.amount === ingredient2.amount
    && ingredient1.unit === ingredient2.unit;
}