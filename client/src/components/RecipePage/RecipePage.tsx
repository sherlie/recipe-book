import { useParams } from "react-router";
import { useGetRecipe } from "../../queries/useGetRecipe";
import IngredientsList from "./IngredientsList";
import MultiplierForm from "./MultiplierForm";
import { useState } from "react";
import { useRemoveRecipe } from "../../queries/useRemoveRecipe";
import { pageWrapper, submitButton } from "../../main.css";

export const RecipePage = () => {

  let { recipeId = "" } = useParams();

  const { data, isLoading, error } = useGetRecipe(recipeId);

  const removeRecipeMutation = useRemoveRecipe();

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

  function handleRemoveRecipe() {
    removeRecipeMutation.mutate(recipeId);
  }

  return (
    <div className={pageWrapper}>
      <h1>{data.name}</h1>
      <MultiplierForm
        currentMultiplier={multiplier}
        onChange={setMultiplier}
      />
      <IngredientsList
        multiplier={multiplier}
        components={data.components}
      />
      <h3>Directions</h3>
      <p>{data.method}</p>
      <button onClick={handleRemoveRecipe} className={submitButton}>Delete recipe</button>
    </div>
  );
}

export default RecipePage;
