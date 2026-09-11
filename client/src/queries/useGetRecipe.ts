import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../routeUtils";
import type { FullRecipe } from "../domain/types";

const fetchRecipe = async (id: string): Promise<FullRecipe> => {
  const response = await fetch(`${BASE_API_URL}/recipes/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return (await response.json()).data;
};

export const useGetRecipe = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => fetchRecipe(id),
    enabled,
  });
} 