import { type Static, Type } from 'typebox'
import { FullComponent } from './components.ts'

export const Recipe = Type.Object({
  id: Type.String(),
  name: Type.String(),
  method: Type.String(),
})
export type Recipe = Static<typeof Recipe>

export const LightRecipe = Type.Pick(Recipe, ["id", "name"])
export type LightRecipe = Static<typeof LightRecipe>

export const FullRecipe = Type.Object({
  id: Type.String(),
  name: Type.Optional(Type.String()),
  method: Type.String(),
  components: Type.Array(FullComponent),
  tags: Type.Optional(Type.Array(Type.String())),
})
export type FullRecipe = Static<typeof FullRecipe>

export const CreateRecipe = Type.Omit(Recipe, ["id"])
export type CreateRecipe = Static<typeof CreateRecipe>

export const UpdateRecipe = Type.Optional(CreateRecipe);
export type UpdateRecipe = Static<typeof UpdateRecipe>
