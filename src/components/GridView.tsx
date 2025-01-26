import React from "react";

import EntityCard from "@/components/EntityCard";

import { Entity } from "@/types/Entity";

type Props = {
  entities: Entity[] | undefined;
};

const GridView = ({ entities }: Props) => {
  return (
    <div className="grid grid-cols-2 justify-center gap-5 px-3 sm:grid-cols-4 md:px-6 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {entities?.map((entity) => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  );
};

export default GridView;
