import { type Static, Type, Composite } from "typebox";
import {
  CreateIngredient,
  FullIngredient,
  PatchIngredients,
} from "./ingredients.ts";

export const Component = Type.Object({
  id: Type.String(),
  recipeId: Type.String(),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
});
export type Component = Static<typeof Component>;

export const UpdateComponent = Type.Object({
  id: Type.String(),
  recipeId: Type.Optional(Type.String()),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
  patchIngredients: Type.Array(PatchIngredients),
});
export type UpdateComponent = Static<typeof UpdateComponent>;

export const FullComponent = Composite(
  Component,
  Type.Object({
    ingredients: Type.Array(FullIngredient),
  }),
);
export type FullComponent = Static<typeof FullComponent>;

export const CreateComponent = Type.Object({
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
  ingredients: Type.Array(CreateIngredient),
});
export type CreateComponent = Static<typeof CreateComponent>;

export type DbComponent = {
  id: string;
  recipe_id: string;
  name: string | undefined;
};

const AddComponents = Type.Object({
  op: Type.Literal("add"),
  recipeId: Type.String(),
  components: Type.Array(CreateComponent),
});

const UpdateComponents = Type.Object({
  op: Type.Literal("update"),
  components: Type.Array(UpdateComponent),
});

const RemoveComponents = Type.Object({
  op: Type.Literal("remove"),
  componentsIds: Type.Array(Type.String()),
});

export const PatchComponents = Type.Union([
  AddComponents,
  UpdateComponents,
  RemoveComponents,
]);
export type PatchComponents = Static<typeof PatchComponents>;
