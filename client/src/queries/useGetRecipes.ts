import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";

const fetchRecipes = async () => {
  const response = await fetch(`${BASE_API_URL}/recipes`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
};

export const useGetRecipes = () => {
    const { data, isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
  return  { data, isLoading, error };
} 