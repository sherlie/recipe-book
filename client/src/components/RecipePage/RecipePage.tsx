import { useParams } from "react-router";
import { useGetRecipe } from "../../queries/useGetRecipe";
import IngredientsList from "./IngredientsList";
import MultiplierForm from "./MultiplierForm";
import { useState } from "react";

export const RecipePage = () => {

  let { recipeId = "" } = useParams();

  const { data, isLoading, error } = useGetRecipe(recipeId);

  const [multiplier, setMultiplier] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No such recipe.</div>
  }

  return (
    <div>
      <h3>{data.name}</h3>
      <MultiplierForm
        currentMultiplier={multiplier}
        onChange={setMultiplier}
      />
      <IngredientsList
        multiplier={multiplier}
        components={data.components}
      />
      <p>{data.method}</p>
    </div>
  );
}

export default RecipePage;
