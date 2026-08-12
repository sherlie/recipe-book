import { useParams } from "react-router";
import { useGetRecipe } from "../../queries/useGetRecipe";
import IngredientsList from "./IngredientsList";

export const RecipePage = () => {

  let { recipeId = "" } = useParams();

  const { data, isLoading, error } = useGetRecipe(recipeId);


  console.log({ data, isLoading, error } );
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data || !data.data) {
    return <div>No such recipe.</div>
  }

  return (
    <div>
      <h3>{data.data.name}</h3>
      <IngredientsList components={data.data.components} />
      <p>{data.data.method}</p>
    </div>
  );
}

export default RecipePage;
