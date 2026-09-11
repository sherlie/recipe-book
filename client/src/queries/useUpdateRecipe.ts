import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "../routeUtils";
import type { UpdateRecipe } from "../domain/updateTypes";

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: async (recipe: UpdateRecipe) => {
      const res = await fetch(`${BASE_API_URL}/recipes/${recipe.id}`, {
        method: 'PUT',
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