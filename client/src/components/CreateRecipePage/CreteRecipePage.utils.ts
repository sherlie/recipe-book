import type {
  CreateComponent,
  CreateIngredient,
} from "../../domain/createTypes";

export function createIngredient(): CreateIngredient {
  return {
    amount: 1,
    unit: "",
    name: "",
  };
}

export function addIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: [...component.ingredients, createIngredient()],
        }
      : component,
  );
}

export function removeIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
  ingredientIndex: number,
): CreateComponent[]  {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: component.ingredients.filter(
            (_, j) => j !== ingredientIndex,
          ),
        }
      : component,
  );
}

export function updateIngredient(
  currentComponents: CreateComponent[],
  componentIndex: number,
  ingredientIndex: number,
  updates: Partial<CreateIngredient>,
): CreateComponent[]  {
  return currentComponents.map((component, i) =>
    i === componentIndex
      ? {
          ...component,
          ingredients: component.ingredients.map((ingredient, j) =>
            j === ingredientIndex ? { ...ingredient, ...updates } : ingredient,
          ),
        }
      : component,
  );
}

export function createComponent(): CreateComponent {
  return {
    name: "",
    ingredients: [createIngredient()],
  };
}

export function addComponent(
  currentComponents: CreateComponent[],
): CreateComponent[] {
  return [...currentComponents, createComponent()];
}

export function updateComponent(
  currentComponents: CreateComponent[],
  index: number,
  updates: Partial<CreateComponent>,
): CreateComponent[] {
  return currentComponents.map((component, i) =>
    i === index ? { ...component, ...updates } : component,
  );
}

export function removeComponent(
  currentComponents: CreateComponent[],
  index: number,
): CreateComponent[] {
  return currentComponents.filter((_, i) => i !== index);
}
