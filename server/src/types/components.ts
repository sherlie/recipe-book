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