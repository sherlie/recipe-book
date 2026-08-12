import type { Component } from "../../domain/types";

interface IngredientsListProps {
  components: Component[];
}

function IngredientsList({ components }: IngredientsListProps) {

  return (
    <div>
      {components.map(component => 
        <div key={component.id}>
          <h4>{component.name}</h4>
          <ul>
            {component.ingredients.map(ingredient => 
              <li key={ingredient.id}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default IngredientsList;
