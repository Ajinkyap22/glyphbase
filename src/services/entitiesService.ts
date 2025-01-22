import { Entity } from "@/types/Entity";

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
