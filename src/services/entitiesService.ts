import { buildQueryParams } from "@/utils/buildQueryParams";

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
  const queryParams = buildQueryParams({
    search,
    category,
    page,
    limit,
  });

  const response = await fetch(`/api/entities?${queryParams}`);

  return response.json();
};

export const getSuggestions: (params: {
  search: string;
}) => Promise<Suggestion[]> = async ({ search }: { search: string }) => {
  const queryParams = buildQueryParams({
    search,
  });

  const response = await fetch(`/api/suggestions?${queryParams}`);

  return response.json();
};
