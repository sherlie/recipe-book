import Fastify from 'fastify'
import { CreateRecipe, Page, Recipe, UpdateRecipe } from './types/recipes.ts';
import Type from 'typebox';
import { RecipeReply } from './types/replies.ts';

const fastify = Fastify({
  logger: true,
});

const PAGE_SIZE: number = 1;

const recipes: Recipe[] = [
  {
    id: "1",
    name: "lemon cookie",
    ingredients: [
      { amount: 100, unit: "g", name: "butter" },
      { amount: 150, unit: "g", name: "sugar" },
      { amount: 1, name: "lemon"},
    ],
    method: "",
  },
  {
    id: "2",
    name: "choco pie",
    ingredients: [
      { amount: 100, unit: "g", name: "butter" },
      { amount: 150, unit: "g", name: "sugar" },
      { amount: 30, unit: "g", name: "cocoa"},
      { amount: 2, name: "eggs"},
    ],
    method: "",
  }
];
let lastId = 2;

fastify.get<{ Querystring: { start: number }}>(
  '/recipes',
  {
    schema: {
      querystring: Type.Object({
        start: Type.Integer({ minimum: 0 }),
      }),
      response: {
        200: Page(Recipe),
      },
    }
  },
  async (request, reply) => {
  const start = Number(request.query.start);

  const end = start + PAGE_SIZE;

  const data = recipes.slice(start, end);

  reply.status(200);

  return {
    data,
    hasMore: end < recipes.length,
  }
})

fastify.get<{ Reply: RecipeReply }>('/recipes/:id', async (request, reply) => {
  const { id } = request.params as { id: string };

  const recipe = recipes.find(a => a.id === id);

  if (!recipe) {
    return reply.code(404).send({ success: false, message: 'Recipe not found' });
  }

  return { success: true, data: recipe};
})

fastify.put<{
  Params: { id: string }
  Body: UpdateRecipe
  Reply: RecipeReply,
}>(
  '/recipes/:id',
  {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: UpdateRecipe,
      response: {
        200: RecipeReply,
      },
    },
  },
  (request, reply) => {
    const { id } = request.params
    const { name, method } = request.body

    const recipe = recipes.find(a => a.id === id)

    if (!recipe) {
      reply.code(404);
      
      return { success: false, message: 'Recipe not found' };
    }

    const editedRecipe = {
      ...recipe,
      name,
      method,
    }

    return { success: true, data: editedRecipe };
  }
)

fastify.post<{ Body: CreateRecipe, Reply: Recipe }>(
  '/recipes',
  {
    schema: {
      body: CreateRecipe,
      response: {
        200: Recipe,
      },
    },
  },
  (request, reply) => {
    const { name, method, ingredients } = request.body;

    const recipe = { name, method, ingredients, id: `${++lastId}`};
    recipes.push(recipe);
    reply.status(200).send(recipe);
  }
)

fastify.delete<{
  Params: { id: string }
}>(
  '/recipes/:id',
  {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
    },
  },
  (request, reply) => {
    const { id } = request.params

    const recipe = recipes.find(a => a.id === id)

    if (!recipe) {
      reply.code(404);
      
      return { success: false, message: 'Recipe not found' };
    }
    recipes.splice(recipes.indexOf(recipe), 1);

    return { success: true, data: recipe };
  }
)

fastify.get<{ Body: CreateRecipe, Reply: Recipe }>(
  '/test',
  {
    schema: {
      body: CreateRecipe,
      response: {
        200: Recipe,
      },
    },
  },
  (request, reply) => {
    const { name, method, ingredients } = request.body;

    const recipe = { name, method, ingredients, id: `${++lastId}`};
    recipes.push(recipe);
    reply.status(200).send(recipe);
  }
)

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}