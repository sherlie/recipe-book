import { Type, type Static, type TSchema } from "typebox";
import { Recipe } from "./recipes.ts";

export const SuccessReply = <T extends TSchema>(dataType: T) => Type.Object({
  success: Type.Literal(true),
  data: dataType,
})
export const ErrorReply = Type.Object({
  success: Type.Literal(false),
  message: Type.String(),
});
export const Reply = <T extends TSchema>(dataType: T) => Type.Union([SuccessReply(dataType), ErrorReply]);

export const RecipeReply = Reply(Recipe);
export type RecipeReply =  Static<typeof RecipeReply>;

export const Page = <T extends TSchema>(dataType: T) => Type.Object({
  data: Type.Array(dataType),
  hasMore: Type.Boolean(),
})

export const RecipePage = Page(Recipe);
export type RecipePage =  Static<typeof RecipePage>;

export const EmptyReply = Reply(Type.Null());
export type EmptyReply =  Static<typeof EmptyReply>;