import React from "react";

import EntityCard from "@/components/EntityCard";

import { Entity } from "@/types/Entity";

type Props = {
  entities: Entity[] | undefined;
};

const GridView = ({ entities }: Props) => {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-5 px-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {entities?.map((entity) => (
        <EntityCard
          key={entity.id}
          name={entity.name}
          glyph={entity.glyph}
          unicode={entity.unicode}
        />
      ))}
    </div>
  );
};

export default GridView;
