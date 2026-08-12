import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import type { FullRecipe } from "../domain/types";

const fetchRecipe = async (id: string): Promise<FullRecipe> => {
  const response = await fetch(`${BASE_API_URL}/recipes/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
};

export const useGetRecipe = (id: string) => {
    const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', id],
    queryFn: () => fetchRecipe(id),
  });
  return  { data, isLoading, error };
} 