import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateIngredient, FullIngredient, GroupedIngredients, UpdateIngredient } from '../types/ingredients.ts';

export async function getIngredient(id: string): Promise<FullIngredient> {
    const ingredient = await database
        .select('id', 'name', 'unit', 'amount')
        .from('ingredients')
        .where('id', id)
        .first();
    return ingredient;
}

export async function getIngredientsByComponent(componentId: string): Promise<FullIngredient[]> {
    const ingredients = await database
        .select('id', 'name', 'unit', 'amount')
        .from('ingredients')
        .where('component_id', componentId)
    return ingredients;
}

export async function getIngredientsByComponents(componentIds: string[]): Promise<GroupedIngredients> {
    if (componentIds.length === 0) {
        return {};
    }

    const ingredients = await database
        .select('id', 'name', 'unit', 'amount', 'component_id')
        .from('ingredients')
        .where('component_id', 'in', componentIds);

    const groupedIngredients: GroupedIngredients = {};
 
    for (const ingredient of ingredients) {
        (groupedIngredients[ingredient.component_id] ??= []).push({
            id: ingredient.id,
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount,
        });
    }

    return groupedIngredients;
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
