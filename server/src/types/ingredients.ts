import { type Static, Type } from 'typebox'

export const Ingredient = Type.Object({
  id: Type.String(),
  componentId: Type.String(),
  amount: Type.Number({ exclusiveMinimum: 0}),
  unit: Type.Optional(Type.String()),
  name: Type.String({ minLength: 2, maxLength: 40 }),
})
export type Ingredient = Static<typeof Ingredient>

export const CreateIngredient = Type.Omit(Ingredient, ["id", "componentId"])
export type CreateIngredient = Static<typeof CreateIngredient>

export const UpdateIngredient = Type.Object({
  componentId: Type.Optional(Type.String()),
  amount: Type.Optional(Type.Number({ exclusiveMinimum: 0})),
  unit: Type.Optional(Type.String()),
  name: Type.Optional(Type.String({ minLength: 2, maxLength: 40 })),
})
export type UpdateIngredient = Static<typeof UpdateIngredient>

export const FullIngredient = Type.Object({
  id: Type.String(),
  amount: Type.Number({ exclusiveMinimum: 0}),
  unit: Type.Optional(Type.String()),
  name: Type.String({ minLength: 2, maxLength: 40 }),
})
export type FullIngredient = Static<typeof FullIngredient>

export const GroupedIngredients = Type.Record(
  Type.String(),
  Type.Array(FullIngredient),
);
export type GroupedIngredients = Static<typeof GroupedIngredients>