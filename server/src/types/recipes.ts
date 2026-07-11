import { type Static, type TSchema, Type } from 'typebox'

export const Ingredient = Type.Object({
  // recipeId: Type.String(),
  amount: Type.Number({ exclusiveMinimum: 0}),
  unit: Type.Optional(Type.String()),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
})
export type Ingredient = Static<typeof Ingredient>

export const Recipe = Type.Object({
  id: Type.String(),
  name: Type.String(),
  ingredients: Type.Array(Ingredient),
  method: Type.String(),
  tags: Type.Optional(Type.Array(Type.String())),
})
export type Recipe = Static<typeof Recipe>

export const LightRecipe = Type.Pick(Recipe, ["id", "name"])
export type LightRecipe = Static<typeof LightRecipe>

export const CreateRecipe = Type.Omit(Recipe, ["id"])
export type CreateRecipe = Static<typeof CreateRecipe>

export const UpdateRecipe = Type.Optional(CreateRecipe);
export type UpdateRecipe = Static<typeof UpdateRecipe>
