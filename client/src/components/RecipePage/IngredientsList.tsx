import type { Component } from "../../domain/types";
import { wrapper } from "./IngredientList.css";

interface IngredientsListProps {
  multiplier: number;
  components: Component[];
}

export const IngredientsList = ({ multiplier, components }: IngredientsListProps) => {
  return (
    <div className={wrapper}>
      <h3>Ingredients</h3>
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
