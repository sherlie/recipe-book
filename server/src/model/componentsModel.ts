import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateComponent, Component, UpdateComponent } from '../types/components.ts';

export async function getComponent(id: string): Promise<Component> {
    const component = await database
        .select('id', 'name', 'unit', 'amount')
        .from('components')
        .where('id', id)
        .first();
    return component;
}

export async function getComponents(recipeId: string): Promise<Component[]> {
    const components = await database
        .select('id', 'name', 'unit', 'amount')
        .from('components')
        .where('recipe_id', recipeId)
    return components;
}

export async function createComponent({ name, recipeId, }: CreateComponent) {
    const createdComponent = {
      id: uuidv4(),
      recipe_id: recipeId,
      name,
    };

    await database('components').insert(createdComponent);
    
    return createdComponent;
}

export async function updateComponent(id: string, { recipeId, name }: UpdateComponent) {
    const editedComponent = await database('components')
      .where({ id })
      .update({
        recipe_id: recipeId,
        name,
      });
    return editedComponent;
}

export async function deleteComponent(id: string) {
    await database('components')
      .where({ id })
      .delete();
}