import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import type { Tag } from "../domain/types";

const fetchTags = async (namePrefix: string): Promise<Tag[]> => {
  const response = await fetch(`${BASE_API_URL}/tags?name=${namePrefix}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  return (await response.json()).data;
};

export const useGetTags = (namePrefix: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['tags', namePrefix],
    queryFn: () => fetchTags(namePrefix),
    enabled,
  });
}