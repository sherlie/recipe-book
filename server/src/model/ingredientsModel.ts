import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateIngredient, FullIngredient, UpdateIngredient } from '../types/ingredients.ts';

export async function getIngredient(id: string): Promise<FullIngredient> {
    const ingredient = await database
        .select('id', 'name', 'unit', 'amount')
        .from('ingredients')
        .where('id', id)
        .first();
    return ingredient;
}

export async function getIngredients(componentId: string): Promise<FullIngredient[]> {
    const ingredients = await database
        .select('id', 'name', 'unit', 'amount')
        .from('ingredients')
        .where('component_id', componentId)
    return ingredients;
}

export async function createIngredient({ name, unit, amount, componentId }: CreateIngredient) {
    const createdIngredient = {
      id: uuidv4(),
      component_id: componentId,
      name,
      unit,
      amount,
    };

    await database('ingredients').insert(createdIngredient);
    
    return createdIngredient;
}

export async function updateIngredient(id: string, { componentId, name, unit, amount }: UpdateIngredient) {
    const editedIngredient = await database('ingredients')
      .where({ id })
      .update({
        component_id: componentId,
        name,
        unit,
        amount,
      });
    return editedIngredient;
}

export async function deleteIngredient(id: string) {
    await database('ingredients')
      .where({ id })
      .delete();
}
