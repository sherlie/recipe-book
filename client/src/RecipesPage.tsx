import { useGetRecipes } from "./queries/useGetRecipes";

function RecipesPage() {

  const recipes = useGetRecipes();
  console.log(recipes);
  return (
    <div>start!</div>
  );
}

export default RecipesPage;
