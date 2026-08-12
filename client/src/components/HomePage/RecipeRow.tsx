import type { LightRecipe } from "../../domain/types";

interface RecipeRowProps {
  recipe: LightRecipe;
  handleClick: (id: string) => void;
}

function RecipeRow({ recipe, handleClick }: RecipeRowProps) {

  return (
    <div onClick={() => handleClick(recipe.id)}>
      {recipe.name}
    </div>
  );
}

export default RecipeRow;
