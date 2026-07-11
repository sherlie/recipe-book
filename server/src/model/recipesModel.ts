import { database } from "../db.ts";
import type { CreateRecipe, Recipe, UpdateRecipe } from "../types/recipes.ts";
import type { RecipePage } from "../types/replies.ts";

export async function getRecipe(id: string): Promise<Recipe> {
    const recipe = await database
        .select('id')
        .from('recipes')
        .where('id', id)
        .first();
    return recipe;
}

export async function getRecipes(pageNumber: number, pageSize: number): Promise<RecipePage> {
    const rows = await database
      .select('id', 'name')
      .from('recipes')
      .orderBy('name')
      .limit(pageSize + 1)
      .offset((pageNumber - 1) * pageSize);

    const hasMore = rows.length > pageSize;
    const recipes = rows.slice(0, pageSize);

    return {
      data: recipes,
      hasMore,
    };
}

export async function deleteRecipe(id: string) {
    await database('recipes')
      .where({ id })
      .delete();
}

export async function createRecipe({ name, method }: CreateRecipe) {
    const createdRecipe = {
      id: crypto.randomUUID(),
      name,
      method,
    };
    await database.transaction(async (trx) => {
        /* todo - handle ingredients & tags */
        await trx('recipes').insert(createdRecipe);
    });
    
    return createdRecipe;
}

export async function updateRecipe(id: string, { name, method }: UpdateRecipe) {
    const editedRecipe = await database('recipes')
      .where({ id })
      .update({
        name,
        method,
      });
    return editedRecipe;
}