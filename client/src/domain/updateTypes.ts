import type { CreateComponent, CreateIngredient } from "./createTypes";
import type { Tag } from "./types";

export interface AddIngredients {
  op: "add",
  componentId: string;
  ingredients: CreateIngredient[];
}

export interface UpdateIngredient {
  id: string;
  amount?: number;
  unit?: string;
  name?: string;
}

export interface UpdateIngredients {
  op: "update",
  ingredients: UpdateIngredient[];
}

export interface RemoveIngredients {
  op: "remove",
  ingredientsIds: string[];
}

export type PatchIngredients = AddIngredients | UpdateIngredients | RemoveIngredients;

export interface AddComponents {
    op: "add",
    recipeId: string;
    components: CreateComponent[];
}

export interface UpdateComponent {
  id: string;
  name?: string;
  patchIngredients?: PatchIngredients[];
}

export interface UpdateComponents {
  op: "update",
  components: UpdateComponent[];
}

export interface RemoveComponents {
    op: "remove",
    componentsIds: string[];
}

export interface AddTags {
  op: "add",
  tags: Tag[];
}

export interface RemoveTags {
    op: "remove",
    tagIds: string[];
}

export type PatchTags = AddTags | RemoveTags;
export type PatchComponents = AddComponents | UpdateComponents | RemoveComponents;

export interface UpdateRecipe {
  id: string;
  name?: string;
  method?: string;
  tags?: PatchTags[];
  components?: PatchComponents[];
}