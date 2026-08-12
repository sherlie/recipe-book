import { useGetRecipes } from "../../queries/useGetRecipes";
import RecipeRow from "./RecipeRow";

export const HomePage = () => {

  const { data, isLoading, error} = useGetRecipes();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data || !data.data) {
    return <div>No recipes yet.</div>
  }

  function handleClick(id: string) {
    console.log(id);
  }

  return (
    <div>
      {data.data.map(recipe =>
        <RecipeRow
          key={recipe.id}
          recipe={recipe}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default HomePage;
