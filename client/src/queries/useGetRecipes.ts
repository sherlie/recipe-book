import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import type { LightRecipe, Page } from "../domain/types";

const fetchRecipes = async (): Promise<Page<LightRecipe[]>> => {
  const response = await fetch(`${BASE_API_URL}/recipes`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
};

export const useGetRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
} 