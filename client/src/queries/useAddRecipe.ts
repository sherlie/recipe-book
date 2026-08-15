import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import type { CreateFullRecipe } from "../domain/createTypes";

export const useAddRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: async (recipe: CreateFullRecipe) => {
      const res = await fetch(`${BASE_API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });

      if (!res.ok) throw new Error('Failed');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}