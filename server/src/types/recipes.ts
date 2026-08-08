import { type Static, Type } from "typebox";
import {
  CreateComponent,
  FullComponent,
  PatchComponents,
} from "./components.ts";

export const Recipe = Type.Object({
  id: Type.String(),
  name: Type.String(),
  method: Type.String(),
});
export type Recipe = Static<typeof Recipe>;

export const LightRecipe = Type.Pick(Recipe, ["id", "name"]);
export type LightRecipe = Static<typeof LightRecipe>;

export const FullRecipe = Type.Object({
  id: Type.String(),
  name: Type.String(),
  method: Type.String(),
  components: Type.Array(FullComponent),
  tags: Type.Optional(Type.Array(Type.String())),
});
export type FullRecipe = Static<typeof FullRecipe>;

export const CreateRecipe = Type.Partial(
  Type.Object({
    name: Type.String(),
    method: Type.String(),
    components: Type.Array(CreateComponent),
    tags: Type.Array(Type.String()),
  }),
);
export type CreateRecipe = Static<typeof CreateRecipe>;

export const UpdateRecipe = Type.Partial(
  Type.Object({
    name: Type.String(),
    method: Type.String(),
    components: Type.Array(PatchComponents),
    tags: Type.Array(Type.String()),
  }),
);
export type UpdateRecipe = Static<typeof UpdateRecipe>;
