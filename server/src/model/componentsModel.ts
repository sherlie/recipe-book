import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateComponent, Component, UpdateComponent, FullComponent } from '../types/components.ts';
import { getIngredientsByComponents } from './ingredientsModel.ts';

export async function getComponent(id: string): Promise<Component> {
    const component = await database
        .select('id', 'name', 'unit', 'amount')
        .from('components')
        .where('id', id)
        .first();
    return component;
}

export async function getComponents(recipeId: string): Promise<FullComponent[]> {
    const components = await database
        .select('id', 'name')
        .from('components')
        .where('recipe_id', recipeId);

    if (components.length === 0) {
        return [];
    }

    const ingredientsByComponent = await getIngredientsByComponents(
        components.map(component => component.id),
    );

    return components.map(component => ({
        ...component,
        ingredients: ingredientsByComponent[component.id] ?? [],
    }));
}

export async function createComponent({ name, recipeId }: CreateComponent) {
    const createdComponent = {
      id: uuidv4(),
      recipe_id: recipeId,
      name,
    };

    await database('components').insert(createdComponent);
    
    return createdComponent;
}

export async function createComponents(components: CreateComponent[]) {
    const createdComponents = components.map(component => ({
        id: uuidv4(),
        recipe_id: component.recipeId,
        name: component.name,
    }));

    await database('components').insert(createdComponents);

    return createdComponents;
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