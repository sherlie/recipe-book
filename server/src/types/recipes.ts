import { type Static, Type } from 'typebox'
import { Ingredient } from './ingredients.ts'

export const Component = Type.Object({
  id: Type.String(),
  recipeId: Type.String(),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
  ingredients: Type.Array(Ingredient),
})
export type Component = Static<typeof Component>

export const CreateComponent = Type.Omit(Component, ["id"])
export type CreateComponent = Static<typeof CreateComponent>

export const Recipe = Type.Object({
  id: Type.String(),
  name: Type.String(),
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
