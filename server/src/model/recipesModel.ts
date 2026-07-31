import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateRecipe, FullRecipe, Recipe, UpdateRecipe } from "../types/recipes.ts";
import type { RecipePage } from "../types/replies.ts";
import { getComponents } from './componentsModel.ts';

export async function getRecipe(id: string): Promise<FullRecipe> {
    const recipe = await database
        .select('id', 'name', 'method')
        .from('recipes')
        .where('id', id)
        .first();

    const components = await getComponents(recipe.id);

    return {
      name: recipe.name,
      method: recipe.method,
      components: components,
    };
}

export async function getRecipes(offset: number, pageSize: number): Promise<RecipePage> {
    const rows = await database
      .select('id', 'name', 'method')
      .from('recipes')
      .orderBy('name')
      .limit(pageSize + 1)
      .offset(offset);

    const hasMore = rows.length > pageSize;
    const recipes = rows.slice(0, pageSize);

    return {
      data: recipes,
      hasMore,
    };
}

export async function createRecipe({ name, method }: CreateRecipe) {
    const createdRecipe = {
      id: uuidv4(),
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

export async function deleteRecipe(id: string) {
    await database('recipes')
      .where({ id })
      .delete();
}