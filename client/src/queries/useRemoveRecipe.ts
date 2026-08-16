import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";

export const useRemoveRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE_API_URL}/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}