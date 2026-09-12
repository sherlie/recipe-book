import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../routeUtils";
import type { LightRecipe, Page } from "../domain/types";

const fetchRecipes = async (tagId?: string): Promise<Page<LightRecipe[]>> => {
  const fetchUrl = tagId ? `${BASE_API_URL}/recipes/tags/${tagId}` : `${BASE_API_URL}/recipes`;
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
};

export const useGetRecipes = (tagId?: string) => {
  return useQuery({
    queryKey: ['recipes', tagId],
    queryFn: () => fetchRecipes(tagId),
  });
} 