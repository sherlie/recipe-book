import { useNavigate } from "react-router";
import { useGetRecipes } from "../../queries/useGetRecipes";
import RecipeRow from "./RecipeRow";

export const HomePage = () => {

  const { data, isLoading, error } = useGetRecipes();

  const navigate = useNavigate();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data || !data.items) {
    return <div>No recipes yet.</div>
  }

  function handleClick(id: string) {
    navigate(`/recipe/${id}`);
  }

  return (
    <div>
      {data.items.map(recipe =>
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
