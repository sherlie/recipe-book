import type { Component } from "../../domain/types";

interface IngredientsListProps {
  multiplier: number;
  components: Component[];
}

function IngredientsList({ multiplier, components }: IngredientsListProps) {
  return (
    <div>
      {components.map(component => 
        <div key={component.id}>
          <h4>{component.name}</h4>
          <ul>
            {component.ingredients.map(ingredient => 
              <li key={ingredient.id}>
                {multiplier * ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IngredientsList;
