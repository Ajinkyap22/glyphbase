import React from "react";

import EntityRow from "@/components/EntityRow";

import type { Entity } from "@/types/Entity";

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

          <th className="p-4 text-center font-semibold text-foreground/70 sm:text-right">
            HTML Entity
          </th>

          <th className="p-4 text-center font-semibold text-foreground/70 sm:text-right">
            Unicode
          </th>

          <th className="p-4 text-center font-semibold text-foreground/70">
            Description
          </th>
        </tr>
      </thead>

      <tbody>
        {entities?.map((entity) => (
          <EntityRow key={entity.id} entity={entity} />
        ))}
      </tbody>
    </table>
  );
};

export default ListView;
