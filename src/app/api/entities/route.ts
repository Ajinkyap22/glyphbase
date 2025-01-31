import { NextRequest } from "next/server";

import prisma from "../../../../prisma/client/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const take = searchParams.get("limit") || 30;

  const skip = (Number(page) - 1) * Number(take);

  const entities = await prisma.htmlEntity.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { unicode: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        category ? { category: { contains: category } } : {},
      ],
    },
    skip,
    take: Number(take),
    orderBy: {
      name: "asc",
    },
  });

  return new Response(JSON.stringify(entities));
}
