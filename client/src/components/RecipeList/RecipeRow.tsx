import type { LightRecipe } from "../../domain/types";
import { recipeRow } from "./RecipeRow.css";

interface RecipeRowProps {
  recipe: LightRecipe;
  handleClick: (id: string) => void;
}

export const RecipeRow = ({ recipe, handleClick }: RecipeRowProps) => {
  return (
    <div onClick={() => handleClick(recipe.id)} className={recipeRow}>
      <h3>{recipe.name}</h3>
    </div>
  );
}

export default RecipeRow;
