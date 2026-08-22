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
