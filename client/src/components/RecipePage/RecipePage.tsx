import { useGetRecipe } from "../../queries/useGetRecipe";

interface RecipePageProps {
  recipeId: string;
}

export const RecipePage = ({ recipeId }: RecipePageProps) => {

  const { data, isLoading, error} = useGetRecipe(recipeId);

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
      {data.name}
    </div>
  );
}

export default RecipePage;
