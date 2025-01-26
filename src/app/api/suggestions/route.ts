import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../../prisma/client/client";

const LIMIT = 4;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search")!; // this API will not be called if search is empty

  const entities = await prisma.htmlEntity.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { unicode: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    take: LIMIT,
    orderBy: {
      name: "asc",
    },
  });

  const mappedSuggestions = entities.map((entity) => {
    const lowerCaseSearch = search.toLowerCase();

    if (entity.name.toLowerCase().includes(lowerCaseSearch)) {
      return { id: entity.id, matchedField: "Entity", value: entity.name };
    } else if (
      entity.description &&
      entity.description.toLowerCase().includes(lowerCaseSearch)
    ) {
      return {
        id: entity.id,
        matchedField: "Description",
        value: entity.description,
      };
    } else if (entity.unicode.toLowerCase().includes(lowerCaseSearch)) {
      return { id: entity.id, matchedField: "Unicode", value: entity.unicode };
    }

    return null;
  });

  return NextResponse.json(mappedSuggestions);
}
