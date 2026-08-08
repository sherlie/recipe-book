import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteGenericInterface,
  RouteOptions,
} from "fastify";
import Type, { type Static } from "typebox";

export type Route<
  R extends RouteGenericInterface,
  RawServer extends RawServerBase = RawServerDefault,
> = RouteOptions<
  RawServer,
  RawRequestDefaultExpression<RawServer>,
  RawReplyDefaultExpression<RawServer>,
  R
>;

export const GetRecipesQuerystring = Type.Object({
  cursor: Type.Optional(Type.String()),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
});
export type GetRecipesQuerystring = Static<typeof GetRecipesQuerystring>;
