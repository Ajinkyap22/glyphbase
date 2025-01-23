import React from "react";

import { Entity } from "@/types/Entity";

import EntityRow from "./EntityRow";

type Props = {
  entities: Entity[] | undefined;
};

const ListView = ({ entities }: Props) => {
  return (
    <table className="w-full border-collapse bg-background md:table-fixed">
      <thead>
        <tr className="border-b border-outline/50">
          <th className="p-4 text-center font-semibold text-foreground/70">
            Glyph
          </th>

          <th className="p-4 text-center font-semibold text-foreground/70">
            Category
          </th>

          <th className="p-4 text-right font-semibold text-foreground/70">
            HTML Entity
          </th>

          <th className="p-4 text-center font-semibold text-foreground/70">
            Unicode
          </th>
        </tr>
      </thead>

      <tbody>
        {entities?.map((entity) => (
          <EntityRow
            key={entity.id}
            name={entity.name}
            glyph={entity.glyph}
            category={entity.category}
            unicode={entity.unicode}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ListView;
