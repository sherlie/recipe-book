import Type, { type Static } from "typebox";

export const Tag = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 2, maxLength: 40 }),
});
export type Tag = Static<typeof Tag>;

export const CreateTag = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 40 }),
});
export type CreateTag = Static<typeof CreateTag>;

const AddTags = Type.Object({
  op: Type.Literal("add"),
  recipeId: Type.String(),
  tags: Type.Array(Tag),
});

const RemoveTags = Type.Object({
  op: Type.Literal("remove"),
  recipeId: Type.String(),
  tagIds: Type.Array(Type.String()),
});

export const PatchTags = Type.Union([
  AddTags,
  RemoveTags,
]);
export type PatchTags = Static<typeof PatchTags>;
