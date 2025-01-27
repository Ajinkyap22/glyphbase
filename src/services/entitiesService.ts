import type { Entity } from "@/types/Entity";
import type { Suggestion } from "@/types/Suggestions";

export const getEntities: (params: {
  search: string;
  category: string;
  page: number;
  limit: number;
}) => Promise<Entity[]> = async ({
  search,
  category,
  page,
  limit,
}: {
  search: string;
  category: string;
  page: number;
  limit: number;
}) => {
  const response = await fetch(
    `/api/entities?search=${search}&category=${category}&page=${page}&limit=${limit}`,
  );

  return response.json();
};

export const getSuggestions: (params: {
  search: string;
}) => Promise<Suggestion[]> = async ({ search }: { search: string }) => {
  const response = await fetch(`/api/suggestions?search=${search}`);

  return response.json();
};
