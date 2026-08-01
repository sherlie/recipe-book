import { type Static, Type, Composite } from 'typebox'
import { FullIngredient } from './ingredients.ts'

export const Component = Type.Object({
  id: Type.String(),
  recipeId: Type.String(),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
})
export type Component = Static<typeof Component>

export const CreateComponent = Type.Omit(Component, ["id"])
export type CreateComponent = Static<typeof CreateComponent>

export const UpdateComponent = Type.Object({
  id: Type.String(),
  recipeId: Type.Optional(Type.String()),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
})
export type UpdateComponent = Static<typeof UpdateComponent>

export const FullComponent = Composite(Component, Type.Object({
  ingredients: Type.Array(FullIngredient),
}));
export type FullComponent = Static<typeof FullComponent>