import React, { useState } from "react";

import clsx from "clsx";

import CopyIcon from "@/components/icons/CopyIcon";
import StarIcon from "@/components/icons/StarIcon";
import TickIcon from "@/components/icons/TickIcon";

import type { Entity } from "@/types/Entity";

type Props = {
  entity: Entity;
};

const EntityRow = ({ entity }: Props) => {
  const { glyph, category, name, unicode, description } = entity;

  return (
    <tr className="border-b border-outline/50 hover:bg-foreground/5">
      <td className="p-4 text-center text-2xl">{glyph}</td>

      <td className="p-4 text-center text-foreground/70">{category}</td>

      <td className="p-4 text-center text-foreground/70 sm:text-right">
        <span className="inline-flex items-center gap-2">
          <span>{name}</span>

          <CopyButton textToCopy={name} />
        </span>
      </td>

      <td className="p-4 text-center text-foreground/70 sm:text-right">
        <span className="inline-flex items-center gap-2">
          <span>{unicode}</span>

          <CopyButton textToCopy={unicode} />
        </span>
      </td>

      <td className="p-4 text-center text-foreground/70">
        <span>{description}</span>

        <StarButton entity={entity} />
      </td>
    </tr>
  );
};

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className="relative size-5"
    >
      <CopyIcon
        className={clsx(
          "absolute inset-0 transition-all duration-200",
          isCopied && "scale-0 opacity-0",
          !isCopied && "scale-100 opacity-100",
        )}
      />

      <TickIcon
        className={clsx(
          "absolute inset-0 transition-all duration-200",
          isCopied && "scale-100 opacity-100",
          !isCopied && "scale-0 opacity-0",
        )}
      />
    </button>
  );
};

const StarButton = ({ entity }: { entity: Entity }) => {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites") || "{}")[entity.id],
  );

  const handleStar = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");

    if (isFavorite) {
      delete favorites[entity.id];
    } else {
      favorites[entity.id] = entity;
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="mx-1 rounded-full p-1 hover:bg-foreground/5"
      onClick={handleStar}
    >
      <StarIcon
        className={clsx(
          !isFavorite && "stroke-foreground/60 group-hover:stroke-yellow-400",
          isFavorite && "fill-amber-400 stroke-amber-400",
        )}
      />
    </button>
  );
};

export default EntityRow;
