import { v4 as uuidv4 } from 'uuid';
import { database } from "../db.ts";
import type { CreateComponent, Component, UpdateComponent, FullComponent, DbComponent } from '../types/components.ts';
import { createIngredients, getIngredientsByComponents } from './ingredientsModel.ts';
import type { Knex } from 'knex';
import type { CreateIngredient } from '../types/ingredients.ts';

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

export async function createComponent(recipeId: string, { name }: CreateComponent) {
    const createdComponent = {
      id: uuidv4(),
      recipe_id: recipeId,
      name,
    };

    await database('components').insert(createdComponent);
    
    return createdComponent;
}

export async function createComponents(recipeId: string, components: CreateComponent[], conn?: Knex) {
    const createdComponents: DbComponent[] = [];
    const ingredients: Record<string, CreateIngredient[]> = {};
    for (const component of components) {
        const componentId = uuidv4();
        createdComponents.push({
            id: componentId,
            recipe_id: recipeId,
            name: component.name,
        });
        
        ingredients[componentId] = component.ingredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
        }));
    }

    const connection = conn ?? database;
    await connection('components').insert(createdComponents);
    await createIngredients(ingredients, connection)

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